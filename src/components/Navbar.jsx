import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { label: 'Shop', to: '/shop' },
  { label: 'Dresses', to: '/shop?cat=Dress' },
  { label: 'Jackets', to: '/shop?cat=Jacket' },
  { label: 'Sets', to: '/shop?cat=Set' },
  { label: 'Tops', to: '/shop?cat=Top' },
]

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { totalQty } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-brand-black text-brand-white text-center text-[10px] tracking-widest2 uppercase py-2 px-4">
        Free shipping on orders over 1,500,000₫ &nbsp;·&nbsp; New collection now live
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left: nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link key={l.label} to={l.to}
              className="text-[11px] tracking-widest uppercase font-medium text-brand-black hover:text-brand-gray transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Centre: logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/detumima/public/logo.png" alt="Detumima" className="h-9 object-contain" />
        </Link>

        {/* Right: icons */}
        <div className="flex items-center gap-5 ml-auto">
          <Link to="/search" aria-label="Search"
            className="hidden md:block text-brand-black hover:text-brand-gray transition-colors">
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </Link>
          <button onClick={onCartOpen} aria-label="Cart" className="relative text-brand-black hover:text-brand-gray transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalQty > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalQty}
              </span>
            )}
          </button>
          {/* Hamburger (mobile) */}
          <button onClick={() => setMenuOpen(v => !v)} className="md:hidden" aria-label="Menu">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen
                ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-white border-t border-gray-100 px-6 pb-6 pt-4 space-y-4">
          {NAV_LINKS.map(l => (
            <Link key={l.label} to={l.to} onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-widest uppercase font-medium text-brand-black">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
