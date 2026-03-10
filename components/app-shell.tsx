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
import { ReactNode, useEffect, useReducer } from "react";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(appReducer, appContextInitialState);

  useEffect(() => {
    const session = getSession();
    if (!session) return;

    validateSession(session.accessToken, session.refreshToken).then(
      (result) => {
        if (!result.authenticated) {
          clearSession();
          return;
        }
        saveSession(result.accessToken!, result.refreshToken!);
        dispatch({
          type: "SET_AUTHENTICATED",
          payload: { isAuthenticated: true },
        });
      },
    );
  }, []);

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
