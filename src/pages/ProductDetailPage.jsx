import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'

/* ── Accordion item ── */
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[11px] tracking-widest uppercase font-semibold text-brand-black">{title}</span>
        <svg
          className={`w-4 h-4 text-brand-gray transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
        >
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </button>
      {open && (
        <div className="pb-5 text-sm text-brand-gray leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ProductDetailPage({ onCartOpen }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const product = PRODUCTS.find(p => p.slug === slug)

  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-gray text-sm tracking-wider">Product not found</p>
        <Link to="/shop" className="btn-outline">Back to Shop</Link>
      </div>
    )
  }

  const related = PRODUCTS.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4)

  function handleAddToCart() {
    if (!selectedSize) { alert('Please select a size.'); return }
    add({ ...product, size: selectedSize }, qty)
    setAdded(true)
    setTimeout(() => { setAdded(false); onCartOpen?.() }, 800)
  }

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-4 flex items-center gap-2 text-[10px] tracking-wider uppercase text-brand-gray">
        <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-black transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-brand-black">{product.name}</span>
      </div>

      {/* Main layout */}
      <div className="px-6 md:px-12 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_480px] gap-8 lg:gap-16 items-start">

        {/* ── Left: Image gallery ── */}
        <div className="flex gap-3">
          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden rounded-sm border-2 transition-colors ${
                    activeImg === i ? 'border-brand-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Main image with prev/next */}
          <div className="flex-1 relative overflow-hidden bg-brand-light">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full aspect-[3/4] object-cover object-top"
            />
            {/* Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                {/* Dot indicators (mobile) */}
                <div className="md:hidden absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                  {product.images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${activeImg === i ? 'bg-brand-black' : 'bg-black/30'}`} />
                  ))}
                </div>
              </>
            )}
            {product.badge && (
              <span className="absolute top-3 left-3 bg-brand-black text-brand-white text-[9px] tracking-widest uppercase px-2.5 py-1">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* ── Right: Product info (sticky) ── */}
        <div className="md:sticky md:top-28 space-y-6">
          {/* Category */}
          <Link to={`/shop?cat=${product.category}`}
            className="text-[10px] tracking-widest2 uppercase text-brand-gray hover:text-brand-black transition-colors">
            {product.category}
          </Link>

          {/* Name */}
          <h1 className="font-display text-2xl md:text-3xl text-brand-black leading-snug mt-1">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-lg font-semibold text-brand-black tracking-wide">
            {formatPrice(product.price)}
          </p>

          {/* Description */}
          <p className="text-sm text-brand-gray leading-relaxed border-t border-gray-100 pt-5">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-widest uppercase font-semibold text-brand-black">
                Size {selectedSize && <span className="font-normal text-brand-gray">— {selectedSize}</span>}
              </p>
              <button className="text-[10px] tracking-wider underline text-brand-gray hover:text-brand-black transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[44px] h-10 px-3 border text-xs font-medium tracking-wider transition-colors ${
                    selectedSize === size
                      ? 'bg-brand-black text-white border-brand-black'
                      : 'border-gray-300 text-brand-black hover:border-brand-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add to cart */}
          <div className="flex gap-3">
            <div className="flex items-center border border-gray-300">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-12 flex items-center justify-center text-lg text-brand-black hover:bg-brand-light transition-colors">
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-10 h-12 flex items-center justify-center text-lg text-brand-black hover:bg-brand-light transition-colors">
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 h-12 text-[11px] tracking-widest uppercase font-semibold transition-all duration-300 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-black text-white hover:bg-brand-gray'
              }`}
            >
              {added ? '✓ Added to Bag' : `Add to Bag — ${formatPrice(product.price * qty)}`}
            </button>
          </div>

          {/* Accordions */}
          <div className="pt-2">
            <Accordion title="Product Details" defaultOpen>
              <ul className="space-y-1.5">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-accent mt-0.5">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p>{product.shipping}</p>
              <p className="mt-2">Returns accepted within 7 days of delivery. Items must be unworn and in original condition.</p>
            </Accordion>
            <Accordion title="Size & Fit">
              <p>Model is 165cm and wears size S. Measurements may vary slightly between styles. When in doubt, size up.</p>
            </Accordion>
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            <span className="text-[10px] tracking-widest uppercase text-brand-gray">Share</span>
            <a href={`https://www.facebook.com/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer"
              className="text-brand-gray hover:text-brand-black transition-colors text-xs tracking-wider">Facebook</a>
            <a href={`https://www.instagram.com`} target="_blank" rel="noopener noreferrer"
              className="text-brand-gray hover:text-brand-black transition-colors text-xs tracking-wider">Instagram</a>
          </div>
        </div>
      </div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 py-16 border-t border-gray-100">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-widest2 uppercase text-brand-gray mb-2">You May Also Like</p>
            <h2 className="font-display text-2xl text-brand-black">Pairs Well With</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {related.map(p => (
              <Link key={p.id} to={`/products/${p.slug}`}
                onClick={() => { setActiveImg(0); setSelectedSize(null); setQty(1); window.scrollTo(0,0) }}
                className="group block">
                <div className="overflow-hidden bg-brand-light aspect-[3/4] mb-3">
                  <img src={p.images[0]} alt={p.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="text-[10px] tracking-widest uppercase text-brand-gray mb-0.5">{p.category}</p>
                <p className="text-sm font-medium text-brand-black group-hover:text-brand-gray transition-colors">{p.name}</p>
                <p className="text-sm font-semibold mt-0.5">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
