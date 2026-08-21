import { neon } from "@neondatabase/serverless";
import { requiredEnv } from "./env.js";

export const sql = neon(requiredEnv("DATABASE_URL"));
