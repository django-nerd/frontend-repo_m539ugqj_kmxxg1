import React from 'react'
import { motion, useScroll, useSpring, useReducedMotion, useTransform } from 'framer-motion'

// Global scroll-linked effects: progress bar and subtle ambient gradient parallax
export default function ScrollEffects() {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Smooth progress for the top bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.2 })

  // Parallax for an ambient gradient ribbon that moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.18, 0.12])

  if (prefersReduced) {
    // Minimal progress indicator for orientation
    return (
      <div className="fixed top-0 left-0 right-0 z-40" aria-hidden>
        <div className="h-[2px] w-full bg-white/10" />
      </div>
    )
  }

  return (
    <div className="fixed inset-x-0 top-0 z-40" aria-hidden>
      {/* Scroll progress bar */}
      <motion.div
        className="origin-left h-[3px] bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-indigo-400"
        style={{ scaleX }}
      />

      {/* Ambient gradient ribbon with gentle parallax */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-0 right-0 h-48"
        style={{ y, opacity }}
      >
        <div className="h-full w-full blur-2xl"
          style={{
            background:
              'radial-gradient(60% 70% at 50% 30%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(50% 60% at 20% 80%, rgba(168,85,247,0.16), transparent 60%), radial-gradient(40% 50% at 80% 40%, rgba(99,102,241,0.18), transparent 60%)'
          }}
        />
      </motion.div>
    </div>
  )
}
