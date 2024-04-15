import { useStorageState } from "_hooks/storage.hook";
import { AuthContext } from "./auth.context";
/**
 * Provides session management functionality to the application.
 * @param props - The component props.
 * @returns The SessionProvider component.
 */
export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("access_token");
  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => {
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
