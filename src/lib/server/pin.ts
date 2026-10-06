import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const PEPPER = "cheeziup-staff-pin-v1";

export function hashPin(pin: string) {
  return createHash("sha256").update(`${PEPPER}:${pin.trim()}`).digest("hex");
}

export function pinsMatch(pin: string, pinHash: string) {
  const hashed = hashPin(pin);
  const a = Buffer.from(hashed);
  const b = Buffer.from(pinHash);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function newSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashToken(token: string) {
  return createHash("sha256").update(`cheeziup-session:${token}`).digest("hex");
}
