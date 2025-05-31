"use client";

const COLORS = [
  { name: "Accent", value: "#FE644D" },
  { name: "Primary", value: "#0B3954" },
  { name: "BG1", value: "#F9FAFB" },
  { name: "BG2", value: "#F9FAFB" },
  { name: "Text", value: "#111827" },
  { name: "Secondary Text", value: "#6B7280" },
  { name: "Border", value: "#E5E7EB" },
];

const SPACING = [4, 8, 16, 24, 32, 40, 48];

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-primary text-[#111827]">Style Guide</h1>

      {/* Colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#111827]">Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {COLORS.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 rounded-lg border"
                style={{ background: c.value, borderColor: c.name === 'Border' ? c.value : '#E5E7EB' }}
              />
              <span className="text-sm font-medium text-[#111827]">{c.name}</span>
              <span className="text-xs text-gray-500">{c.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#111827]">Typography</h2>
        <div className="space-y-2 text-[#111827]">
          <div className="text-4xl font-extrabold">Heading 1 – Inter ExtraBold 4xl</div>
          <div className="text-2xl font-bold">Heading 2 – Inter Bold 2xl</div>
          <div className="text-lg font-semibold">Heading 3 – Inter Semibold lg</div>
          <div className="text-base">Body – Inter Regular base</div>
          <div className="text-sm" style={{ color: '#6B7280' }}>Secondary Text – Inter Regular sm</div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#111827]">Buttons</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <button className="bg-accent text-white font-semibold rounded-md px-6 py-3 hover:bg-primary transition">Accent Button</button>
          <button className="bg-primary text-white font-semibold rounded-md px-6 py-3 hover:bg-accent transition">Primary Button</button>
          <button className="border-[2px] border-primary text-primary font-semibold rounded-md px-6 py-3 hover:bg-gray-100 transition">Outlined Button</button>
        </div>
      </section>

      {/* Links */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#111827]">Links</h2>
        <div className="flex gap-6 flex-wrap items-center">
          <a href="#" className="text-accent underline hover:text-primary font-semibold">Accent Link</a>
          <a href="#" className="text-primary underline hover:text-accent font-semibold">Primary Link</a>
          <a href="#" className="text-secondary-text underline hover:text-primary font-semibold">Muted Link</a>
        </div>
        {/* Test block for text color classes */}
        <div className="flex flex-col gap-2 mt-8">
          <span className="text-accent">Accent text: #FE644D</span>
          <span className="text-primary">Primary text: #0B3954</span>
          <span className="text-secondary-text">Secondary text: #6B7280</span>
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#111827]">Spacing Tokens</h2>
        <div className="flex gap-4 flex-wrap items-end">
          {SPACING.map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className="bg-primary w-8" style={{ height: s }} />
              <span className="text-xs mt-1 text-text">{s}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 