import React from 'react'
import { Brain, Bot, Globe, Sparkles, Workflow } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Bot,
    title: 'Autonomous Agents',
    desc: 'Custom AI agents that plan, reason, and act to achieve goals across your workflows.'
  },
  {
    icon: Globe,
    title: 'AI Websites',
    desc: 'Next-gen websites with built-in AI: chat, search, personalization, and analytics.'
  },
  {
    icon: Brain,
    title: 'AI Implementations',
    desc: 'Integrate LLMs, embeddings, and automation into your existing tools and pipelines.'
  },
  {
    icon: Sparkles,
    title: 'Enhancements',
    desc: 'Upgrade your site with voice, vision, and realtime features for a futuristic experience.'
  },
  {
    icon: Workflow,
    title: 'Process Automation',
    desc: 'Orchestrate complex, multi-step tasks with reliable, observable agent workflows.'
  }
]

export default function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">Services</h2>
          <p className="mt-4 text-white/70">From concept to production, we deliver intelligent systems that drive measurable outcomes.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition" />
              <Icon className="h-8 w-8 text-white/90" />
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-white/70">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
