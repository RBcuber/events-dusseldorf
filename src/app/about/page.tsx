"use client";

export default function AboutPage() {
  const aboutData = [
    {
      title: "Mission",
      description:
        "We make finding and organizing events warmer and simpler.",
      color: "bg-gray-300",
    },
    {
      title: "Our Team",
      members: [
        {
          name: "Ihor Kirichenko",
          role: "Team Lead & Frontend Developer",
          description:
            "Led the team, coordinated development, and designed the platform’s interface with attention to detail and usability.",
        },
        {
          name: "Olha Konyk",
          role: "Frontend Developer",
          description:
            "Developed event creation and filtering features, ensuring smooth interaction and responsive design.",
        },
        {
          name: "Ayder Dudakov",
          role: "Frontend Developer",
          description:
            "Implemented the admin panel and user management page, focusing on efficiency and maintainability.",
        },
        {
          name: "Dimitrij Sachs",
          role: "Frontend Developer",
          description:
            "Created the footer, About, and FAQ pages, bringing structure and clarity to the platform’s informational sections.",
        },
      ],
      color: "bg-white",
    },
  ];

  return (
    <div className="w-full px-6 py-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">About</h2>

      <div className="space-y-6">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg p-8 shadow-md border border-gray-300 ${item.color}`}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>

            {item.description && (
              <p className="text-gray-700 text-base leading-relaxed">{item.description}</p>
            )}

            {item.members && (
              <ul className="mt-4 space-y-4">
                {item.members.map((member, i) => (
                  <li key={i} className="border-b border-gray-200 pb-3">
                    <p className="text-lg font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500 italic">{member.role}</p>
                    <p className="text-gray-600 text-sm mt-1">{member.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}