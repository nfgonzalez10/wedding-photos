"use client";

import { Authentication } from "@/components/authentication";
import {
  AppContext,
  AppContextDispatch,
  appContextInitialState,
  appReducer,
} from "@/context/Context";
import { ReactNode, useReducer } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, appContextInitialState);

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
