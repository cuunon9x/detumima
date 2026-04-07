import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'detumima_cart'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.product.slug}__${action.product.size}`
      const existing = state.find(i => i._key === key)
      if (existing) {
        return state.map(i => i._key === key ? { ...i, qty: i.qty + (action.qty || 1) } : i)
      }
      return [...state, { ...action.product, _key: key, qty: action.qty || 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i._key !== action.key)
    case 'UPDATE_QTY':
      if (action.qty <= 0) return state.filter(i => i._key !== action.key)
      return state.map(i => i._key === action.key ? { ...i, qty: action.qty } : i)
    case 'CLEAR':
      return []
    case 'LOAD':
      return action.items
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (saved.length) dispatch({ type: 'LOAD', items: saved })
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const totalQty   = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0)

  const add       = (product, qty = 1) => dispatch({ type: 'ADD', product, qty })
  const remove    = (key) => dispatch({ type: 'REMOVE', key })
  const updateQty = (key, qty) => dispatch({ type: 'UPDATE_QTY', key, qty })
  const clear     = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider value={{ items, totalQty, totalPrice, add, remove, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
