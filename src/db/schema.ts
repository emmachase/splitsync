import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const expensesTable = sqliteTable("expenses", {
    splitwiseId: int().primaryKey(),
    monarchId: text(),
}, (t) => [
    index('monarch_id').on(t.monarchId)
])

export const notificationsTable = sqliteTable("notifications", {
    splitwiseId: int().primaryKey(),
    processedAt: int(), // timestamp in epoch milliseconds
}, () => [])

export const notificationsLastProcessedTable = sqliteTable("notifications_last_processed", {
    id: int().primaryKey(),
    lastProcessedAt: int(), // timestamp in epoch milliseconds
}, () => [])
