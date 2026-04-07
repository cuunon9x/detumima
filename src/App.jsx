import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import BackToTop from './components/BackToTop'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import './index.css'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar onCartOpen={() => setCartOpen(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage onCartOpen={() => setCartOpen(true)} />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContact />
          <BackToTop />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}
