import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CollectionCard from '../components/CollectionCard'
import { collections } from '../data/data'

const filters = ['All', 'Kitchens', 'Bedrooms', 'Living', 'Finishes', 'Bathrooms', 'Offices']

export default function Collections() {
  const [active, setActive] = useState('All')

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle at 80% 30%, #C9A84C 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.p
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            className="display-heading text-6xl md:text-8xl lg:text-[120px] text-ivory mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            Collections
          </motion.h1>
          <motion.div
            className="w-full h-px mt-12"
            style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </section>

      {/* Filter */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-wrap gap-4">
          {filters.map(f => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`font-body font-light tracking-[0.3em] text-xs uppercase px-6 py-3 border transition-all duration-300 ${
                active === f
                  ? 'bg-gold text-obsidian border-gold'
                  : 'border-gold/20 text-ivory/40 hover:border-gold/50 hover:text-ivory'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-36">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((c, i) => (
            <CollectionCard key={c.id} collection={c} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
