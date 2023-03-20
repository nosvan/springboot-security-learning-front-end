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
  const userContext = useUserLogContext();
  console.log('in home');
  useEffect(() => {
    console.log('in home effect');
  }, []);

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
        {!userContext?.user.loggedIn && (
          <li>
            <button onClick={handleLoginClick}>go to login page</button>
          </li>
        )}
        {userContext?.user.loggedIn && (
          <li>
            <button onClick={handleLogoutClick}>logout user</button>
          </li>
        )}
        {!userContext?.user.loggedIn && (
          <li>
            <button onClick={handleRegisterClick}>go to register page</button>
          </li>
        )}
        <li>
          <button onClick={handleUsersClick}>go to users page</button>
        </li>
      </ul>
    </div>
  );
}
