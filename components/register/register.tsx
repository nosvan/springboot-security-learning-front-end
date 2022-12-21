import { useState } from 'react';

type UserRegister = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
};

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    registerUser();
  };

  async function registerUser() {
    const user: UserRegister = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    console.log(JSON.stringify(user));
    const response = await fetch(
      'http://localhost:8080/register',
      requestOptions
    );
    console.log(JSON.stringify(response.json()));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">first name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <label htmlFor="lastName">last name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <label htmlFor="email">email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
