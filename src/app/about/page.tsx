"use client";

export default function HelpPage() {
  const faqData = [
    { question: "Mission", answer: "Unsere mission..." },
    { question: "Teams", answer: ["Olga", "Aider", "Dima", "Ihor"] },
  ];

  return (
    <div className="w-full px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">About</h2>
      <div className="space-y-6">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-6 bg-gray-50 shadow-md"
          >
            <div className="text-lg font-medium px-4 py-3">{item.question}</div>
            <div className="mt-4 text-gray-700 text-base px-4">
              {Array.isArray(item.answer) ? (
                <ul className="list-disc list-inside space-y-1">
                  {item.answer.map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

