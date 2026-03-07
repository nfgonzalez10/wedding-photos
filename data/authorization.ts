"use server";

export async function isAuthenticated(password: string): Promise<boolean> {
  return password === process.env.AUTHORIZATION;
}
