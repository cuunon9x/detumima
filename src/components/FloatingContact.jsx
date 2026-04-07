import { useState } from 'react'

const CONTACTS = [
  {
    label: 'Phone',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    href: 'tel:0909123456',
    bg: 'bg-green-500 hover:bg-green-600',
  },
  {
    label: 'Zalo',
    icon: <span className="font-bold text-sm tracking-tight">Z</span>,
    href: 'https://zalo.me/0909123456',
    bg: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    label: 'Facebook',
    icon: <span className="font-bold text-sm">f</span>,
    href: 'https://facebook.com/detumima.official',
    bg: 'bg-[#1877F2] hover:bg-blue-700',
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-5 sm:right-8 z-50 flex flex-col items-center gap-2">
      {/* Expandable buttons */}
      <div className={`flex flex-col gap-2 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {[...CONTACTS].reverse().map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
            title={c.label}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${c.bg}`}>
            {c.icon}
          </a>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="float-bob pulse-ring w-14 h-14 rounded-full bg-brand-black text-brand-white flex items-center justify-center shadow-2xl hover:bg-brand-gray transition-colors"
        aria-label="Liên hệ"
      >
        <svg className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  )
}
