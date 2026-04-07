import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function CheckoutPage() {
  const { items, totalQty, totalPrice, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (!done && items.length === 0) navigate('/', { replace: true })
  }, [items, done, navigate])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const orderLines = items.map(i => `• ${i.name} (Size: ${i.size}) x${i.qty} — ${formatPrice(i.price * i.qty)}`).join('\n')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `Đơn hàng mới — ${form.name} (${form.phone})`,
          order_items: orderLines,
          order_total: formatPrice(totalPrice),
          ...form,
        }),
      })
      if (res.ok) { clear(); setDone(true) }
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <main className="pt-28 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="font-display text-4xl text-brand-black mb-4">Thank You</p>
          <p className="text-sm text-brand-gray leading-relaxed mb-8">
            Your order has been received. We'll contact you within 2 hours to confirm and arrange delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <a href="tel:0909123456" className="btn-outline">Call Us</a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 min-h-screen bg-brand-white">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-4 flex items-center gap-2 text-[10px] tracking-wider uppercase text-brand-gray">
        <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-black transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-brand-black">Checkout</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

        {/* ── Left: form ── */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-brand-black mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-2">Full Name *</label>
                <input name="name" required value={form.name} onChange={handleChange}
                  placeholder="Nguyen Van A"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-2">Phone *</label>
                <input name="phone" required value={form.phone} onChange={handleChange}
                  placeholder="0909 xxx xxx"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-2">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="email@example.com"
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
            </div>

            {/* Address */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-2">Delivery Address *</label>
              <input name="address" required value={form.address} onChange={handleChange}
                placeholder="Street, ward, district, city..."
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
            </div>

            {/* Note */}
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-brand-gray mb-2">Order Note</label>
              <textarea name="note" rows={3} value={form.note} onChange={handleChange}
                placeholder="Delivery time preference, gift wrapping, etc."
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors resize-none" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-brand-black text-brand-white text-[11px] tracking-widest uppercase py-4 hover:bg-brand-gray transition-colors disabled:opacity-50 mt-2">
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
            <p className="text-[10px] text-brand-gray text-center">
              We'll confirm your order by phone or email within 2 hours.
            </p>
          </form>
        </div>

        {/* ── Right: order summary (sticky) ── */}
        <div className="lg:sticky lg:top-28 h-fit">
          <h2 className="text-[11px] tracking-widest2 uppercase font-semibold text-brand-black mb-6 pb-4 border-b border-gray-100">
            Order Summary ({totalQty} {totalQty === 1 ? 'item' : 'items'})
          </h2>

          <div className="flex flex-col divide-y divide-gray-100 mb-6">
            {items.map(item => (
              <div key={item._key} className="flex gap-4 py-4">
                <div className="w-16 h-20 shrink-0 overflow-hidden bg-brand-light">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-brand-black leading-snug">{item.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-brand-gray mt-0.5">Size: {item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-brand-gray">Qty: {item.qty}</p>
                    <p className="text-xs font-semibold text-brand-black">{formatPrice(item.price * item.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-brand-gray">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-gray">
              <span>Shipping</span>
              <span className="text-green-600">
                {totalPrice >= 1500000 ? 'Free' : 'Calculated later'}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-brand-black pt-3 border-t border-gray-100">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
