import { graphql, type VariablesOf, type ResultOf } from "gql.tada";
import { client, getExpenseById, getExpenses, getGroups, getNotifications, type Expense } from "./splitwise";
import { assertEquals, assertNotNull, SECONDS } from "./utils";
import { MONARCH_API_TOKEN, SPLITWISE_API_KEY, SPLITWISE_USER } from "./env";
import { db } from "./db";
import { expensesTable, notificationsLastProcessedTable, notificationsTable } from "./db/schema";
import { eq } from "drizzle-orm";
import patchFetch from "fetch-retry";
import BigDecimal from "js-big-decimal";
import { Client, cacheExchange, fetchExchange } from '@urql/core';

const ZERO = new BigDecimal(0);

const fetchRetry = patchFetch(fetch);

// Parse command line arguments
const args = process.argv.slice(2);
const useLastDay = args.includes('--last-day') || args.includes('-d');

client.setConfig({
    baseUrl: "https://secure.splitwise.com/api/v3.0",
    headers: {
        "Authorization": "Bearer " + SPLITWISE_API_KEY,
    },
    fetch(request) {
        return fetchRetry(request, {
            retryOn: [429, 503],
        });
    },
})

const gqlClient = new Client({
    url: 'https://api.monarchmoney.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
        headers: {
            "authorization": "Token " + MONARCH_API_TOKEN,
        }
    }
});

enum NotificationType {
    ExpenseAdded = 0,
    ExpenseUpdated = 1,
    ExpenseDeleted = 2,
    CommentAdded = 3,
    AddedToGroup = 4,
    RemovedFromGroup = 5,
    GroupDeleted = 6,
    GroupSettingsChanged = 7,
    AddedAsFriend = 8,
    RemovedAsFriend = 9,
    News = 10,
    DebtSimplification = 11,
    GroupUndeleted = 12,
    ExpenseUndeleted = 13,
    GroupCurrencyConversion = 14,
    FriendCurrencyConversion = 15,
}

enum MonarchCategories {
    "Auto Payment" = "195869680933421296",
    "Charity" = "195869680933421294",
    "Financial & Legal Services" = "195869680933421330",
    "Groceries" = "195869680933421310",
    "Medical" = "195869680933421326",
    "Paychecks" = "195869680933421290",
    "Rent" = "195869680933421302",
    "Shopping" = "195869680933421318",
    "Transfer" = "195869680933421347",
    "Travel & Vacation" = "195869680933421313",
    "Uncategorized" = "195869680933421335",
    "Utilities" = "195869680933421306",
    "Check" = "195869680933421336",
    "Credit Card Payment" = "195869680933421348",
    "Dentist" = "195869680933421327",
    "Dining" = "195869680933421311",
    "Entertainment & Recreation" = "195869680933421314",
    "Financial Fees" = "195869680933421331",
    "Furniture & Housewares" = "195869680933421320",
    "Gifts" = "195869680933421295",
    "Home Improvement" = "195869680933421304",
    "Interest" = "195869680933421291",
    "Phone" = "195869680933421309",
    "Public Transit" = "195869680933421297",
    "Balance Adjustments" = "195869680933421349",
    "Gas" = "195869680933421298",
    "Insurance" = "195869680933421333",
    "Miscellaneous" = "195869680933421337",
    "Other Income" = "195869680933421293",
    "Personal" = "195869680933421315",
    "Parking & Tolls" = "195869680933421300",
    "Pets" = "195869680933421316",
    "Taxes" = "195869680933421334",
    "Fun Money" = "195869680933421317",
    "Taxi & Ride Shares" = "195869680933421301"
}

