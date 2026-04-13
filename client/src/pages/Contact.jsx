import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react'

const budgets = ['£50k – £100k', '£100k – £250k', '£250k – £500k', '£500k+']
const projectTypes = ['Residential', 'Penthouse', 'Villa', 'Commercial', 'Yacht / Private Jet', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = (field) => `
    w-full bg-transparent border-b py-4 font-body font-light text-sm text-ivory/80
    placeholder:text-ivory/20 outline-none transition-all duration-500
    ${focused === field ? 'border-gold' : 'border-gold/15'}
  `

  return (
    <>
      {/* Header */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.p className="section-tag" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            Get In Touch
          </motion.p>
          <motion.h1
            className="display-heading text-6xl md:text-8xl lg:text-[120px] text-ivory mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            Contact
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

      {/* Main content */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-36">
        <div className="grid lg:grid-cols-5 gap-20">

          {/* Left: info */}
          <div className="lg:col-span-2 space-y-16">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-body font-light text-sm text-ivory/50 leading-relaxed mb-10">
                We work with a select number of clients each year, ensuring every project receives our complete devotion. If you are ready to begin, we would be delighted to hear from you.
              </p>

              <div className="space-y-8">
                {[
                  { Icon: MapPin, label: 'Studio', value: '12 Mayfair Quarter, London W1K 4AA' },
                  { Icon: Phone, label: 'Phone', value: '+44 (0) 207 123 4567' },
                  { Icon: Mail, label: 'Email', value: 'hello@aurum.design' },
                  { Icon: Clock, label: 'Hours', value: 'Mon–Fri  9:00 – 18:00' },
                ].map(({ Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-5"
                  >
                    <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-gold/60" />
                    </div>
                    <div>
                      <p className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-gold/50 mb-1">{label}</p>
                      <p className="font-body font-light text-sm text-ivory/60">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative overflow-hidden aspect-square border border-gold/10"
            >
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
                alt="London Mayfair"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-gold mx-auto mb-3 animate-pulse" />
                  <p className="font-body font-light tracking-[0.3em] text-[10px] uppercase text-gold">Mayfair, London</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-32"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-20 h-20 border border-gold flex items-center justify-center mb-10"
                  >
                    <Check size={32} className="text-gold" />
                  </motion.div>
                  <h2 className="font-display text-4xl font-light text-ivory mb-4">Thank You</h2>
                  <p className="font-body font-light text-sm text-ivory/40 max-w-sm leading-relaxed">
                    Your enquiry has been received. One of our designers will be in touch within 48 hours to arrange your consultation.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-10"
                >
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                      <label className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-gold/50 block mb-2">Full Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="Alexandra Voss"
                        className={inputClass('name')}
                      />
                    </div>
                    <div>
                      <label className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-gold/50 block mb-2">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="hello@example.com"
                        className={inputClass('email')}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-gold/50 block mb-2">Phone Number</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      placeholder="+44 ..."
                      className={inputClass('phone')}
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-gold/50 block mb-4">Project Type</label>
                    <div className="flex flex-wrap gap-3">
                      {projectTypes.map(type => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm(prev => ({ ...prev, type }))}
                          className={`font-body font-light tracking-[0.2em] text-[10px] uppercase px-4 py-2.5 border transition-all duration-300 ${
                            form.type === type
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gold/15 text-ivory/30 hover:border-gold/40 hover:text-ivory/60'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-gold/50 block mb-4">Investment Budget</label>
                    <div className="flex flex-wrap gap-3">
                      {budgets.map(b => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm(prev => ({ ...prev, budget: b }))}
                          className={`font-body font-light tracking-[0.2em] text-[10px] uppercase px-4 py-2.5 border transition-all duration-300 ${
                            form.budget === b
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gold/15 text-ivory/30 hover:border-gold/40 hover:text-ivory/60'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-body font-light tracking-[0.3em] text-[9px] uppercase text-gold/50 block mb-2">Tell Us About Your Project</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      rows={5}
                      placeholder="Describe your vision, the space, your aspirations..."
                      className={inputClass('message') + ' resize-none'}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gold w-full sm:w-auto px-16"
                  >
                    Send Enquiry
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
