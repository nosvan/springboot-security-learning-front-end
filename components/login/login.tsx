import { useState } from 'react';
import axios from 'axios';
import { useUserLogContext } from '../../context/user';
import { UserLog } from '../../pages';
import { useRouter } from 'next/router';

type UserLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useUserLogContext();
  const handleSubmit = () => {
    const loginInfo: UserLogin = { email: email, password: password };
    loginUser(loginInfo);
  };

  async function loginUser(user: UserLogin) {
    await axios('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(user),
      withCredentials: true,
    })
      .then(function (response) {
        const userToStore: UserLog = {
          email: user.email,
          loggedIn: true,
        };
        localStorage.setItem(
          'userLoggedIn',
          JSON.stringify({
            email: user.email,
            loggedIn: true,
          })
        );
        userContext?.setUser(userToStore);
        console.log(response);
        router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <form>
        <label>email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}