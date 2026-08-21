import { createAuthClient } from "@neondatabase/neon-js/auth";

export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL, {
  fetchOptions: { credentials: "include" },
});

export async function getJwtToken() {
  const { data, error } = await authClient.token();
  if (error) throw error;
  return data?.token;
}
