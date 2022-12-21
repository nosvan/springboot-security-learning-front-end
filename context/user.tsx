import { createContext, ReactNode, useContext, useState } from 'react';

type UserLog = {
  email: string;
  loggedIn: boolean;
};

export type UserContextType = {
  user: UserLog;
  setUser: (user: UserLog) => void;
};

const defaultContext: UserLog = {
  email: '',
  loggedIn: false,
};

export const UserLogContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserLog>(defaultContext);
  return (
    <UserLogContext.Provider value={{ user, setUser }}>
      {children}
    </UserLogContext.Provider>
  );
}

export function useUserLogContext() {
  return useContext(UserLogContext);
}
