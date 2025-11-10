"use client";

import { useState } from "react";

interface EventTabsProps {
  description: string;
  program?: string;
  comments: { id: number; text: string; author: string }[];
}

type TabType = "description" | "program" | "comments";

export default function EventTabs({ description, program, comments }: EventTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabs: { key: TabType; label: string }[] = [
    { key: "description", label: "Описание" },
    { key: "program", label: "Программа" },
    { key: "comments", label: "Комментарии" },
  ];

  return (
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
        {activeTab === "description" && (
          <div className="space-y-3 text-gray leading-relaxed">
            <h3 className="text-lg font-semibold text-dark">Описание события</h3>
            <p>{description}</p>
          </div>
        )}

        {activeTab === "program" && (
          <div className="space-y-3 text-gray leading-relaxed">
            <h3 className="text-lg font-semibold text-dark">Программа мероприятия</h3>
            <p>{program || "Программа мероприятия появится позже."}</p>
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4">Комментарии</h3>
            {comments.length === 0 ? (
              <p className="text-gray italic">Комментариев пока нет.</p>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="border border-border rounded-lg p-3 bg-bg-light/40"
                  >
                    <p className="text-dark font-medium">{c.author}</p>
                    <p className="text-gray text-sm mt-1">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
