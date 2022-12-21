import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserLogContext } from '../context/user';

export type UserLog = {
  email: string;
  loggedIn: boolean;
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserLog>();
  const userContext = useUserLogContext();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userLoggedIn');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      setUser({ email: '', loggedIn: false });
    }
  }, [userContext]);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleUsersClick = () => {
    router.push('/users');
  };

  const handleLogoutClick = async () => {
    await axios('http://localhost:8080/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        localStorage.removeItem('userLoggedIn');
        userContext?.setUser({ email: '', loggedIn: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <ul>
        {(!user || !user.loggedIn) && (
          <li>
            <button onClick={handleLoginClick}>go to login page</button>
          </li>
        )}
        {user && user.loggedIn && (
          <li>
            <button onClick={handleLogoutClick}>logout user</button>
          </li>
        )}
        <li>
          <button onClick={handleRegisterClick}>go to register page</button>
        </li>
        <li>
          <button onClick={handleUsersClick}>go to users page</button>
        </li>
      </ul>
    </div>
  );
}
