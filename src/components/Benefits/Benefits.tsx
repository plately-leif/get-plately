import React from "react";

const benefits = [
  {
    title: "AI-generated photos that look real and delicious",
    icon: <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">📷</div>,
  },
  {
    title: "Menu-based captions in your brand's voice",
    icon: <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">✍️</div>,
  },
  {
    title: "Post now or schedule, all in one place",
    icon: <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">📅</div>,
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 md:px-20 py-20 bg-white gap-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 max-w-2xl">
        Finally, social media that fits your kitchen schedule.
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {benefits.map((b, i) => (
          <div key={i} className="flex flex-col items-center bg-gray-50 rounded-xl p-8 gap-4 shadow-sm border border-gray-100">
            {b.icon}
            <span className="text-lg font-semibold text-center text-gray-900">{b.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits; 