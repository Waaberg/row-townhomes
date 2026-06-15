'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

/* ─── DATA ─────────────────────────────────────────── */
const FEATURES = [
  { icon: '✦', title: 'Luxury Modern Finishes', desc: 'Quartz countertops, luxury vinyl plank floors, stainless appliances, and sleek black hardware throughout.' },
  { icon: '⬡', title: 'Private Fenced Yards', desc: 'Your own outdoor space — perfect for pets, entertaining, or just enjoying the Colorado air.' },
  { icon: '⬛', title: 'Oversized 2- & 3-Car Garages', desc: 'Attached garages sized for trucks, SUVs, gear, and hobbies — not just compact cars.' },
  { icon: '◎', title: 'Tankless Hot Water', desc: 'On-demand hot water that never runs out, no matter how long your morning routine takes.' },
  { icon: '▣', title: 'Spacious Master Suites', desc: 'Private balconies off the master suite for your own quiet outdoor retreat above the noise.' },
  { icon: '◈', title: 'Community Amenities', desc: 'Pergola, fire pit, BBQ area, and a dedicated dog park — shared spaces worth coming home to.' },
  { icon: '▲', title: 'Thoughtful Floor Plans', desc: 'Open living areas on the main floor, bedrooms on their own level — a modern layout that makes sense.' },
  { icon: '◇', title: 'High-End Details', desc: 'Every surface considered. From the entry to the master bath, quality is the baseline — not the upgrade.' },
]

const PHOTOS = [
  { src: '/images/exterior-street.jpg', label: 'Exterior' },
  { src: '/images/living-kitchen.jpg', label: 'Living & Kitchen' },
  { src: '/images/living-room.jpg', label: 'Living Room' },
  { src: '/images/primary-bedroom.jpg', label: 'Primary Suite' },
  { src: '/images/bath-primary.jpg', label: 'Primary Bath' },
  { src: '/images/bedroom-2.jpg', label: 'Bedroom' },
  { src: '/images/bedroom-3.jpg', label: 'Bedroom' },
  { src: '/images/bedroom-4.jpg', label: 'Bedroom' },
  { src: '/images/entryway.jpg', label: 'Entryway' },
  { src: '/images/office.jpg', label: 'Office / Den' },
  { src: '/images/garage.jpg', label: 'Garage' },
  { src: '/images/bath-full.jpg', label: 'Full Bath' },
  { src: '/images/bath-half.jpg', label: 'Half Bath' },
  { src: '/images/laundry.jpg', label: 'Laundry' },
  { src: '/images/exterior-door.jpg', label: 'Entry' },
]

const FLOOR_PLANS = [
  {
    name: 'The Addison',
    beds: '3',
    baths: '2 full + ¾ + ½',
    garage: '2-Car',
    desc: 'Designed for flexibility and comfort with 3 bedrooms, 2 full baths, a ¾ bath, a half bath, a private office/den, and an oversized 2-car garage.',
    highlights: ['Private Office / Den', 'Covered Patio', 'Open Living + Dining', 'Upper-Level Bedrooms', 'W/D Closet on Bedroom Level'],
    floors: [
      { label: 'First Floor', img: '/images/floor-addison-1.png' },
      { label: 'Second Floor', img: '/images/floor-addison-2.png' },
      { label: 'Third Floor', img: '/images/floor-addison-3.png' },
    ],
  },
  {
    name: 'The Forge',
    beds: '3',
    baths: '2.5',
    garage: '3-Car',
    desc: 'Thoughtfully designed with 3 bedrooms, 2.5 baths, and an oversized 3-car garage offering plenty of room for vehicles, gear, and hobbies.',
    highlights: ['Oversized 3-Car Garage', 'Covered Patio', 'Open Living + Dining', 'Upper-Level Bedrooms', 'W/D Closet on Bedroom Level'],
    floors: [
      { label: 'First Floor', img: '/images/floor-forge-1.png' },
      { label: 'Second Floor', img: '/images/floor-forge-2.png' },
      { label: 'Third Floor', img: '/images/floor-forge-3.png' },
    ],
  },
]

