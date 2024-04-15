import React from "react";
import { AuthContext } from "_contexts/auth.context";

/**
 * Custom hook that returns the session value from the AuthContext.
 * Throws an error if used outside of a <SessionProvider /> component in development mode.
 * @returns The session value from the AuthContext.
 * @throws Error if used outside of a <SessionProvider /> component in development mode.
 */
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}
