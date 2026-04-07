import { useState, useEffect } from 'react'

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function scrollToTop() {
  const start = window.scrollY
  const duration = 600
  const startTime = performance.now()
  function step(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, start * (1 - easeOutCubic(progress)))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || document.documentElement.scrollTop) > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      title="Lên đầu trang"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-10 h-10 rounded-full bg-brand-white border border-gray-200 shadow-lg flex items-center justify-center text-brand-black hover:bg-brand-black hover:text-brand-white transition-all duration-300"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
