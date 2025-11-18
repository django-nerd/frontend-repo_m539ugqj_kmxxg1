import React from 'react'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 p-8">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5), transparent 25%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.5), transparent 25%)' }} />
          <div className="relative">
            <h3 className="text-2xl sm:text-4xl font-bold text-white">Let’s build your AI advantage</h3>
            <p className="mt-3 text-white/80">Tell us about your goals — we’ll propose a roadmap within 48 hours.</p>
            <form className="mt-6 grid gap-4 sm:grid-cols-3">
              <input className="col-span-1 rounded-lg bg-black/40 px-4 py-3 text-white placeholder:text-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" placeholder="Name" />
              <input className="col-span-1 rounded-lg bg-black/40 px-4 py-3 text-white placeholder:text-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" placeholder="Email" />
              <button type="button" className="col-span-1 rounded-lg bg-white text-slate-900 font-semibold px-4 py-3 hover:bg-white/90 transition">Request proposal</button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
