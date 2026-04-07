import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PRODUCTS, CATEGORIES, formatPrice } from '../data/products'

function ProductCard({ product }) {
  const [imgIdx, setImgIdx] = useState(0)
  const img = product.images[imgIdx] || product.images[0]

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => product.images[1] && setImgIdx(1)}
      onMouseLeave={() => setImgIdx(0)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-brand-light aspect-[3/4]">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-brand-black text-brand-white text-[9px] tracking-widest uppercase px-2.5 py-1">
            {product.badge}
          </span>
        )}
        {/* Quick shop overlay */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-brand-black/90 text-brand-white text-[10px] tracking-widest uppercase py-3 hover:bg-brand-black transition-colors">
            Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <p className="text-[10px] tracking-widest uppercase text-brand-gray mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-brand-black group-hover:text-brand-gray transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-brand-black mt-1">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}

export default function ProductGrid({ limit, syncUrl = false }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlCat = searchParams.get('cat')

  // If syncUrl, drive active from URL; otherwise local state
  const [localActive, setLocalActive] = useState('All')
  const active = syncUrl ? (CATEGORIES.includes(urlCat) ? urlCat : 'All') : localActive

  // Sync local state when URL cat changes (for syncUrl=false pages that still read initial param)
  useEffect(() => {
    if (!syncUrl && urlCat && CATEGORIES.includes(urlCat)) setLocalActive(urlCat)
  }, [urlCat, syncUrl])

  function handleCat(cat) {
    if (syncUrl) {
      if (cat === 'All') { const p = new URLSearchParams(searchParams); p.delete('cat'); setSearchParams(p, { replace: true }) }
      else setSearchParams({ cat }, { replace: true })
    } else {
      setLocalActive(cat)
    }
  }

  const filtered = active === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === active)
  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="px-6 md:px-12 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] tracking-widest2 uppercase text-brand-gray mb-2">Our Collection</p>
        <h2 className="font-display text-3xl md:text-4xl text-brand-black">Shop the Edit</h2>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCat(cat)}
            className={`text-[10px] tracking-widest uppercase px-5 py-2 border transition-colors duration-200 ${
              active === cat
                ? 'bg-brand-black text-brand-white border-brand-black'
                : 'border-gray-300 text-brand-gray hover:border-brand-black hover:text-brand-black'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {displayed.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* View all CTA */}
      {limit && filtered.length > limit && (
        <div className="text-center mt-14">
          <Link to="/shop" className="btn-outline">View All Pieces</Link>
        </div>
      )}
    </section>
  )
}
