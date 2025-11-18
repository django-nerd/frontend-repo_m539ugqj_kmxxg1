import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

const ScrollContext = createContext({ activeId: null })
export const useActiveSection = () => useContext(ScrollContext)

// Adds smooth anchor scrolling and active section tracking using IntersectionObserver
export default function SmoothScrollProvider({ children }) {
  const [activeId, setActiveId] = useState(null)
  const observerRef = useRef(null)

  useEffect(() => {
    // Smooth scroll for in-page anchors
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      const y = target.getBoundingClientRect().top + window.scrollY - 96 // account for header
      window.scrollTo({ top: y, behavior: 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id], div[id]'))
    const options = { root: null, rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id) setActiveId(id)
        }
      })
    }, options)
    sections.forEach((el) => io.observe(el))
    observerRef.current = io
    return () => io.disconnect()
  }, [])

  return (
    <ScrollContext.Provider value={{ activeId }}>
      {children}
    </ScrollContext.Provider>
  )
}
