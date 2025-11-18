import React from 'react'
import { Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur">
          <a href="#" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
            <span className="font-semibold text-white">aidevelo.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#showcase" className="hover:text-white">Showcase</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <button className="md:hidden text-white/80" aria-label="menu">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  )
}
