/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Account': { kind: 'OBJECT'; name: 'Account'; fields: { 'displayName': { name: 'displayName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'icon': { name: 'icon'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'logoUrl': { name: 'logoUrl'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'AccountSubtype': { kind: 'OBJECT'; name: 'AccountSubtype'; fields: { 'display': { name: 'display'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'AccountType': { kind: 'OBJECT'; name: 'AccountType'; fields: { 'display': { name: 'display'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'group': { name: 'group'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Action': { kind: 'OBJECT'; name: 'Action'; fields: { 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'AmountCriteria': { kind: 'OBJECT'; name: 'AmountCriteria'; fields: { 'isExpense': { name: 'isExpense'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'operator': { name: 'operator'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'value': { name: 'value'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'valueRange': { name: 'valueRange'; type: { kind: 'OBJECT'; name: 'ValueRange'; ofType: null; } }; }; };
    'Attachment': { kind: 'OBJECT'; name: 'Attachment'; fields: { 'extension': { name: 'extension'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'filename': { name: 'filename'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'originalAssetUrl': { name: 'originalAssetUrl'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'publicId': { name: 'publicId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'sizeBytes': { name: 'sizeBytes'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'Boolean': unknown;
    'Category': { kind: 'OBJECT'; name: 'Category'; fields: { 'icon': { name: 'icon'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'CategoryAction': { kind: 'OBJECT'; name: 'CategoryAction'; fields: { 'icon': { name: 'icon'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'CategoryGroup': { kind: 'OBJECT'; name: 'CategoryGroup'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'order': { name: 'order'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'type': { name: 'type'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'CategoryGroupType'; ofType: null; }; } }; }; };
    'CategoryGroupType': { name: 'CategoryGroupType'; enumValues: 'income' | 'expense' | 'transfer'; };
    'CreateTransactionMutationInput': { kind: 'INPUT_OBJECT'; name: 'CreateTransactionMutationInput'; isOneOf: false; inputFields: [{ name: 'date'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; }; defaultValue: null }, { name: 'accountId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'amount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; }; defaultValue: null }, { name: 'merchantName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'categoryId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'notes'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'shouldUpdateBalance'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; }; defaultValue: null }]; };
    'CreateTransactionMutationResponse': { kind: 'OBJECT'; name: 'CreateTransactionMutationResponse'; fields: { 'errors': { name: 'errors'; type: { kind: 'OBJECT'; name: 'PayloadError'; ofType: null; } }; 'transaction': { name: 'transaction'; type: { kind: 'OBJECT'; name: 'Transaction'; ofType: null; } }; }; };
    'Credential': { kind: 'OBJECT'; name: 'Credential'; fields: { 'dataProvider': { name: 'dataProvider'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'disconnectedFromDataProviderAt': { name: 'disconnectedFromDataProviderAt'; type: { kind: 'SCALAR'; name: 'Timestamp'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'updateRequired': { name: 'updateRequired'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; }; };
    'Date': unknown;
    'DeleteTransactionMutationInput': { kind: 'INPUT_OBJECT'; name: 'DeleteTransactionMutationInput'; isOneOf: false; inputFields: [{ name: 'transactionId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }]; };
    'DeleteTransactionMutationResponse': { kind: 'OBJECT'; name: 'DeleteTransactionMutationResponse'; fields: { 'deleted': { name: 'deleted'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'errors': { name: 'errors'; type: { kind: 'OBJECT'; name: 'PayloadError'; ofType: null; } }; }; };
    'FieldError': { kind: 'OBJECT'; name: 'FieldError'; fields: { 'field': { name: 'field'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'messages': { name: 'messages'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Float': unknown;
    'GoalAction': { kind: 'OBJECT'; name: 'GoalAction'; fields: { 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'imageStorageProvider': { name: 'imageStorageProvider'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'imageStorageProviderId': { name: 'imageStorageProviderId'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'ID': unknown;
    'Institution': { kind: 'OBJECT'; name: 'Institution'; fields: { 'balanceStatus': { name: 'balanceStatus'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'hasIssuesReported': { name: 'hasIssuesReported'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'hasIssuesReportedMessage': { name: 'hasIssuesReportedMessage'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'logo': { name: 'logo'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'newConnectionsDisabled': { name: 'newConnectionsDisabled'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'status': { name: 'status'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'transactionsStatus': { name: 'transactionsStatus'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'url': { name: 'url'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Int': unknown;
    'Merchant': { kind: 'OBJECT'; name: 'Merchant'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'logoUrl': { name: 'logoUrl'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'recurringTransactionStream': { name: 'recurringTransactionStream'; type: { kind: 'OBJECT'; name: 'RecurringTransactionStream'; ofType: null; } }; 'transactionsCount': { name: 'transactionsCount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'MerchantCriteria': { kind: 'OBJECT'; name: 'MerchantCriteria'; fields: { 'operator': { name: 'operator'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'value': { name: 'value'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'createTransaction': { name: 'createTransaction'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'CreateTransactionMutationResponse'; ofType: null; }; } }; 'deleteTransaction': { name: 'deleteTransaction'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'DeleteTransactionMutationResponse'; ofType: null; }; } }; 'updateTransaction': { name: 'updateTransaction'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UpdateTransactionMutationResponse'; ofType: null; }; } }; }; };
    'PayloadError': { kind: 'OBJECT'; name: 'PayloadError'; fields: { 'code': { name: 'code'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'fieldErrors': { name: 'fieldErrors'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'FieldError'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'allTransactions': { name: 'allTransactions'; type: { kind: 'OBJECT'; name: 'TransactionList'; ofType: null; } }; 'transactionRules': { name: 'transactionRules'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'TransactionRuleV2'; ofType: null; }; } }; }; };
    'RecurringTransactionStream': { kind: 'OBJECT'; name: 'RecurringTransactionStream'; fields: { 'frequency': { name: 'frequency'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'isActive': { name: 'isActive'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; }; };
    'SplitInfo': { kind: 'OBJECT'; name: 'SplitInfo'; fields: { 'amount': { name: 'amount'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'categoryId': { name: 'categoryId'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'goalId': { name: 'goalId'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'hideFromReports': { name: 'hideFromReports'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'merchantName': { name: 'merchantName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'needsReviewByUserId': { name: 'needsReviewByUserId'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'reviewStatus': { name: 'reviewStatus'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'tags': { name: 'tags'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; }; };
    'SplitTransactionsAction': { kind: 'OBJECT'; name: 'SplitTransactionsAction'; fields: { 'amountType': { name: 'amountType'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'splitsInfo': { name: 'splitsInfo'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'SplitInfo'; ofType: null; }; } }; }; };
    'String': unknown;
    'Tag': { kind: 'OBJECT'; name: 'Tag'; fields: { 'color': { name: 'color'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'order': { name: 'order'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'TagAction': { kind: 'OBJECT'; name: 'TagAction'; fields: { 'color': { name: 'color'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Timestamp': unknown;
    'Transaction': { kind: 'OBJECT'; name: 'Transaction'; fields: { 'account': { name: 'account'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; } }; 'amount': { name: 'amount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'attachments': { name: 'attachments'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Attachment'; ofType: null; }; } }; 'category': { name: 'category'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Category'; ofType: null; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Timestamp'; ofType: null; }; } }; 'dataProviderDescription': { name: 'dataProviderDescription'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'date': { name: 'date'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'hideFromReports': { name: 'hideFromReports'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'isRecurring': { name: 'isRecurring'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'isSplitTransaction': { name: 'isSplitTransaction'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'merchant': { name: 'merchant'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Merchant'; ofType: null; }; } }; 'needsReview': { name: 'needsReview'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'notes': { name: 'notes'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'pending': { name: 'pending'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'plaidName': { name: 'plaidName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'reviewStatus': { name: 'reviewStatus'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'tags': { name: 'tags'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Tag'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Timestamp'; ofType: null; }; } }; }; };
    'TransactionFilterInput': { kind: 'INPUT_OBJECT'; name: 'TransactionFilterInput'; isOneOf: false; inputFields: [{ name: 'search'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'categories'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'accounts'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'merchants'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'absAmountGte'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'absAmountLte'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'tags'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'startDate'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; defaultValue: null }, { name: 'endDate'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; defaultValue: null }, { name: 'hasAttachments'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'hasNotes'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'hideFromReports'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'isRecurring'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'isSplit'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'needsReview'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'needsReviewByUser'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; defaultValue: null }, { name: 'needsReviewUnassigned'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'syncedFromInstitution'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'isInvestmentAccount'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'debitsOnly'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'creditsOnly'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'isPending'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }]; };
    'TransactionList': { kind: 'OBJECT'; name: 'TransactionList'; fields: { 'results': { name: 'results'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Transaction'; ofType: null; }; }; }; } }; 'totalCount': { name: 'totalCount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'totalSelectableCount': { name: 'totalSelectableCount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; }; };
    'TransactionOrdering': { name: 'TransactionOrdering'; enumValues: 'date' | 'inverse_date' | 'amount' | 'inverse_amount'; };
    'TransactionRuleV2': { kind: 'OBJECT'; name: 'TransactionRuleV2'; fields: { 'accountIds': { name: 'accountIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'accounts': { name: 'accounts'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Account'; ofType: null; }; } }; 'addTagsAction': { name: 'addTagsAction'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'TagAction'; ofType: null; }; } }; 'amountCriteria': { name: 'amountCriteria'; type: { kind: 'OBJECT'; name: 'AmountCriteria'; ofType: null; } }; 'categories': { name: 'categories'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Category'; ofType: null; }; } }; 'categoryIds': { name: 'categoryIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'lastAppliedAt': { name: 'lastAppliedAt'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'linkGoalAction': { name: 'linkGoalAction'; type: { kind: 'OBJECT'; name: 'GoalAction'; ofType: null; } }; 'merchantCriteria': { name: 'merchantCriteria'; type: { kind: 'OBJECT'; name: 'MerchantCriteria'; ofType: null; } }; 'merchantCriteriaUseOriginalStatement': { name: 'merchantCriteriaUseOriginalStatement'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'needsReviewByUserAction': { name: 'needsReviewByUserAction'; type: { kind: 'OBJECT'; name: 'Action'; ofType: null; } }; 'order': { name: 'order'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'recentApplicationCount': { name: 'recentApplicationCount'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'reviewStatusAction': { name: 'reviewStatusAction'; type: { kind: 'OBJECT'; name: 'Action'; ofType: null; } }; 'sendNotificationAction': { name: 'sendNotificationAction'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'setCategoryAction': { name: 'setCategoryAction'; type: { kind: 'OBJECT'; name: 'CategoryAction'; ofType: null; } }; 'setHideFromReportsAction': { name: 'setHideFromReportsAction'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'setMerchantAction': { name: 'setMerchantAction'; type: { kind: 'OBJECT'; name: 'Action'; ofType: null; } }; 'splitTransactionsAction': { name: 'splitTransactionsAction'; type: { kind: 'OBJECT'; name: 'SplitTransactionsAction'; ofType: null; } }; 'unassignNeedsReviewByUserAction': { name: 'unassignNeedsReviewByUserAction'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; }; };
    'UpdateTransactionMutationInput': { kind: 'INPUT_OBJECT'; name: 'UpdateTransactionMutationInput'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'category'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; defaultValue: null }, { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'amount'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'date'; type: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; defaultValue: null }, { name: 'hideFromReports'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'needsReview'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'goalId'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; defaultValue: null }, { name: 'notes'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'UpdateTransactionMutationResponse': { kind: 'OBJECT'; name: 'UpdateTransactionMutationResponse'; fields: { 'errors': { name: 'errors'; type: { kind: 'OBJECT'; name: 'PayloadError'; ofType: null; } }; 'transaction': { name: 'transaction'; type: { kind: 'OBJECT'; name: 'Transaction'; ofType: null; } }; }; };
    'ValueRange': { kind: 'OBJECT'; name: 'ValueRange'; fields: { 'lower': { name: 'lower'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'upper': { name: 'upper'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; }; };
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}