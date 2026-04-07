import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import InstagramFeed from '../components/InstagramFeed'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Tagline strip */}
      <div className="bg-brand-light border-y border-gray-200 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_18s_linear_infinite] py-3.5 gap-16 text-[10px] tracking-widest2 uppercase text-brand-gray">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="shrink-0">
              Detumima &nbsp;·&nbsp; New Collection &nbsp;·&nbsp; Express Shipping &nbsp;·&nbsp; Made for You
            </span>
          ))}
        </div>
      </div>

      {/* Featured products — first 4 */}
      <ProductGrid limit={8} />

      {/* Feature editorial */}
      <section className="grid md:grid-cols-2 min-h-[520px]">
        <div className="relative overflow-hidden bg-brand-light aspect-[4/3] md:aspect-auto">
          <img
            src="/detumima/images/Vest Style/469323379_572797222113557_680741490562790854_n.jpg"
            alt="Edit"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-brand-black text-brand-white">
          <p className="text-[10px] tracking-widest2 uppercase text-brand-white/50 mb-4">The Edit</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">
            Crafted for the<br/>Details That Define You
          </h2>
          <p className="text-sm text-brand-white/60 leading-relaxed max-w-xs mb-10">
            Every piece tells a story — refined silhouettes, quality fabric, and design that moves with you.
          </p>
          <a href="/shop" className="btn-primary bg-brand-white text-brand-black hover:bg-brand-light self-start">
            Explore Collection
          </a>
        </div>
      </section>

      <InstagramFeed />
    </>
  )
}
