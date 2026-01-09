"use client";

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-6 py-2 rounded-full border ${
            active === cat
              ? "bg-emerald-600 text-black border-emerald-600"
              : "border-white/20 text-white hover:border-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
