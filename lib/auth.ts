import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "adminpassword2026";
const SESSION_SECRET = process.env.SESSION_SECRET || "yk-chaturvedi-co-secure-session-key-2026";
const COOKIE_NAME = "ykc_admin_session";

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSessionToken(username: string): string {
  // Simple HMAC-like encoded token with timestamp
  const payload = JSON.stringify({
    user: username,
    timestamp: Date.now(),
    salt: SESSION_SECRET,
  });
  return Buffer.from(payload).toString("base64");
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const data = JSON.parse(decoded);
    if (data.salt === SESSION_SECRET && data.user === ADMIN_USERNAME) {
      // 7-day expiration
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - data.timestamp < sevenDays) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
