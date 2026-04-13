import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function CollectionCard({ collection, index }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.07 }}
      className="group relative"
    >
      <Link to="/collections" className="block">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-[4/5]">
          {/* Tag */}
          <div className="absolute top-4 right-4 z-20 font-body font-light tracking-[0.3em] text-[9px] uppercase px-3 py-1.5 bg-gold text-obsidian">
            {collection.tag}
          </div>

          {/* Image */}
          <motion.img
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 card-overlay" />

          {/* Hover reveal content */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-body font-light text-xs text-ivory/60 mb-2 leading-relaxed">
                {collection.description}
              </p>
              <div className="flex items-center gap-2 text-gold">
                <span className="font-body font-light tracking-[0.3em] text-[10px] uppercase">Explore</span>
                <ArrowUpRight size={12} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Info below image */}
        <div className="pt-5 flex items-start justify-between">
          <div>
            <p className="font-body font-light tracking-[0.2em] text-[10px] uppercase text-gold/70 mb-1">
              {collection.subtitle}
            </p>
            <h3 className="font-display text-2xl font-light text-ivory group-hover:text-gold transition-colors duration-300">
              {collection.title}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-body font-light text-xs text-ivory/30 tracking-wide">
              {collection.count}
            </p>
            <motion.div
              className="mt-2 flex items-center justify-end gap-1 text-gold/40 group-hover:text-gold transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <ArrowUpRight size={14} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
