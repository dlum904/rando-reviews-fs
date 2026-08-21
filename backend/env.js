import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export function requiredEnv(name) {
  const value = process.env[name]?.trim().replace(/^['"]|['"]$/g, "");
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}
