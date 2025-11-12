import React, { useEffect, useState } from "react";
import User from "../../types/User";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Ошибка при загрузке пользователей:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Имя</th>
          <th className="border p-2">Фамилия</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Возраст</th>
          <th className="border p-2">Пол</th>
          <th className="border p-2">Роль</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td className="border p-2">{u.id}</td>
            <td className="border p-2">{u.firstName}</td>
            <td className="border p-2">{u.lastName}</td>
            <td className="border p-2">{u.email}</td>
            <td className="border p-2">{u.age}</td>
            <td className="border p-2">{u.gender}</td>
            <td className="border p-2">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
