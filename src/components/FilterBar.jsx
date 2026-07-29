export default function FilterBar({ categories, active, onChange }) {
  const all = ['Todo', ...categories]

  return (
    <div className="flex gap-2 justify-center flex-wrap mb-8">
      {all.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-xs font-semibold px-4 py-1.5 rounded-full border-2 tracking-wide cursor-pointer transition-all ${
            active === cat
              ? 'border-[#0a0a0a] bg-[#0a0a0a] text-[#c9a84c]'
              : 'border-[#bbb] bg-white text-[#555] hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
