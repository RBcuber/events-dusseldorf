"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("events");

  if (status === "loading") {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p className="text-lg mb-4">Вы не вошли в систему</p>
        <a
          href="/login"
          className="text-accent font-medium hover:underline transition"
        >
          Войти
        </a>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Верхняя панель профиля */}
      <div className="bg-white shadow-md p-6 flex items-center gap-6 w-full">
        <div className="flex-shrink-0">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt="User avatar"
            width={100}
            height={100}
            className="rounded-full border border-gray-300 shadow-sm"
            unoptimized
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.name || "Без имени"}
          </h1>
          <p className="text-gray-600">{user?.email}</p>
          {user?.googleId && (
            <p className="text-gray-500 text-sm">ID: {user.googleId}</p>
          )}
          <button
            onClick={() => signOut()}
            className="mt-3 self-start px-4 py-1 text-sm border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition"
          >
            Выйти
          </button>
        </div>
      </div>

      {/* Нижняя панель с подразделами */}
      <div className="bg-white shadow-md mt-6 w-full flex flex-col flex-grow">
        {/* Навигация вкладок */}
        <div className="flex justify-around border-b border-gray-200 w-full">
          {[
            { key: "events", label: "Мои события" },
            { key: "tickets", label: "Билет" },
            { key: "wishlist", label: "Хочу пойти" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`cursor-pointer w-full py-4 text-base font-medium transition-all ${
                activeTab === tab.key
                  ? "text-accent border-b-2 border-accent bg-gray-50"
                  : "text-gray-500 hover:text-accent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Контент вкладок */}
        <div className="flex-grow flex items-center justify-center text-gray-500 text-lg">
          {activeTab === "events" && <p>В разработке</p>}
          {activeTab === "tickets" && <p>В разработке</p>}
          {activeTab === "wishlist" && <p>В разработке</p>}
        </div>
      </div>
    </div>
  );
}
