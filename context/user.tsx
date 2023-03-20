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
  console.log('in context');
  useEffect(() => {
    const userFromStorage = localStorage.getItem('userLoggedIn');
    if (userFromStorage !== null) {
      setUser(JSON.parse(userFromStorage));
    }
    console.log('in context effect');
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
