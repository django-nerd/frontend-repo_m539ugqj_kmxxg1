import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

export default function HoloCard({ className = '', children }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useTransform(my, [-40, 40], [8, -8])
  const ry = useTransform(mx, [-40, 40], [-8, 8])
  const sx = useSpring(mx, { stiffness: 120, damping: 14 })
  const sy = useSpring(my, { stiffness: 120, damping: 14 })

  const onMove = (e) => {
    if (!ref.current || prefersReduced) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    mx.set(Math.max(-40, Math.min(40, dx / 2)))
    my.set(Math.max(-40, Math.min(40, dy / 2)))
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={prefersReduced ? undefined : { x: sx, y: sy, rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className={`relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur overflow-hidden ${className}`}
    >
      {/* animated border glow */}
      <span aria-hidden className="pointer-events-none absolute -inset-[1px] rounded-[1.1rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(167,139,250,0.25),rgba(14,165,233,0.25),rgba(244,114,182,0.25),rgba(167,139,250,0.25))] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </motion.div>
  )
}
