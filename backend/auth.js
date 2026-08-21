import { createRemoteJWKSet, jwtVerify } from "jose";
import { requiredEnv } from "./env.js";

const authBaseUrl = requiredEnv("NEON_AUTH_BASE_URL");
const jwksUrl = process.env.NEON_AUTH_JWKS_URL?.trim().replace(/^['"]|['"]$/g, "")
  || `${authBaseUrl}/.well-known/jwks.json`;

const JWKS = createRemoteJWKSet(new URL(jwksUrl));
const issuer = new URL(authBaseUrl).origin;

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { payload } = await jwtVerify(header.slice(7), JWKS, { issuer });
    req.user = payload;
    next();
  } catch (error) {
    console.error("Token validation failed:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