const SplitwiseToMonarchCategories: Record<string, string> = {
    ["General"]:                MonarchCategories["Uncategorized"],
    ["Groceries"]:              MonarchCategories["Groceries"],
    ["Dining out"]:             MonarchCategories["Dining"],
    ["Entertainment - Other"]:  MonarchCategories["Entertainment & Recreation"],
    ["TV/Phone/Internet"]:      MonarchCategories["Utilities"],
    ["Rent"]:                   MonarchCategories["Rent"],
    ["Music"]:                  MonarchCategories["Entertainment & Recreation"],
    ["Taxi"]:                   MonarchCategories["Taxi & Ride Shares"],
    ["Electricity"]:            MonarchCategories["Utilities"],
    ["Movies"]:                 MonarchCategories["Entertainment & Recreation"],
    ["Trash"]:                  MonarchCategories["Utilities"],
    ["Car"]:                    MonarchCategories["Parking & Tolls"],
    ["Household supplies"]:     MonarchCategories["Home Improvement"],
    ["Liquor"]:                 MonarchCategories["Dining"],
    ["Utilities - Other"]:      MonarchCategories["Utilities"],
    ["Cleaning"]:               MonarchCategories["Home Improvement"],
    ["Home - Other"]:           MonarchCategories["Home Improvement"],
    ["Parking"]:                MonarchCategories["Parking & Tolls"],
    ["Gas/fuel"]:               MonarchCategories["Gas"],
    ["Life - Other"]:           MonarchCategories["Entertainment & Recreation"],
    ["Plane"]:                  MonarchCategories["Travel & Vacation"],
    ["Hotel"]:                  MonarchCategories["Travel & Vacation"],
    ["Insurance"]:              MonarchCategories["Insurance"],
    ["Electronics"]:            MonarchCategories["Shopping"],
    ["Games"]:                  MonarchCategories["Entertainment & Recreation"],
    ["Food and drink - Other"]: MonarchCategories["Dining"],
    ["Clothing"]:               MonarchCategories["Shopping"],
    ["Transportation - Other"]: MonarchCategories["Public Transit"],
    ["Gifts"]:                  MonarchCategories["Gifts"],
    ["Heat/gas"]:               MonarchCategories["Utilities"],
    ["Sports"]:                 MonarchCategories["Entertainment & Recreation"],
    ["Furniture"]:              MonarchCategories["Furniture & Housewares"],
    ["Bus/train"]:              MonarchCategories["Public Transit"],
}

// const TransactionsQuery = graphql(`
//     query TransactionsList {
//         allTransactions {
//             totalCount
//             results {
//                 id
//                 createdAt
//             }
//         }
//     }
// `)

const PayloadErrorFragment = graphql(`
    fragment PayloadErrorFields on PayloadError {
        fieldErrors {
            field
            messages
            __typename
        }
        message
        code
        __typename
    }
`)

const CreateTransactionMutation = graphql(`
    mutation CreateTransaction($input: CreateTransactionMutationInput!) {
        createTransaction(input: $input) {
            transaction {
                id
                __typename
            }
            errors { ...PayloadErrorFields }
        }
    }
`, [PayloadErrorFragment])

const UpdateTransactionMutation = graphql(`
    mutation UpdateTransaction($input: UpdateTransactionMutationInput!) {
        updateTransaction(input: $input) {
            errors { ...PayloadErrorFields }
        }
    }
`, [PayloadErrorFragment])

const DeleteTransactionMutation = graphql(`
    mutation DeleteTransaction($input: DeleteTransactionMutationInput!) {
        deleteTransaction(input: $input) {
            deleted
            errors { ...PayloadErrorFields }
        }
    }
`, [PayloadErrorFragment])

// const CreateTransactionMutation = graphql(`
//     mutation Common_CreateTransactionMutation($input: CreateTransactionMutationInput!) {  
//         createTransaction(input: $input) {    
//             transaction {      id      __typename    }    
//             errors {      ...PayloadErrorFields      __typename    }    __typename  
//         }
//     }
//     fragment PayloadErrorFields on PayloadError {  
//         fieldErrors {    field    messages    __typename  }  
//         message  code  __typename
//     }    
// `)

const CreateTransactionBatchMutation = graphql(`
    # fragment MyCreateResult on CreateTransactionMutationResponse {
    #     errors {
    #         ...PayloadErrorFields
    #     }
    #     transaction {
    #         id
    #         __typename
    #     }
    # }

    mutation CreateTransactionBatch(
        $input0: CreateTransactionMutationInput!
        $input1: CreateTransactionMutationInput!
        $input2: CreateTransactionMutationInput!
        $input3: CreateTransactionMutationInput!
        $input4: CreateTransactionMutationInput!
        $input5: CreateTransactionMutationInput!
        $input6: CreateTransactionMutationInput!
        $input7: CreateTransactionMutationInput!
        $input8: CreateTransactionMutationInput!
        $input9: CreateTransactionMutationInput!
    ) {
        result0: createTransaction(input: $input0) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result1: createTransaction(input: $input1) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result2: createTransaction(input: $input2) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result3: createTransaction(input: $input3) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result4: createTransaction(input: $input4) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result5: createTransaction(input: $input5) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result6: createTransaction(input: $input6) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result7: createTransaction(input: $input7) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result8: createTransaction(input: $input8) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
        result9: createTransaction(input: $input9) {
        errors {
            ...PayloadErrorFields
        }
        transaction {
            id
            __typename
        }
    }
    }

    
`, [PayloadErrorFragment])

