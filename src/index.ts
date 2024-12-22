import { graphql } from "gql.tada";

const TransactionsQuery = graphql(`
    query TransactionsList {
        allTransactions {
            totalCount
            results {
                id
                createdAt
            }
        }
    }
`)

console.log("Hello via Bun!");
