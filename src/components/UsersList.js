// components/UsersList.js
import React, { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Список зарегистрированных пользователей</h2>
      {users.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {users.map((user, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              {user.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Пока нет зарегистрированных пользователей</p>
      )}
    </div>
  );
}

export default UsersList;