type CreateTransactionInput = {
    input: VariablesOf<typeof CreateTransactionMutation>["input"],
    splitwiseId: number,
};
type CreateTransactionOutput = ResultOf<typeof CreateTransactionMutation>["createTransaction"]["transaction"];

async function batchedCreateTransactions(expenses: CreateTransactionInput[]): Promise<{
    output: CreateTransactionOutput,
    splitwiseId: number,
}[]> {
    // Partition into groups of 10, with the last group being run one at a time
    if (expenses.length === 0) return [];

    const batchSize = 10;

    const batches = [];
    for (let i = 0; i < expenses.length; i += batchSize) {
        batches.push(expenses.slice(i, i + batchSize));
    }

    let lastGroup = batches.pop()!;
    if (lastGroup.length === batchSize) {
        batches.push(lastGroup);
        lastGroup = [];
    }

    const results: {
        output: CreateTransactionOutput,
        splitwiseId: number,
    }[] = [];

    for (const batch of batches) {
        const batchVariables = Object.fromEntries(
            batch.map((input, index) => [`input${index}`, input.input])
        ) as VariablesOf<typeof CreateTransactionBatchMutation>;

        // console.log(batchVariables);

        const result = await gqlClient.mutation(CreateTransactionBatchMutation, batchVariables).toPromise();
        
        // console.log(result);

        results.push(
            ...Object.values(result.data!).map((result, index) => ({
                output: result.transaction!,
                splitwiseId: batch[index].splitwiseId,
            }))
        )

        console.log(`Batch processed ${results.length} transactions`);
    }

    for (const input of lastGroup) {
        // console.log("Creating transaction", input.input);
        const result = await gqlClient.mutation(CreateTransactionMutation, { input: input.input }).toPromise();
        // console.log("Result", result);
        results.push({
            output: result.data!.createTransaction!.transaction!,
            splitwiseId: input.splitwiseId,
        })
    }

    return results
    // const batchSize = 10;
    // for (let i = 0; i < expenses.length; i += batchSize) {
    //     const batch = expenses.slice(i, i + batchSize);
    //     const batchVariables = Object.fromEntries(
    //         batch.map((input, index) => [`input${index}`, input])
    //     ) as VariablesOf<typeof CreateTransactionBatchMutation>;

    //     const result = await gqlClient.mutation(CreateTransactionBatchMutation, batchVariables).toPromise();
    //     console.log("Batch result", result);
    // }


}

