"use client";

import { Authentication } from "@/components/authentication";
import {
  AppContext,
  AppContextDispatch,
  appContextInitialState,
  appReducer,
} from "@/context/Context";
import { validateSession } from "@/data/authorization";
import { clearSession, getSession, saveSession } from "@/lib/session";
import { ReactNode, useEffect, useReducer, useState } from "react";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(appReducer, appContextInitialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const session = getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await validateSession(
          session.accessToken,
          session.refreshToken,
        );

        if (!result.authenticated) {
          clearSession();
          return;
        }

        saveSession(result.accessToken!, result.refreshToken!);
        dispatch({
          type: "SET_AUTHENTICATED",
          payload: { isAuthenticated: true },
        });
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  if (isLoading) return null;

  return (
    <AppContext value={state}>
      <AppContextDispatch value={dispatch}>
        {state.isAuthenticated ? (
          children
        ) : (
          <div className="flex min-h-screen items-center justify-center">
            <Authentication />
          </div>
        )}
      </AppContextDispatch>
    </AppContext>
  );
}
