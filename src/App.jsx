import React from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Showcase from './components/Showcase'
import CTA from './components/CTA'
import Header from './components/Header'
import BackgroundFX from './components/BackgroundFX'
import CaseStudies from './components/CaseStudies'
import ScrollEffects from './components/ScrollEffects'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BackgroundFX />
      <ScrollEffects />
      <Header />
      <main className="relative">
        <Hero />
        <div id="showcase" className="scroll-mt-28">
          <Showcase />
        </div>
        <Services />
        <CaseStudies />
        <CTA />
        <footer className="py-10 text-center text-white/60">
          © {new Date().getFullYear()} aidevelo.ai — AI development company
        </footer>
      </main>
    </div>
  )
}

export default App