async function syncNewTransactions() {
    const lastProcessedAt = assertNotNull(db.select().from(notificationsLastProcessedTable).get()?.lastProcessedAt, "lastProcessedAt");

    // db.update(notificationsLastProcessedTable)
    //     .set({ lastProcessedAt: Date.now() })
    //     .where(eq(notificationsLastProcessedTable.id, 1))
    //     .run();
    
    console.log("Last processed at", new Date(lastProcessedAt).toISOString());
    
    // Use the last day if specified in command line arguments, otherwise use the last processed timestamp
    const updatedAfter = useLastDay 
        ? new Date(lastProcessedAt - 24 * 60 * 60 * 1000).toISOString()
        : new Date(lastProcessedAt).toISOString();
    
    console.log("Querying notifications updated after", updatedAfter);
    
    const notificationsResponse = await getNotifications({ query: { 
        limit: 1000000,
        updated_after: updatedAfter
    }})

    const notifications = notificationsResponse.data?.notifications;
    if (notifications === undefined) {
        throw new Error("Failed to fetch notifications", { cause: notificationsResponse.error });
    }

    // If there are no notifications, we don't need to update the last processed timestamp
    if (notifications.length === 0) {
        console.log("No new notifications to process");
        return;
    }

    // Process notifications in reverse order (oldest first)
    for (const notification of notifications.toReversed()) {
        const notificationId = assertNotNull(notification.id, "notification.id");
        const notificationRecord = db
            .select().from(notificationsTable)
            .where(eq(notificationsTable.splitwiseId, notificationId)).get();

        if (notificationRecord !== undefined) {
            console.log("Notification already processed", notification)
            continue;
        }

        // console.log("Dry-run would have processed notification", notification)
        // if (true) continue;

        switch (notification.type) {
            case NotificationType.ExpenseAdded:
            case NotificationType.ExpenseUndeleted: {
                console.log("Expense added", notification)

                const source = assertNotNull(notification.source, "notification.source");
                assertEquals("Expense", source.type);
                const expenseId = assertNotNull(source.id, "source.id");

                const existingExpense = db.select().from(expensesTable).where(eq(expensesTable.splitwiseId, expenseId)).get();
                if (existingExpense !== undefined) {
                    console.log("Expense already processed", notification)
                    break;
                }

                const expenseResponse = await getExpenseById({ path: { id: expenseId } });
                const expense = assertNotNull(expenseResponse.data?.expense);

                await createTransactions([expense]);

                break;
            }
            case NotificationType.ExpenseUpdated: {
                console.log("Expense updated", notification)

                const source = assertNotNull(notification.source, "notification.source");
                assertEquals("Expense", source.type);
                const expenseId = assertNotNull(source.id, "source.id");

                const expenseResponse = await getExpenseById({ path: { id: expenseId } });
                const expense = assertNotNull(expenseResponse.data?.expense);

                await updateTransaction(expense);

                break;
            }
            case NotificationType.ExpenseDeleted:
                console.log("Expense deleted", notification)

                const source = assertNotNull(notification.source, "notification.source");
                assertEquals("Expense", source.type);
                const expenseId = assertNotNull(source.id, "source.id");

                const expenseResponse = await getExpenseById({ path: { id: expenseId } });
                const expense = assertNotNull(expenseResponse.data?.expense);

                await deleteTransaction(expense);
                
                break;

            default:
                console.warn("Unhandled notification", NotificationType[notification.type ?? -1], notification.type)
                break;
        }

        db.insert(notificationsTable).values({
            splitwiseId: notificationId,
            processedAt: Date.now(),
        }).run();
    }

    // Get the created_at timestamp of the most recent notification
    // Since we processed in reverse order, the first notification is the most recent
    const lastNotification = notifications[0];
    const lastNotificationCreatedAt = assertNotNull(lastNotification.created_at, "lastNotification.created_at");
    
    // Convert the ISO string to a timestamp
    const lastNotificationTimestamp = new Date(lastNotificationCreatedAt).getTime();
    
    console.log("Setting last processed timestamp to", new Date(lastNotificationTimestamp).toISOString());
    
    // Update the last processed timestamp
    db.delete(notificationsLastProcessedTable).run();
    db.insert(notificationsLastProcessedTable)
        .values({ id: 1, lastProcessedAt: lastNotificationTimestamp })
        .onConflictDoUpdate({
            target: notificationsLastProcessedTable.id,
            set: { lastProcessedAt: lastNotificationTimestamp }
        })
        .run();
}

async function syncAllTransactions() {
    const limit = 50;
    const allExpenses: Expense[] = [];

    const expensesCache = Bun.file("expenses.json");
    if (await expensesCache.exists()) {
        allExpenses.push(...(await expensesCache.json()));
    } else {

        const groupsResponse = await getGroups();
        const groups = assertNotNull(groupsResponse.data?.groups, "groups");

        for (const group of groups) {
            const groupExpenses = [];
            console.log(group);

            // let finished = false;
            // let updateBound = new Date(Date.now() - 10*SECONDS).toISOString();
            // while (!finished) {
            for (let offset = 0;; offset += limit) {
                console.log("Fetching expenses", {
                    group_id: group.id,
                    // updated_before: updateBound,
                    visible: true,
                    limit, offset,
                });
                const expensesResponse = await getExpenses({
                    query: {
                        group_id: group.id,
                        // updated_before: updateBound,
                        visible: true,
                        limit, offset
                    }
                })

                if (expensesResponse.error) {
                    throw new Error("Failed to fetch expenses", { cause: expensesResponse.error });
                }

                const expenses = assertNotNull(expensesResponse.data?.expenses, "expenses");
                groupExpenses.push(...expenses);

                if (expenses.length < limit) {
                    // finished = true;
                    break;
                }
            }

            groupExpenses.sort((a, b) => -a.updated_at!.localeCompare(b.updated_at!));
            // updateBound = assertNotNull(groupExpenses[groupExpenses.length - 1].updated_at, "lastExpense.updated_at");
            // console.log(updateBound);
        

            allExpenses.push(...groupExpenses);
        }
        
        await Bun.write("expenses.json", JSON.stringify(allExpenses, null, 2));
    }

    // let net = ZERO;
    allExpenses.sort((a, b) => -a.date!.localeCompare(b.date!));
    // for (const expense of allExpenses) {
    //     // if (expense.group_id !== 31518249) continue;

    //     await createTransaction(expense);
    // }
    
    await createTransactions(allExpenses);
    
    // console.log("Net", net.getPrettyValue());

    // const allids = new Set(allExpenses.map(expense => expense.id!));
    // console.log("All expenses", allExpenses.length, allids.size);
}

