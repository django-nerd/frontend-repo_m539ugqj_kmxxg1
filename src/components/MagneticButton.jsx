import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

// Magnetic button that subtly follows the pointer with a glossy sheen
export default function MagneticButton({ as: Comp = 'a', href, className = '', children, ...rest }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-20, 20], [8, -8])
  const rotateY = useTransform(x, [-20, 20], [-8, 8])
  const sx = useSpring(x, { stiffness: 120, damping: 12, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 120, damping: 12, mass: 0.2 })

  const onMove = (e) => {
    if (!ref.current || prefersReduced) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-20, Math.min(20, dx / 3)))
    y.set(Math.max(-20, Math.min(20, dy / 3)))
  }

  const onLeave = () => {
    x.set(0); y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={prefersReduced ? undefined : { x: sx, y: sy, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative inline-block"
    >
      <Comp href={href} {...rest} className={`group relative overflow-hidden will-change-transform ${className}`}>
        {/* sheen */}
        <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute -inset-x-10 -inset-y-10 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" />
        </span>
        {children}
      </Comp>
    </motion.div>
  )
}
