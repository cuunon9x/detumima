import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'

const FEED = PRODUCTS
// Duplicate for seamless loop
const DOUBLED = [...FEED, ...FEED]

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-brand-light overflow-hidden">
      {/* Header */}
      <div className="text-center mb-10 px-6 md:px-12">
        <p className="text-[10px] tracking-widest2 uppercase text-brand-gray mb-2">Follow Along</p>
        <h2 className="font-display text-3xl md:text-4xl text-brand-black">Shop the Feed</h2>
        <a href="https://www.instagram.com/detumima.official" target="_blank" rel="noopener noreferrer"
          className="text-[10px] tracking-widest uppercase text-brand-gray hover:text-brand-black transition-colors mt-2 inline-block">
          @detumima
        </a>
      </div>

      {/* Infinite scroll track */}
      <div className="group/feed overflow-hidden">
        <div
          className="flex gap-1 w-max animate-[marquee-left_28s_linear_infinite] group-hover/feed:[animation-play-state:paused]"
        >
          {DOUBLED.map((p, i) => (
            <Link
              key={i}
              to={`/products/${p.slug}`}
              className="group relative shrink-0 overflow-hidden"
              style={{ width: 'clamp(180px, 22vw, 280px)' }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/35 transition-colors duration-300 flex flex-col items-center justify-end pb-6 gap-1">
                <span className="text-white text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {p.name}
                </span>
                <span className="text-white/80 text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  Shop the Look →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


