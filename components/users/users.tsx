import axios from 'axios';
import { useEffect, useState } from 'react';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>();

  console.log('in users');

  async function getUsers() {
    await axios('http://localhost:8080/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log('in users effect');
    getUsers();
  }, []);

  return (
    <div>
      {users && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
