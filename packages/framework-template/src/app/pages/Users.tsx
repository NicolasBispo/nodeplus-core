import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersProps {
  users?: User[];
}

export default function Users({ users = [] }: UsersProps) {

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []);

  const defaultUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" }
  ];

  const displayUsers = users.length > 0 ? users : defaultUsers;

  return (
    <div className="users-page">
      <h1>Users List {count}</h1>
      <div className="users-grid">
        {displayUsers.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <div className="user-actions">
              <a href={`/users/${user.id}`}>View</a>
              <a href={`/users/${user.id}/edit`}>Edit</a>
            </div>
          </div>
        ))}
      </div>
      <div className="add-user">
        <h2>Add New User</h2>
        <form action="/users" method="POST">
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
} 