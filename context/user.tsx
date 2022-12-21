import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserLog } from '../pages';

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
  useEffect(() => {
    const userLogged = localStorage.getItem('userLoggedIn');
    if (userLogged) {
      setUser(JSON.parse(userLogged));
    } else {
      setUser(defaultContext);
    }
  }, []);
  return (
    <UserLogContext.Provider value={{ user, setUser }}>
      {children}
    </UserLogContext.Provider>
  );
}

export function useUserLogContext() {
  return useContext(UserLogContext);
}
