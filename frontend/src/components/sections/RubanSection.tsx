// RubanSection.tsx
export default function RubanSection() {
  const items = [
    { icon: '✝',  label: 'Foi & Valeurs' },
    { icon: '📚', label: 'Excellence' },
    { icon: '🌿', label: 'Épanouissement' },
    { icon: '🤝', label: 'Solidarité' },
    { icon: '👨‍👩‍👧‍👦', label: 'Partenariat familles' },
  ]
  return (
    <div className="bg-gold flex justify-center flex-wrap gap-6 lg:gap-16 px-6 py-5">
      {items.map(({ icon, label }) => (
        <div key={label} className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="text-navy text-[.78rem] font-semibold tracking-[.04em] uppercase">{label}</span>
        </div>
      ))}
    </div>
  )
}
