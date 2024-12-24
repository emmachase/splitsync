import { drizzle } from "drizzle-orm/bun-sqlite";
import { DB_FILE_NAME } from "../env";
import * as schema from "./schema";

export const db = drizzle(DB_FILE_NAME, { schema });
