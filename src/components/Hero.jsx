import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center">
      {/* 3D Spline Background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays for depth, keep pointer events disabled so Spline remains interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      <div className="relative z-10 container mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/80">Now building with autonomous AI agents</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Aidevelo.ai
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80">
            We craft intelligent agents, AI-powered websites, and futuristic enhancements that accelerate your business.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-white/90 text-slate-900 px-5 py-3 font-semibold shadow hover:bg-white transition">
              Start a project
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 text-white px-5 py-3 font-semibold hover:bg-white/10 transition">
              Explore services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
