import React from 'react'
import { motion } from 'framer-motion'

const items = [
  {
    title: 'Agentic Support',
    text: '24/7 AI concierge that resolves 70% of tickets autonomously with full audit trails.'
  },
  {
    title: 'AI Commerce',
    text: 'Conversational storefronts that remember preferences and increase conversion.'
  },
  {
    title: 'Realtime Analytics',
    text: 'Streaming dashboards powered by embeddings and semantic search.'
  }
]

export default function Showcase() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">Built for the future</h2>
            <p className="mt-4 text-white/70">Modular architectures, observability by default, and privacy-first design. We build for scale without sacrificing speed.</p>
            <div className="mt-8 space-y-4">
              {items.map((it, i) => (
                <motion.div key={it.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5">
                  <span aria-hidden className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/20 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="relative text-white font-semibold">{it.title}</h3>
                  <p className="relative text-white/70">{it.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 overflow-hidden">
            <div className="absolute inset-0 mix-blend-screen bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_40%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            </div>
            {/* sweep highlight */}
            <motion.div aria-hidden className="absolute -inset-x-20 -inset-y-20 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ x: '-120%' }} whileInView={{ x: '120%' }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
