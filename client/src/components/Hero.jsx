import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ChevronRight } from 'lucide-react'
import { heroSlides } from '../data/data'

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef(null)
  const intervalRef = useRef(null)
  const SLIDE_DURATION = 6000

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, 1.08])

  useEffect(() => {
    setProgress(0)
    const start = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(progressInterval)
    }, 30)

    intervalRef.current = setTimeout(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length)
    }, SLIDE_DURATION)

    return () => {
      clearTimeout(intervalRef.current)
      clearInterval(progressInterval)
    }
  }, [current])

  const goTo = (idx) => {
    setCurrent(idx)
    setProgress(0)
  }

  const slide = heroSlides[current]

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-obsidian">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/20" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto"
        style={{ opacity }}
      >
        {/* Slide accent tag */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-px bg-gold" />
            <span className="font-body font-light tracking-[0.4em] text-xs uppercase text-gold">
              {slide.accent}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Main heading */}
        <div className="overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1-${current}`}
              className="display-heading text-6xl sm:text-7xl md:text-8xl lg:text-[110px] text-ivory"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ whiteSpace: 'pre-line' }}
            >
              {slide.heading.split('\n')[0]}
            </motion.h1>
          </AnimatePresence>
        </div>
        <div className="overflow-hidden mb-10">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1b-${current}`}
              className="display-heading text-6xl sm:text-7xl md:text-8xl lg:text-[110px] italic text-gold"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
            >
              {slide.heading.split('\n')[1] || ''}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${current}`}
            className="font-body font-light text-sm md:text-base text-ivory/50 max-w-md mb-12 leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {slide.subheading}
          </motion.p>
        </AnimatePresence>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/collections" className="btn-gold">
            Explore Collections
          </Link>
          <Link to="/contact" className="btn-outline">
            Book Consultation
          </Link>
        </motion.div>

        {/* Slide number */}
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className="relative flex flex-col items-center gap-1 group"
            >
              <span className={`font-body font-light text-xs transition-colors duration-300 ${idx === current ? 'text-gold' : 'text-ivory/20'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className={`w-px transition-all duration-500 ${idx === current ? 'h-12 bg-gold' : 'h-4 bg-ivory/20 group-hover:h-8 group-hover:bg-ivory/40'}`}>
                {idx === current && (
                  <motion.div
                    className="w-full bg-gold-light"
                    style={{ height: `${progress}%` }}
                  />
                )}
              </div>
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="font-body font-light tracking-[0.4em] text-[9px] uppercase text-ivory/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-gold/50" />
        </motion.div>
      </motion.div>

      {/* Bottom stats bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 border-t border-gold/10 glass-dark hidden md:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="max-w-[1600px] mx-auto px-12 py-5 flex items-center gap-16">
          {[
            { label: 'Projects', value: '500+' },
            { label: 'Countries', value: '12' },
            { label: 'Awards', value: '48' },
            { label: 'Years', value: '15+' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              {i > 0 && <div className="w-px h-6 bg-gold/20" />}
              <div>
                <div className="font-display text-xl font-light text-gold">{stat.value}</div>
                <div className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-ivory/30">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
