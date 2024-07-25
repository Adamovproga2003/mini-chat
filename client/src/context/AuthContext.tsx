import { ReactNode, createContext, useState } from "react";

type authContextType = {
  isAuth: boolean;
  onChangeAuth: (isAuth: boolean) => void;
  username: string | null;
  onChangeUsername: (name: string | null) => void;
};

const authContextDefaultValues: authContextType = {
  isAuth: false,
  onChangeAuth: (): void => {},
  username: null,
  onChangeUsername: (): void => {},
};

export const AuthContext = createContext<authContextType>(
  authContextDefaultValues
);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const onChangeAuth = (isAuth: boolean): void => {
    setAuth(isAuth);
  };

  const onChangeUsername = (username: string | null): void => {
    setUsername(username);
  };

  const value = {
    username,
    onChangeUsername,
    isAuth,
    onChangeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
