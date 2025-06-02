import React from "react";

const benefits = [
  {
    emoji: "✨",
    title: "Instant Polish",
    desc: "Effortlessly transform everyday photos into elegant, professional visuals.",
  },
  {
    emoji: "⏱️",
    title: "Save Hours",
    desc: "Automate design tasks that used to take forever, freeing up your valuable time.",
  },
  {
    emoji: "💰",
    title: "Budget-Friendly Brilliance",
    desc: "Get boutique-quality aesthetics without the high costs.",
  },
  {
    emoji: "🎨",
    title: "Consistent Brand Look",
    desc: "Apply your unique style across all your posts, ensuring your feed always looks cohesive and on-point.",
  },
  {
    emoji: "🚀",
    title: "Designed for speed",
    desc: "Super fast content creation so you can focus on your business.",
  },
  {
    emoji: "🤤",
    title: "Fast",
    desc: "Create content that makes people hungry and want to visit and order.",
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 md:px-20 py-20 bg-white gap-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 max-w-2xl">
        <span>You Perfect the Plate.</span><br className="hidden md:block" />
        <span>Plately Perfects the Post.</span>
      </h2>
      <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl">
        We believe your food deserves a feed as amazing as your menu. Plately simplifies stunning visuals, so you can focus on service, cooking, and your bottom line, not complicated software.
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {benefits.map((b, i) => (
          <div key={i} className="bg-[#F9FAFB] rounded-2xl shadow-md p-6 flex flex-col items-start gap-3 h-full">
            <span className="text-3xl mb-2">{b.emoji}</span>
            <span className="text-lg font-semibold text-gray-900">{b.title}</span>
            <span className="text-base text-gray-700">{b.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits; 