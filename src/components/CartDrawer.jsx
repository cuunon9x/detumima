import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function CartDrawer({ open, onClose }) {
  const { items, totalQty, totalPrice, remove, updateQty } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-brand-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-[11px] tracking-widest2 uppercase font-semibold text-brand-black flex items-center gap-2">
            Your Bag
            {totalQty > 0 && (
              <span className="bg-brand-black text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </h2>
          <button onClick={onClose} className="p-1 hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="text-brand-gray text-sm tracking-wide">Your bag is empty</p>
              <button onClick={onClose}
                className="text-[10px] tracking-widest uppercase underline underline-offset-4 text-brand-black hover:text-brand-gray transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {items.map(item => (
                <div key={item._key} className="flex gap-4 py-5">
                  {/* Image */}
                  <Link to={`/products/${item.slug}`} onClick={onClose}
                    className="shrink-0 w-20 h-24 overflow-hidden bg-brand-light">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover object-top" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.slug}`} onClick={onClose}>
                      <p className="text-xs font-medium text-brand-black leading-snug hover:text-brand-gray transition-colors">
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-[10px] tracking-widest uppercase text-brand-gray mt-0.5">
                      Size: {item.size}
                    </p>
                    <p className="text-xs font-semibold text-brand-black mt-1">{formatPrice(item.price)}</p>

                    {/* Qty + remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200">
                        <button onClick={() => updateQty(item._key, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-black hover:bg-brand-light transition-colors text-sm">
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item._key, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-black hover:bg-brand-light transition-colors text-sm">
                          +
                        </button>
                      </div>
                      <button onClick={() => remove(item._key)}
                        className="text-gray-300 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] tracking-widest uppercase text-brand-gray">Subtotal</span>
              <span className="text-sm font-semibold text-brand-black">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-[10px] text-brand-gray text-center mb-4 leading-relaxed">
              Shipping calculated at checkout. Free on orders over 1,500,000₫.
            </p>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-brand-black text-brand-white text-[11px] tracking-widest uppercase py-4 hover:bg-brand-gray transition-colors mb-3"
            >
              Checkout
            </Link>
            <button
              onClick={onClose}
              className="block w-full text-center border border-gray-200 text-brand-gray text-[11px] tracking-widest uppercase py-3.5 hover:border-brand-black hover:text-brand-black transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
