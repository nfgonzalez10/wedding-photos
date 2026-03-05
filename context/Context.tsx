"use client";
import { createContext } from "react";

export type AppContextType = {
  isAuthenticated: boolean;
};

export const appContextInitialState: AppContextType = {
  isAuthenticated: false,
};

export const AppContext = createContext<AppContextType>(appContextInitialState);

export const AppContextDispatch = createContext<React.Dispatch<{
  type: string;
  payload?: AppContextType;
}> | null>(null);

export const appReducer = (
  state: AppContextType,
  action: { type: string; payload?: AppContextType },
): AppContextType => {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.payload?.isAuthenticated ?? false,
      };
    default:
      return state;
  }
};
