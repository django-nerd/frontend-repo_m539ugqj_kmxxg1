import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { useActiveSection } from './SmoothScrollProvider'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { activeId } = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkBase = 'hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm'
  const isActive = (id) => activeId === id

  return (
    <header className={`fixed top-0 inset-x-0 z-30 transition-all ${scrolled ? 'backdrop-blur supports-[backdrop-filter]:bg-black/40' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`mt-6 flex items-center justify-between rounded-2xl border px-4 py-3 transition-all ${scrolled ? 'border-white/10 bg-black/40' : 'border-transparent bg-transparent'}`}>
          <a href="#" className="flex items-center gap-2" aria-label="Aidevelo Home">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
            <span className="font-semibold text-white">aidevelo.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#services" className={`${linkBase} ${isActive('services') ? 'text-white' : ''}`}>Services</a>
            <a href="#showcase" className={`${linkBase} ${isActive('showcase') ? 'text-white' : ''}`}>Showcase</a>
            <a href="#case-studies" className={`${linkBase} ${isActive('case-studies') ? 'text-white' : ''}`}>Case Studies</a>
            <a href="#contact" className={`${linkBase} ${isActive('contact') ? 'text-white' : ''}`}>Contact</a>
          </nav>
          <button className="md:hidden text-white/80" aria-label="Open menu">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  )
}
