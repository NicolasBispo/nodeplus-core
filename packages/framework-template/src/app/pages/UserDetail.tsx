import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserDetailProps {
  user: User;
}

export default function UserDetail({ user }: UserDetailProps) {
  return (
    <div className="user-detail">
      <h1>User Details</h1>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="user-actions">
        <a href="/users">Back to Users</a>
        <a href={`/users/${user.id}/edit`}>Edit User</a>
        <form action={`/users/${user.id}`} method="POST" style={{ display: 'inline' }}>
          <input type="hidden" name="_method" value="DELETE" />
          <button type="submit">Delete User</button>
        </form>
      </div>
    </div>
  );
} 