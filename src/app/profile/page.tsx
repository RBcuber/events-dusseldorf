"use client";

import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("events");
  const tabs = [
    { key: "events", label: "Мои события" },
    { key: "tickets", label: "Билеты" },
    { key: "wishlist", label: "Хочу пойти" },
  ];
  if (status === "loading") {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (!session) {
    return (
      <div className=" bg-border flex flex-col items-center justify-center h-screen text-gray-600">
        <p className="text-lg mb-4">Вы не вошли в систему</p>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="cursor-pointer px-5 py-1 border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition font-medium"
        >
          <span>Войти</span>
        </button>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-secondary/50 shadow-md pl-24 p-12 flex items-center gap-6 w-full">
        <div className="shrink-0">
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
            className="mt-3 self-start px-4 py-1 text-sm border border-accent rounded-lg text-accent hover:bg-accent hover:text-white transition cursor-pointer"
          >
            Выйти
          </button>
        </div>
      </div>
      <div className="bg-border min-h-screen p-10 px-24">
        {/* ===== Вкладки ===== */}
        <section className="mt-12 ">
          <div className="flex justify-left bg-white rounded-xl px-10 py-1 mb-10">
            <div className="flex gap-25 bg-white rounded-xl px-4 ">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`cursor-pointer py-2 px-4 text-sm font-medium rounded-t-xl transition-all ${
                    activeTab === tab.key
                      ? "text-dark border-b-2 border-accent"
                      : "text-gray hover:text-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-border border-t-0 rounded-xl min-h-[300px] p-8 shadow-sm">
            {activeTab === "events" && (
              <div className="space-y-3 text-gray leading-relaxed">
                <h3 className="text-lg font-semibold text-dark">
                  Код в разработке...
                </h3>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="space-y-3 text-gray leading-relaxed">
                <h3 className="text-lg font-semibold text-dark">
                  Код в разработке...
                </h3>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h3 className="text-lg font-semibold text-dark mb-4">
                  Код в разработке...
                </h3>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
