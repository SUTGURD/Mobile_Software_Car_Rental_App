import * as Crypto from 'expo-crypto';

export function hashPassword(password: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password,
  );
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === storedHash;
}
