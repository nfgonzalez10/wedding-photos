"use server";

import { createServerClient } from "@/lib/supabase/server";

export type AuthResult = {
  authenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export async function isAuthenticated(password: string): Promise<AuthResult> {
  const isCorrectPassword = password === process.env.AUTHORIZATION;

  if (!isCorrectPassword) return { authenticated: false };

  const supabase = createServerClient();

  const { data, error } = await supabase.auth.signInAnonymously();

  if (!data.session || error) return { authenticated: false };

  return {
    authenticated: true,
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  };
}

export async function validateSession(
  accessToken: string,
  refreshToken: string,
): Promise<AuthResult> {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (!data.session || error) return { authenticated: false };

  return {
    authenticated: true,
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
  };
}
