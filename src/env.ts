import "dotenv/config"

export const DB_FILE_NAME = process.env.DB_FILE_NAME || "splitwise.db"

export const SPLITWISE_API_KEY = process.env.SPLITWISE_API_KEY
export const SPLITWISE_USER = parseInt(process.env.SPLITWISE_USER || "")

export const MONARCH_API_TOKEN = process.env.MONARCH_API_TOKEN
