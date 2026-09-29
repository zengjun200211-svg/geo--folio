import { useEffect, useRef } from 'react'

/**
 * MosaicWaves — 马赛克波浪（复刻 reactbits 效果）
 * 细格子 + domain warp 弯曲 + 波浪亮脊 + 鼠标交互
 */
export default function MosaicWaves({ className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', onMove)

    const TILE = 10
    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const cols = Math.ceil(w / TILE)
      const rows = Math.ceil(h / TILE)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * TILE + TILE / 2
          const y = j * TILE + TILE / 2

          // domain warp：两层正弦扭曲坐标
          const wx = x + Math.sin(y * 0.008 + t * 0.6) * 30
          const wy = y + Math.cos(x * 0.007 - t * 0.5) * 25

          // 波浪场
          const wave = Math.sin(wx * 0.006 + t * 0.8) + Math.cos(wy * 0.009 - t * 0.5)
          let v = wave / 2
          v = Math.pow(Math.max(0, v), 3) // falloff 收紧亮脊

          // 鼠标交互
          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            v = Math.min(1, v + (1 - dist / 180) * 0.7)
          }

          if (v < 0.02) continue

          // 品牌红
          ctx.fillStyle = `rgba(238, ${Math.round(33 + v * 80)}, ${Math.round(30 + v * 70)}, ${0.4 + v * 0.6})`

          const s = TILE * (0.5 + v * 0.5)
          const off = (TILE - s) / 2
          ctx.fillRect(i * TILE + off, j * TILE + off, s, s)
        }
      }
      t += 0.015
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
