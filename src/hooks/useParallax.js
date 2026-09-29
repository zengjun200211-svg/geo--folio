import { useEffect } from 'react'

/** 滚动视差：data-parallax="0.2" 表示滚动时元素位移系数 */
export default function useParallax() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-parallax]'))
    if (!els.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        els.forEach((el) => {
          const rect = el.getBoundingClientRect()
          const speed = parseFloat(el.dataset.parallax || '0.2')
          const offset = (rect.top - window.innerHeight / 2) * speed * -1
          el.style.transform = `translateY(${offset}px)`
        })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
