import { useEffect, useRef } from 'react'

/**
 * 自定义光标：实心红点 + 延迟跟随的描边环 + 短拖尾拉线
 * 仅桌面端（pointer: fine）启用，移动端回退系统光标
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    document.documentElement.classList.add('cursor-active')

    const dot = dotRef.current
    const ring = ringRef.current
    const trail = trailRef.current
    const ctx = trail.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      trail.width = window.innerWidth * dpr
      trail.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: innerWidth / 2, y: innerHeight / 2, ready: false }
    const ringPos = { ...mouse }
    const points = []
    let hovering = false
    let down = false

    const onMove = (e) => {
      if (!mouse.ready) {
        mouse.ready = true
        trail.style.opacity = 1
        ring.style.opacity = 1
        dot.style.opacity = 1
      }
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      if (points.length > 14) points.shift()

      const target = e.target.closest('a,button,[data-cursor="hover"],input,summary')
      hovering = !!target
    }
    const onDown = () => (down = true)
    const onUp = () => (down = false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    let raf
    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16
      ringPos.y += (mouse.y - ringPos.y) * 0.16
      const scale = hovering ? 1.9 : down ? 0.7 : 1
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%) scale(${scale})`
      ring.style.borderColor = hovering ? '#EE211E' : 'rgba(242,242,243,0.7)'
      dot.style.opacity = hovering ? 0 : 1

      // 拖尾拉线
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      const now = performance.now()
      while (points.length && now - points[0].t > 260) points.shift()
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1]
          const p1 = points[i]
          const age = (now - p1.t) / 260
          const alpha = Math.max(0, (1 - age) * (i / points.length) * 0.55)
          ctx.strokeStyle = `rgba(238,33,30,${alpha})`
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.classList.remove('cursor-active')
    }
  }, [])

  return (
    <>
      <canvas
        ref={trailRef}
        className="pointer-events-none fixed inset-0 z-[9998] hidden h-full w-full opacity-0 md:block"
        style={{ width: '100vw', height: '100vh' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border opacity-0 md:block"
        style={{ borderColor: 'rgba(242,242,243,0.7)', transition: 'border-color .2s, background-color .2s' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-brand opacity-0 md:block"
      />
    </>
  )
}
