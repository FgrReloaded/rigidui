"use client"
import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

export interface DraggableCanvasItem {
  src?: string
  top: string
  left: string
  width?: number | string
  height?: number | string
  render?: React.ReactNode
  hoverScale?: number
}

export interface DraggableCanvasProps {
  items: DraggableCanvasItem[]
  width?: string | number 
  height?: string | number
  showBoundary?: boolean
  showCornerLabels?: boolean
  className?: string
  style?: React.CSSProperties
  friction?: number
  elasticity?: number
  reboundDamping?: number
  stopThreshold?: number
  initialCenter?: boolean
}

export const DraggableCanvas: React.FC<DraggableCanvasProps> = ({
  items,
  width = '300vw',
  height = '150vh',
  showBoundary = false,
  showCornerLabels = false,
  className = '',
  style,
  friction = 0.92,
  elasticity = 0.2,
  reboundDamping = 0.8,
  stopThreshold = 0.01,
  initialCenter = true
}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const frame = useRef(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const offsetX = useRef(0)
  const offsetY = useRef(0)
  const vx = useRef(0)
  const vy = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)
  const lastTime = useRef(0)
  const bounds = useRef({ minX: 0, maxX: 0, minY: 0, maxY: 0 })
  const initialized = useRef(false)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

    const computeBounds = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = el.offsetWidth
      const h = el.offsetHeight
      bounds.current.minX = w > vw ? vw - w : 0
      bounds.current.maxX = 0
      bounds.current.minY = h > vh ? vh - h : 0
      bounds.current.maxY = 0
      if (!initialized.current) {
        if (initialCenter && (w > vw || h > vh)) {
          offsetX.current = w > vw ? (vw - w) / 2 : 0
          offsetY.current = h > vh ? (vh - h) / 2 : 0
        } else {
          offsetX.current = clamp(offsetX.current, bounds.current.minX, bounds.current.maxX)
          offsetY.current = clamp(offsetY.current, bounds.current.minY, bounds.current.maxY)
        }
        initialized.current = true
      } else {
        offsetX.current = clamp(offsetX.current, bounds.current.minX, bounds.current.maxX)
        offsetY.current = clamp(offsetY.current, bounds.current.minY, bounds.current.maxY)
      }
      el.style.transform = `translate3d(${offsetX.current}px, ${offsetY.current}px,0)`
    }
    computeBounds()
    const onResize = () => computeBounds()
    window.addEventListener('resize', onResize)

    const onDown = (cx: number, cy: number) => {
      dragging.current = true
      startX.current = cx - offsetX.current
      startY.current = cy - offsetY.current
      lastX.current = cx
      lastY.current = cy
      lastTime.current = performance.now()
      vx.current = 0
      vy.current = 0
    }
    const onMoveDrag = (cx: number, cy: number) => {
      if (!dragging.current) return
      const now = performance.now()
      const dt = now - lastTime.current
      if (dt > 0) {
        vx.current = ((cx - lastX.current) / dt) * 16
        vy.current = ((cy - lastY.current) / dt) * 16
      }
      offsetX.current = cx - startX.current
      offsetY.current = cy - startY.current
      lastX.current = cx
      lastY.current = cy
      lastTime.current = now
    }
    const onUp = () => { dragging.current = false }

    const pointerDown = (e: MouseEvent) => { e.preventDefault(); onDown(e.clientX, e.clientY) }
    const pointerMove = (e: MouseEvent) => onMoveDrag(e.clientX, e.clientY)
    const pointerUp = () => onUp()
    const touchStart = (e: TouchEvent) => { const t = e.touches[0]; onDown(t.clientX, t.clientY) }
    const touchMove = (e: TouchEvent) => { const t = e.touches[0]; onMoveDrag(t.clientX, t.clientY) }
    const touchEnd = () => onUp()

    el.addEventListener('mousedown', pointerDown)
    window.addEventListener('mousemove', pointerMove)
    window.addEventListener('mouseup', pointerUp)
    el.addEventListener('touchstart', touchStart, { passive: false })
    window.addEventListener('touchmove', touchMove, { passive: false })
    window.addEventListener('touchend', touchEnd)

    const applyBounds = () => {
      if (offsetX.current < bounds.current.minX) {
        const o = bounds.current.minX - offsetX.current
        offsetX.current = bounds.current.minX + o * elasticity
        vx.current *= reboundDamping
      } else if (offsetX.current > bounds.current.maxX) {
        const o = offsetX.current - bounds.current.maxX
        offsetX.current = bounds.current.maxX + o * elasticity
        vx.current *= reboundDamping
      }
      if (offsetY.current < bounds.current.minY) {
        const o = bounds.current.minY - offsetY.current
        offsetY.current = bounds.current.minY + o * elasticity
        vy.current *= reboundDamping
      } else if (offsetY.current > bounds.current.maxY) {
        const o = offsetY.current - bounds.current.maxY
        offsetY.current = bounds.current.maxY + o * elasticity
        vy.current *= reboundDamping
      }
    }

    const loop = () => {
      if (!dragging.current) {
        offsetX.current += vx.current
        offsetY.current += vy.current
        vx.current *= friction
        vy.current *= friction
        if (Math.abs(vx.current) < stopThreshold) vx.current = 0
        if (Math.abs(vy.current) < stopThreshold) vy.current = 0
      }
      applyBounds()
      el.style.transform = `translate3d(${offsetX.current}px, ${offsetY.current}px,0)`
      frame.current = requestAnimationFrame(loop)
    }
    frame.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', onResize)
      el.removeEventListener('mousedown', pointerDown)
      window.removeEventListener('mousemove', pointerMove)
      window.removeEventListener('mouseup', pointerUp)
      el.removeEventListener('touchstart', touchStart)
      window.removeEventListener('touchmove', touchMove)
      window.removeEventListener('touchend', touchEnd)
      cancelAnimationFrame(frame.current)
    }
  }, [elasticity, friction, reboundDamping, stopThreshold, initialCenter])

  return (
    <div
      ref={canvasRef}
      className={
        `absolute top-0 left-0 ${showBoundary ? 'draggable-boundary' : ''} ${className}`
      }
      style={{
        width,
        height,
        backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        ...style
      }}
    >
      {showBoundary && showCornerLabels && (
        <>
          <div className="dc-corner tl">TL</div>
          <div className="dc-corner tr">TR</div>
          <div className="dc-corner bl">BL</div>
          <div className="dc-corner br">BR</div>
        </>
      )}
      {items.map((item, i) => {
        const content = item.render ?? (
          <motion.img
            src={item.src}
            alt={item.src || `item-${i}`}
            className="w-full h-full object-contain"
            whileHover={{ scale: item.hoverScale ?? 1.05 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
        )
        return (
          <motion.div
            key={i}
            className="absolute overflow-hidden will-change-transform draggable-item"
            style={{
              top: item.top,
              left: item.left,
              width: item.width ?? 320,
              height: item.height ?? 440
            }}
            whileHover={{ scale: item.hoverScale ?? 1.05 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {content}
          </motion.div>
        )
      })}
      <style jsx global>{`
        .draggable-boundary{border:2px dashed #444;}
        .draggable-boundary .dc-corner{position:absolute;width:38px;height:38px;display:flex;align-items:center;justify-content:center;font-size:10px;letter-spacing:.5px;font-weight:500;background:#1c1c1c;border:1px solid #555;border-radius:6px;color:#777;user-select:none;}
        .draggable-boundary .dc-corner.tl{top:0;left:0;transform:translate(-45%,-45%)}
        .draggable-boundary .dc-corner.tr{top:0;right:0;transform:translate(45%,-45%)}
        .draggable-boundary .dc-corner.bl{bottom:0;left:0;transform:translate(-45%,45%)}
        .draggable-boundary .dc-corner.br{bottom:0;right:0;transform:translate(45%,45%)}
        .draggable-item{transition:box-shadow .3s ease; width: var(--draggable-item-width); height: var(--draggable-item-height);}
        .draggable-item:hover{box-shadow:0 8px 25px rgba(0,0,0,.2)}
      `}</style>
    </div>
  )
}

export default DraggableCanvas
