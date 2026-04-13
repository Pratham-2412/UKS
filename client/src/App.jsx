import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'

// Custom cursor: rAF only while moving/ring catching up; transform-only (no layout); hover via pointerover (no elementFromPoint)
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const target = { x: 0, y: 0 }
    const ring = { x: 0, y: 0 }
    let ringSynced = false
    let rafId = 0
    let pointerDirty = false
    let hoverInteractive = false

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, summary, [tabindex]:not([tabindex="-1"])'

    const ringScale = () => (hoverInteractive ? 1.5 : 1)

    const applyRingChrome = () => {
      const ringEl = ringRef.current
      if (!ringEl) return
      ringEl.style.opacity = hoverInteractive ? '0.5' : '1'
    }

    const scheduleFrame = () => {
      if (rafId !== 0) return
      rafId = requestAnimationFrame(tick)
    }

    const onPointerOverCapture = (e) => {
      if (e.pointerType === 'touch') return
      const t = e.target
      if (!(t instanceof Element)) return
      const next = !!t.closest(interactiveSelector)
      if (next === hoverInteractive) return
      hoverInteractive = next
      applyRingChrome()
      scheduleFrame()
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return
      target.x = e.clientX
      target.y = e.clientY
      pointerDirty = true
      if (!ringSynced) {
        ring.x = target.x
        ring.y = target.y
        ringSynced = true
      }
      scheduleFrame()
    }

    const tick = () => {
      const dotEl = dotRef.current
      const ringEl = ringRef.current
      if (!dotEl || !ringEl) {
        rafId = 0
        return
      }

      const moveTick = pointerDirty
      pointerDirty = false

      const lerp = 0.38
      ring.x += (target.x - ring.x) * lerp
      ring.y += (target.y - ring.y) * lerp

      const s = ringScale()
      dotEl.style.transform = `translate3d(${target.x}px,${target.y}px,0) translate(-50%,-50%)`
      ringEl.style.transform = `translate3d(${ring.x}px,${ring.y}px,0) translate(-50%,-50%) scale3d(${s},${s},1)`

      const dist = Math.hypot(target.x - ring.x, target.y - ring.y)
      const keepGoing = moveTick || dist > 0.35

      if (keepGoing) {
        rafId = requestAnimationFrame(tick)
      } else {
        ring.x = target.x
        ring.y = target.y
        ringEl.style.transform = `translate3d(${target.x}px,${target.y}px,0) translate(-50%,-50%) scale3d(${s},${s},1)`
        rafId = 0
      }
    }

    const start = () => {
      if (!mq.matches) return
      document.addEventListener('pointermove', onPointerMove, { passive: true })
      document.addEventListener('pointerover', onPointerOverCapture, true)
    }

    const stop = () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOverCapture, true)
      cancelAnimationFrame(rafId)
      rafId = 0
      ringSynced = false
      pointerDirty = false
    }

    const onMq = () => {
      stop()
      if (mq.matches) start()
    }

    if (mq.matches) start()
    mq.addEventListener('change', onMq)

    return () => {
      mq.removeEventListener('change', onMq)
      stop()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX, width: '100%' }}
    />
  )
}

// Loading Screen
function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          className="font-display text-5xl font-light tracking-[0.3em] gold-text mb-4"
          initial={{ letterSpacing: '0.1em', opacity: 0 }}
          animate={{ letterSpacing: '0.3em', opacity: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          AURUM
        </motion.div>
        <motion.div
          className="w-32 h-px mx-auto mb-4"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.p
          className="font-body font-light tracking-[0.4em] text-xs text-gold/60 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Luxury Interiors
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

// Page transition wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** SPA: forward navigations start at top; Back/Forward (POP) keeps native scroll position. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useLayoutEffect(() => {
    if (navType === 'POP') return

    if (hash) {
      const id = hash.slice(1)
      const el = id ? document.getElementById(id) : null
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    html.scrollTop = 0
    html.style.scrollBehavior = prev
  }, [pathname, hash, navType])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/collections" element={<PageWrapper><Collections /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence>
        {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}
