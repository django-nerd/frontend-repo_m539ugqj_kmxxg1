import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Interactive mouse-reactive background: subtle parallax glow orbs and grid lines
export default function BackgroundFX() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const translateGlow1X = useTransform(smoothX, [0, 1], [-15, 15])
  const translateGlow1Y = useTransform(smoothY, [0, 1], [-15, 15])
  const translateGlow2X = useTransform(smoothX, [0, 1], [20, -20])
  const translateGlow2Y = useTransform(smoothY, [0, 1], [10, -10])

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = e.clientX / innerWidth
      const y = e.clientY / innerHeight
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Subtle cyber grid */}
      <div className="absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.15),transparent),radial-gradient(800px_400px_at_10%_110%,rgba(56,189,248,0.12),transparent),radial-gradient(600px_300px_at_90%_120%,rgba(168,85,247,0.15),transparent)]" />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow orbs following cursor */}
      <motion.div className="absolute -top-24 -left-24 w-[40vw] h-[40vw] rounded-full blur-3xl bg-fuchsia-600/20" style={{ x: translateGlow1X, y: translateGlow1Y }} />
      <motion.div className="absolute -bottom-24 -right-24 w-[35vw] h-[35vw] rounded-full blur-3xl bg-indigo-600/20" style={{ x: translateGlow2X, y: translateGlow2Y }} />

      {/* Animated scanline */}
      <motion.div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" initial={{ y: '110%' }} animate={{ y: ['110%', '-10%'] }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} />
    </div>
  )
}