async function createTransactions(expenses: Expense[]) {
    const inputs = expenses.map(makeCreateTransactionInput).filter((input): input is CreateTransactionInput => input !== undefined);
    // console.log("Inputs", inputs.length);

    const results = await batchedCreateTransactions(inputs);
    for (const result of results) {
        console.log("Created transaction", result.output!.id, result.splitwiseId);
        db.insert(expensesTable).values({
            monarchId: result.output!.id,
            splitwiseId: result.splitwiseId,
        }).run();
    }
}

function makeCreateTransactionInput(expense: Expense): CreateTransactionInput | undefined {
    
    // console.log("Got expense", expense);
    if (expense.deleted_at) {
        // console.log("Expense deleted", expense.id, expense.description);
        return undefined;
    }

    const relevantUser = expense.users?.find(user => user.user_id === SPLITWISE_USER);
    if (relevantUser === undefined) {
        // console.warn("User not found in expense", expense.id, expense.description);
        return undefined;
    }

    const amount = +assertNotNull(relevantUser.net_balance, "relevantUser.net_balance");
    // console.log("Amount", expense.description, amount);

    // "2024-12-20" YYYY-MM-DD
    const date = new Date(expense.date!);
    const formattedDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;

    let categoryId = SplitwiseToMonarchCategories[expense.category?.name ?? "General"];
    if (expense.payment) {
        categoryId = MonarchCategories["Transfer"];
    }

    if (categoryId === MonarchCategories.Uncategorized) {
        console.warn("Uncategorized expense", expense.id, expense.description);
    }

    return {
        input: {
            accountId: "197669480063451227",
            date: formattedDate,
            amount,
            categoryId,
            merchantName: "Splitwise",
            notes: expense.description ?? "",
            shouldUpdateBalance: true,
        },
        splitwiseId: expense.id!,
    };
}

async function updateTransaction(expense: Expense) {
    const createInput = makeCreateTransactionInput(expense);
    if (createInput === undefined) return undefined;

    const monarchId = assertNotNull(db.select().from(expensesTable).where(eq(expensesTable.splitwiseId, expense.id!)).get()?.monarchId, "monarchId");

    const result = await gqlClient.mutation(UpdateTransactionMutation, {
        input: {
            id: monarchId,
            amount: createInput.input.amount,
            category: createInput.input.categoryId,
            date: createInput.input.date,
            notes: createInput.input.notes,
        },
    }).toPromise();

    assertNotNull(result.data, "result.data");
}

async function deleteTransaction(expense: Expense) {
    const monarchId = db.select().from(expensesTable).where(eq(expensesTable.splitwiseId, expense.id!)).get()?.monarchId;
    if (!monarchId) {
        console.warn("Monarch ID not found for expense; assuming was processed at same time; skipping...", expense.id, expense.description);
        return;
    }

    const result = await gqlClient.mutation(DeleteTransactionMutation, {
        input: {
            transactionId: monarchId,
        },
    }).toPromise();

    assertEquals(true, result.data?.deleteTransaction.deleted);

    db.delete(expensesTable).where(eq(expensesTable.splitwiseId, expense.id!)).run();
}

// Print help if --help or -h is specified
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
SplitSync - Sync Splitwise expenses to Monarch Money

Usage:
  bun run src/index.ts [options]

Options:
  --last-day, -d    Query for notifications from the last 24 hours instead of since last sync
  --help, -h        Show this help message
`);
    process.exit(0);
}

// Run the sync process
syncNewTransactions();
// syncAllTransactions()

// db.insert(notificationsLastProcessedTable).values({ lastProcessedAt: Date.now() }).run();

// db.delete(notificationsLastProcessedTable).run();
// db.insert(notificationsLastProcessedTable).values({ id: 1, lastProcessedAt: Date.now() }).run();
