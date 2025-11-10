"use client";

import { useState } from "react";

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    { question: "#1 Вопрос", answer: "Короткий ответ в пару строк..." },
    { question: "#2 Вопрос", answer: "Короткий ответ в пару строк..." },
    { question: "#3 Вопрос", answer: "Короткий ответ в пару строк..." },
    { question: "#4 Вопрос", answer: "Короткий ответ в пару строк..." },
    { question: "#5 Вопрос", answer: "Короткий ответ в пару строк..." },
    { question: "#6 Вопрос", answer: "Короткий ответ в пару строк..." },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-md">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-100 hover:bg-gray-200"
            >
              <span>{item.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-white text-gray-700">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
