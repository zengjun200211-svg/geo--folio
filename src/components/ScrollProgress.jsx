import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop
      const max = h.scrollHeight - h.clientHeight
      setW(max > 0 ? (scrolled / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-brand transition-[width] duration-100 ease-out"
        style={{ width: `${w}%`, boxShadow: '0 0 8px rgba(238,33,30,0.6)' }}
      />
    </div>
  )
}
