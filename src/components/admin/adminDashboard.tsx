import React, { useState } from "react";
import UsersTable from "../admin/usersTable";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"users" | "events">("users");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Админ панель</h1>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setTab("users")} className={tab === "users" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}>
          Пользователи
        </button>
        <button onClick={() => setTab("events")} className={tab === "events" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}>
          События
        </button>
      </div>

      {tab === "users" ? <UsersTable /> : <div>События (в разработке)</div>}
    </div>
  );
}
