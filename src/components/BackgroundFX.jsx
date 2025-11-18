import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

// Interactive mouse-reactive background with motion-safe fallbacks and perf optimizations
export default function BackgroundFX() {
  const prefersReduced = useReducedMotion()
  const [isCoarsePointer, setIsCoarsePointer] = useState(false)

  useEffect(() => {
    // Detect coarse pointers (touch devices)
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setIsCoarsePointer(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  // If user prefers reduced motion, render a lightweight static background
  if (prefersReduced) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.15),transparent),radial-gradient(800px_400px_at_10%_110%,rgba(56,189,248,0.12),transparent),radial-gradient(600px_300px_at_90%_120%,rgba(168,85,247,0.15),transparent)]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
    )
  }

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const intensity = isCoarsePointer ? 0.4 : 1
  const translateGlow1X = useTransform(smoothX, [0, 1], [-15 * intensity, 15 * intensity])
  const translateGlow1Y = useTransform(smoothY, [0, 1], [-15 * intensity, 15 * intensity])
  const translateGlow2X = useTransform(smoothX, [0, 1], [20 * intensity, -20 * intensity])
  const translateGlow2Y = useTransform(smoothY, [0, 1], [10 * intensity, -10 * intensity])

  // rAF-throttled mouse tracking for better performance
  const frame = useRef(0)
  const lastXY = useRef({ x: 0.5, y: 0.5 })
  useEffect(() => {
    const onMove = (e) => {
      lastXY.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          mouseX.set(lastXY.current.x)
          mouseY.set(lastXY.current.y)
          frame.current = 0
        })
      }
    }

    const onVisibility = () => {
      if (document.hidden && frame.current) {
        cancelAnimationFrame(frame.current)
        frame.current = 0
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Subtle cyber grid */}
      <div className="absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.15),transparent),radial-gradient(800px_400px_at_10%_110%,rgba(56,189,248,0.12),transparent),radial-gradient(600px_300px_at_90%_120%,rgba(168,85,247,0.15),transparent)]" />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow orbs following cursor */}
      <motion.div className="absolute -top-24 -left-24 w-[40vw] h-[40vw] rounded-full blur-3xl bg-fuchsia-600/20" style={{ x: translateGlow1X, y: translateGlow1Y }} />
      <motion.div className="absolute -bottom-24 -right-24 w-[35vw] h-[35vw] rounded-full blur-3xl bg-indigo-600/20" style={{ x: translateGlow2X, y: translateGlow2Y }} />

      {/* Animated scanlines and parallax stars */}
      <motion.div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" initial={{ y: '110%' }} animate={{ y: ['110%', '-10%'] }} transition={{ repeat: Infinity, duration: isCoarsePointer ? 12 : 8, ease: 'linear' }} />
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(2px_2px_at_20%_30%,rgba(255,255,255,0.3),transparent), radial-gradient(1px_1px_at_60%_70%,rgba(255,255,255,0.2),transparent), radial-gradient(1.5px_1.5px_at_80%_20%,rgba(255,255,255,0.25),transparent)' }} />
      </div>
    </div>
  )
}