/* ─── SCROLL REVEAL HOOK ────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─── CONTACT FORM ──────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', unit: '', timeline: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); setStatus('error'); return }
      setStatus('success')
      setForm({ name: '', email: '', phone: '', unit: '', timeline: '', message: '' })
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16 px-8">
        <div className="text-4xl mb-4">✦</div>
        <h3 className="font-serif text-2xl text-cream mb-3">You're on the list.</h3>
        <p className="text-cream/70 font-sans text-sm leading-relaxed">
          We'll be in touch shortly with availability and next steps.<br />
          Check your inbox — a confirmation is on its way.
        </p>
      </div>
    )
  }

  const inputCls = 'w-full bg-forest-light border border-white/10 rounded px-4 py-3 text-cream placeholder-cream/40 font-sans text-sm focus:outline-none focus:border-gold transition-colors'
  const labelCls = 'block text-cream/60 font-sans text-xs tracking-widest uppercase mb-2'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Name *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="First & Last" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@email.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="(970) 000-0000" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Interested In</label>
          <select name="unit" value={form.unit} onChange={handle} className={inputCls + ' cursor-pointer'}>
            <option value="">Select a floor plan</option>
            <option value="The Addison (2-Car Garage)">The Addison — 2-Car Garage</option>
            <option value="The Forge (3-Car Garage)">The Forge — 3-Car Garage</option>
            <option value="Either / Flexible">Either / Flexible</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Move-In Timeline</label>
          <select name="timeline" value={form.timeline} onChange={handle} className={inputCls + ' cursor-pointer'}>
            <option value="">When are you looking to move?</option>
            <option value="ASAP">ASAP</option>
            <option value="1–2 months">1–2 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="6+ months">6+ months</option>
            <option value="Just exploring">Just exploring</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Message (optional)</label>
        <textarea name="message" value={form.message} onChange={handle} rows={3} placeholder="Anything you'd like us to know..." className={inputCls + ' resize-none'} />
      </div>
      {error && <p className="text-red-400 text-sm font-sans">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gold text-forest-dark font-sans text-xs tracking-widest uppercase py-4 rounded hover:bg-cream-warm transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-medium"
      >
        {status === 'sending' ? 'Sending…' : 'Join the Interest List'}
      </button>
      <p className="text-cream/30 text-xs font-sans text-center">No spam. We'll reach out directly with availability and pricing.</p>
    </form>
  )
}

/* ─── GALLERY ───────────────────────────────────────── */
function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((p) => (p! + 1) % PHOTOS.length)
      if (e.key === 'ArrowLeft') setLightbox((p) => (p! - 1 + PHOTOS.length) % PHOTOS.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {PHOTOS.map((p, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="group relative aspect-square overflow-hidden rounded-sm focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={`View ${p.label}`}
          >
            <Image
              src={p.src}
              alt={p.label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/30 transition-colors duration-300 flex items-end p-3">
              <span className="text-cream text-xs font-sans tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {p.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-forest-dark/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-cream/60 hover:text-cream text-3xl font-light leading-none z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream text-4xl font-thin z-10 px-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + PHOTOS.length) % PHOTOS.length) }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PHOTOS[lightbox].src}
              alt={PHOTOS[lightbox].label}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream text-4xl font-thin z-10 px-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % PHOTOS.length) }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-cream/50 font-sans text-xs tracking-widest uppercase">{PHOTOS[lightbox].label} · {lightbox + 1} / {PHOTOS.length}</span>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── FLOOR PLAN TABS ───────────────────────────────── */
function FloorPlans() {
  const [active, setActive] = useState(0)
  const plan = FLOOR_PLANS[active]

  return (
    <div>
      {/* Tab selector */}
      <div className="flex gap-1 mb-10 border-b border-forest-light">
        {FLOOR_PLANS.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-6 py-3 font-serif text-xl transition-all duration-200 border-b-2 -mb-px focus:outline-none focus:text-gold ${
              active === i
                ? 'text-forest border-forest'
                : 'text-forest/40 border-transparent hover:text-forest/70'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Plan details */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          {/* Stats */}
          <div className="flex gap-6 mb-6">
            {[
              { label: 'Bedrooms', val: plan.beds },
              { label: 'Baths', val: plan.baths },
              { label: 'Garage', val: plan.garage },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl text-forest">{s.val}</div>
                <div className="font-sans text-xs text-forest/50 tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="font-sans text-forest/70 text-sm leading-relaxed mb-8">{plan.desc}</p>

          <h4 className="font-sans text-xs tracking-widest uppercase text-forest/50 mb-3">Highlights</h4>
          <ul className="space-y-2">
            {plan.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-3 font-sans text-sm text-forest/80">
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-forest/10">
            <div className="font-sans text-xs tracking-widest uppercase text-forest/50 mb-1">Starting At</div>
            <div className="font-serif text-4xl text-forest">$2,795<span className="text-lg text-forest/40">/mo</span></div>
          </div>

          <a
            href="#contact"
            className="mt-6 inline-block bg-forest text-cream font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-forest-dark transition-colors rounded-sm"
          >
            Request Info
          </a>
        </div>

        {/* Floor plan images — placeholder tiles since actual floor plan image files aren't uploaded yet */}
        <div className="grid grid-cols-3 gap-3">
          {plan.floors.map((f, i) => (
            <div key={i} className="text-center">
              <div className="bg-cream-warm border border-cream-dark rounded-sm aspect-[3/4] flex items-center justify-center mb-2 relative overflow-hidden">
                {/* Placeholder — swap with <Image> once floor plan PNGs are in /public/images/ */}
                <div className="text-forest/20 font-sans text-xs text-center px-2">
                  <div className="text-3xl mb-2">⬜</div>
                  Floor Plan<br/>Coming Soon
                </div>
              </div>
              <span className="font-sans text-xs text-forest/50 tracking-wide">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function Home() {
  useReveal()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#photos', label: 'Photos' },
    { href: '#features', label: 'Features' },
    { href: '#floor-plans', label: 'Floor Plans' },
    { href: '#location', label: 'Location' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <div className="bg-cream min-h-screen">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-forest/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="font-serif text-xl text-cream tracking-wide">ROW</a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="font-sans text-xs text-cream/60 tracking-widest uppercase hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:block bg-gold text-forest-dark font-sans text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-cream-warm transition-colors rounded-sm font-medium">
            Join Interest List
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className={`w-5 h-0.5 bg-cream mb-1.5 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-cream mb-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-cream transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden bg-forest border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="font-sans text-sm text-cream/70 tracking-widest uppercase hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-gold text-forest-dark font-sans text-xs tracking-widest uppercase px-5 py-3 hover:bg-cream-warm transition-colors rounded-sm font-medium text-center mt-2">
              Join Interest List
            </a>
          </nav>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/exterior-street.jpg"
            alt="ROW Townhomes exterior — Loveland, CO"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-forest-dark/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-4">Loveland, Colorado · Now Leasing</p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-cream font-light leading-tight mb-6">
              Modern living.<br />
              Your own terms.
            </h1>
            <p className="font-sans text-cream/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              32 luxury townhomes at Exposition Drive & Thompson Parkway. Three bedrooms, private yards, oversized garages, and finishes that don't look like a rental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-gold text-forest-dark font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-cream-warm transition-colors rounded-sm font-medium text-center">
                Join the Interest List
              </a>
              <a href="#photos" className="border border-cream/30 text-cream font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-cream/70 hover:bg-white/5 transition-colors rounded-sm text-center">
                See Photos
              </a>
            </div>
          </div>
        </div>

        {/* Starting price tag */}
        <div className="absolute right-6 bottom-20 bg-forest/80 backdrop-blur-sm border border-white/10 rounded-sm px-5 py-4 text-right hidden sm:block">
          <div className="font-sans text-xs text-cream/50 tracking-widest uppercase mb-1">Starting At</div>
          <div className="font-serif text-3xl text-cream">$2,795<span className="text-sm text-cream/50">/mo</span></div>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section className="bg-forest py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: '32', label: 'Total Units' },
            { num: '3', label: 'Bedrooms' },
            { num: '2–3', label: 'Car Garages' },
            { num: '$2,795', label: 'Starting At / Mo' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl text-gold">{s.num}</div>
              <div className="font-sans text-xs text-cream/50 tracking-widest uppercase mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section id="photos" className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 max-w-xl">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">Inside the Addison</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-forest font-light">See it for yourself.</h2>
            <p className="font-sans text-forest/60 mt-4 text-sm leading-relaxed">Every room finished to a standard that stands on its own. Click any photo to explore.</p>
          </div>
          <div className="reveal reveal-delay-1">
            <Gallery />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 bg-forest">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-14 max-w-xl">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">What's Included</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream font-light">Features that define modern living.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {FEATURES.map((f, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 4) + 1} bg-forest p-8 hover:bg-forest-light transition-colors duration-300 group`}>
                <div className="text-gold text-lg mb-4 font-sans">{f.icon}</div>
                <h3 className="font-serif text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">{f.title}</h3>
                <p className="font-sans text-cream/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal mt-10 text-center">
            <a href="#contact" className="inline-block border border-gold/50 text-gold font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold hover:text-forest-dark transition-colors rounded-sm">
              Join the Interest List
            </a>
          </div>
        </div>
      </section>

      {/* ── FLOOR PLANS ── */}
      <section id="floor-plans" className="py-20 px-6 bg-cream-warm">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 max-w-xl">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">Floor Plans</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-forest font-light">Two layouts. One standard.</h2>
            <p className="font-sans text-forest/60 mt-4 text-sm leading-relaxed">Both plans deliver 3 bedrooms, open living, and dedicated bedroom floors. The difference is garage size and a private office den.</p>
          </div>
          <div className="reveal reveal-delay-1">
            <FloorPlans />
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" className="py-20 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">Location</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream font-light mb-6">Where Loveland & Windsor meet.</h2>
            <p className="font-sans text-cream/60 text-sm leading-relaxed mb-8">
              Positioned at Exposition Drive & Thompson Parkway — minutes from I-25, downtown Loveland, Fort Collins, and Greeley. You're close to everything Northern Colorado offers without the noise of being in the middle of it.
            </p>
            <div className="space-y-3">
              {[
                ['📍', 'Exposition Drive & Thompson Pkwy, Loveland, CO 80538'],
                ['🏔️', '~20 min to Fort Collins · ~30 min to Greeley'],
                ['🛣️', 'Quick access to I-25'],
                ['🐾', 'Pet-friendly community'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-start gap-3 font-sans text-sm text-cream/60">
                  <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-delay-1 rounded-sm overflow-hidden h-80 lg:h-96">
            <iframe
              title="ROW Townhomes location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3043.4!2d-105.058!3d40.398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDIzJzUyLjgiTiAxMDXCsDAzJzI4LjgiVw!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-6 bg-forest">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">Get in Touch</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream font-light mb-6">
              Join the<br />interest list.
            </h2>
            <p className="font-sans text-cream/60 text-sm leading-relaxed mb-8 max-w-sm">
              Units are leasing now. Fill out the form and we'll reach out directly with availability, pricing, and how to hold your unit.
            </p>
            <div className="space-y-4 border-t border-white/10 pt-8">
              <div>
                <div className="font-sans text-xs tracking-widest uppercase text-gold/70 mb-1">Email</div>
                <a href="mailto:hello@row2534.com" className="font-sans text-cream/70 text-sm hover:text-cream transition-colors">hello@row2534.com</a>
              </div>
              <div>
                <div className="font-sans text-xs tracking-widest uppercase text-gold/70 mb-1">Address</div>
                <p className="font-sans text-cream/70 text-sm">Exposition Drive & Thompson Pkwy<br />Loveland, CO 80538</p>
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-1 bg-forest-light rounded-sm p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-forest-dark border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-serif text-lg text-cream">ROW Townhomes</div>
            <div className="font-sans text-xs text-cream/40 mt-1">Exposition Drive, Loveland, CO 80538</div>
          </div>
          <div className="flex gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="font-sans text-xs text-cream/40 hover:text-cream/70 transition-colors tracking-wide uppercase">
                {l.label}
              </a>
            ))}
          </div>
          <div className="font-sans text-xs text-cream/30">
            © {new Date().getFullYear()} ROW Townhomes
          </div>
        </div>
      </footer>

    </div>
  )
}
