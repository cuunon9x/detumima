import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const SLIDES = [
  { src: '/detumima/banner/banner.jpg',  label: 'New Collection' },
  { src: '/detumima/banner/banner2.jpg', label: 'The Edit' },
  { src: '/detumima/banner/banner3.jpg', label: 'Summer Arrivals' },
  { src: '/detumima/banner/banner4.jpg', label: 'White Color' },
  { src: '/detumima/banner/banner5.jpg', label: 'Black is the Best Choice' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((idx) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(idx)
      setFading(false)
    }, 400)
  }, [])

  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])

  // Auto-advance every 5s
  useEffect(() => {
    const t = setTimeout(next, 3000)
    return () => clearTimeout(t)
  }, [current, next])

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.label}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
            i === current ? (fading ? 'opacity-0' : 'opacity-100') : 'opacity-0'
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-brand-white/80 text-[10px] tracking-widest2 uppercase mb-4 transition-all duration-500">
          {SLIDES[current].label}
        </p>
        <h1 className="font-display text-brand-white text-5xl md:text-7xl leading-tight mb-6">
          Detumima
        </h1>
        <p className="text-brand-white/80 text-sm tracking-wider max-w-sm mb-10">
          Details that define you — curated pieces for every moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/shop" className="btn-primary bg-brand-white text-brand-black hover:bg-brand-light">
            Shop Now
          </Link>
          <Link to="/shop" className="btn-outline border-white text-white hover:bg-white hover:text-brand-black">
            View All
          </Link>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors rounded-full"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors rounded-full"
        aria-label="Next slide"
      >
        <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-0.5 transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-3 bg-white/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-brand-white/60 text-[9px] tracking-widest2 uppercase">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}
