import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const studies = [
  {
    title: 'E‑commerce Copilot',
    desc: 'Conversational shopping assistant that increased AOV by 18%.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Support Automation',
    desc: 'Agentic triage and resolution for Tier‑1 tickets (70% deflection).',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Realtime Analytics',
    desc: 'Streaming insights with semantic search across event firehose.',
    image: 'https://images.unsplash.com/photo-1551281044-8d8d0d8d9b44?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Voice Concierge',
    desc: 'Low‑latency voice agent for bookings and customer care.',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1400&auto=format&fit=crop',
  },
]

export default function CaseStudies() {
  const [index, setIndex] = useState(0)
  const total = studies.length
  const containerRef = useRef(null)

  // Autoresize observer to snap properly
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  // For SR users, announce the active slide
  const activeLabel = useMemo(() => `${studies[index].title}: ${studies[index].desc}`, [index])

  return (
    <section id="case-studies" className="relative py-24 scroll-mt-28" aria-label="Case studies">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">Case studies</h2>
            <p className="mt-3 text-white/70 max-w-2xl">Selected work showcasing measurable outcomes with agentic systems and AI‑powered experiences.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={prev} className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30" aria-label="Previous slide">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30" aria-label="Next slide">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 relative">
          {/* Carousel viewport */}
          <div ref={containerRef} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="flex" style={{ transform: `translateX(-${index * 100}%)`, transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
              {studies.map((s, i) => (
                <article key={s.title} className="min-w-full">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] md:aspect-auto md:h-[420px]">
                      <img src={s.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
                    </div>
                    <div className="p-6 md:p-10 flex flex-col justify-center">
                      <h3 className="text-2xl font-semibold text-white">{s.title}</h3>
                      <p className="mt-3 text-white/70">{s.desc}</p>
                      <div className="mt-6 flex items-center gap-2">
                        {studies.map((_, dot) => (
                          <span key={dot} aria-hidden className={`h-2 w-2 rounded-full ${dot === index ? 'bg-white' : 'bg-white/30'}`} />
                        ))}
                      </div>
                      <span className="sr-only" aria-live="polite">{activeLabel}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile controls overlay */}
          <div className="sm:hidden absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
            <button onClick={prev} className="rounded-full bg-black/40 p-2 text-white/80 backdrop-blur border border-white/10" aria-label="Previous slide">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="rounded-full bg-black/40 p-2 text-white/80 backdrop-blur border border-white/10" aria-label="Next slide">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
