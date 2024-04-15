import { createContext } from "react";
/**
 * Context for managing authentication state.
 */
export const AuthContext = createContext<{
  /**
   * Function to sign in.
   */
  signIn: (token: string) => void;
  /**
   * Function to sign out.
   */
  signOut: () => void;
  /**
   * Current session.
   */
  session?: string | null;
  /**
   * Flag indicating if authentication is in progress.
   */
  isLoading: boolean;
}>({
  signIn: (token: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});
