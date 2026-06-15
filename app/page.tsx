'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

/* ─── DATA ─────────────────────────────────────────── */
const FEATURES = [
  { title: 'High-End Finishes',          desc: 'Quartz countertops. Luxury vinyl plank. Stainless appliances. Matte black hardware throughout.' },
  { title: 'Private Fenced Yards',       desc: 'Each unit has its own enclosed outdoor space. Ground-level, fenced, yours.' },
  { title: '2- & 3-Car Garages',         desc: 'Oversized attached garages. Built for trucks, gear, and everything that comes with living in Colorado.' },
  { title: 'Tankless Hot Water',         desc: 'On-demand. No tank, no wait, no running out.' },
  { title: 'Primary Suite with Balcony', desc: 'The primary bedroom opens to a private balcony. A floor dedicated to rest.' },
  { title: 'Community Spaces',           desc: 'Pergola, fire pit, BBQ area, and a dedicated dog park. Shared amenities without the apartment-complex feel.' },
  { title: 'Three-Story Floor Plans',    desc: 'Living on the main floor. Bedrooms on their own level. A layout that separates work, life, and sleep.' },
  { title: 'Considered Throughout',      desc: 'From the entry threshold to the primary bath — every material, every finish, every detail was a decision.' },
]

const PHOTOS = [
  { src: '/images/exterior-street.jpg',  label: 'Exterior' },
  { src: '/images/living-kitchen.jpg',   label: 'Living & Kitchen' },
  { src: '/images/living-room.jpg',      label: 'Living Room' },
  { src: '/images/primary-bedroom.jpg',  label: 'Primary Suite' },
  { src: '/images/bath-primary.jpg',     label: 'Primary Bath' },
  { src: '/images/bedroom-2.jpg',        label: 'Bedroom' },
  { src: '/images/bedroom-3.jpg',        label: 'Bedroom' },
  { src: '/images/bedroom-4.jpg',        label: 'Bedroom' },
  { src: '/images/entryway.jpg',         label: 'Entry' },
  { src: '/images/office.jpg',           label: 'Office / Den' },
  { src: '/images/garage.jpg',           label: 'Garage' },
  { src: '/images/bath-full.jpg',        label: 'Full Bath' },
  { src: '/images/bath-half.jpg',        label: 'Bath' },
  { src: '/images/laundry.jpg',          label: 'Laundry' },
  { src: '/images/exterior-door.jpg',    label: 'Entry Detail' },
]

const FLOOR_PLANS = [
  {
    name: 'The Addison',
    tag: '3 Bed + Office · 4 Bath · 2-Car Garage',
    beds: '3 + Office', baths: '4', garage: '2-Car',
    desc: 'Three bedrooms, a private office or den on the entry level, four baths arranged across three floors. The 2-car garage enters directly into the home. A covered patio off the living level.',
    details: [
      'Private office / den on entry level',
      'Open living and dining on second floor',
      'Covered patio off main living',
      'Three bedrooms on third floor',
      'W/D closet on bedroom level',
      'Oversized 2-car attached garage',
    ],
    floors: [
      { label: 'First Floor',  img: '/images/floor-addison-1.png' },
      { label: 'Second Floor', img: '/images/floor-addison-2.png' },
      { label: 'Third Floor',  img: '/images/floor-addison-3.png' },
    ],
  },
  {
    name: 'The Forge',
    tag: '3 Bed · 3 Bath · 3-Car Garage',
    beds: '3', baths: '3', garage: '3-Car',
    desc: "Three bedrooms, three baths, and an oversized 3-car garage. Built for the household that needs room — for vehicles, equipment, or the kind of life that doesn't fit in a standard two-car.",
    details: [
      'Oversized 3-car attached garage',
      'Open living and dining on second floor',
      'Covered patio off main living',
      'Three bedrooms on third floor',
      'W/D closet on bedroom level',
      'Direct garage entry',
    ],
    floors: [
      { label: 'First Floor',  img: '/images/floor-forge-1.png' },
      { label: 'Second Floor', img: '/images/floor-forge-2.png' },
      { label: 'Third Floor',  img: '/images/floor-forge-3.png' },
    ],
  },
]

/* ─── SCROLL REVEAL ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
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
      <div className="py-16 px-4">
        <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-4">Received</p>
        <h3 className="font-serif text-3xl text-off-white font-light mb-4">You are on the list.</h3>
        <p className="font-sans text-sm text-off-white/60 leading-relaxed">
          We will be in touch with availability and next steps. A confirmation is on its way to your inbox.
        </p>
      </div>
    )
  }

  const inputCls = 'w-full bg-brown border border-white/10 px-4 py-3 text-off-white placeholder-off-white/30 font-sans text-sm focus:outline-none focus:border-taupe transition-colors'
  const labelCls = 'block text-taupe font-sans text-xs tracking-widest uppercase mb-2'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Name</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="First & Last" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@email.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="(970) 000-0000" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Floor Plan</label>
          <select name="unit" value={form.unit} onChange={handle} className={inputCls + ' cursor-pointer'}>
            <option value="">Select one</option>
            <option value="The Addison — 2-Car Garage">The Addison — 2-Car Garage</option>
            <option value="The Forge — 3-Car Garage">The Forge — 3-Car Garage</option>
            <option value="Either / Flexible">Either / Flexible</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Move-In Timeline</label>
          <select name="timeline" value={form.timeline} onChange={handle} className={inputCls + ' cursor-pointer'}>
            <option value="">Select one</option>
            <option value="ASAP">ASAP</option>
            <option value="1-2 months">1-2 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
            <option value="Just looking">Just looking</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Message</label>
        <textarea name="message" value={form.message} onChange={handle} rows={3} placeholder="Anything you would like us to know." className={inputCls + ' resize-none'} />
      </div>
      {error && <p className="text-red-400 text-sm font-sans">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-champagne text-brown font-sans text-xs tracking-widest uppercase py-4 hover:bg-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {status === 'sending' ? 'Sending...' : 'Request Information'}
      </button>
      <p className="text-off-white/25 text-xs font-sans text-center">Private tours available by appointment.</p>
    </form>
  )
}

/* ─── PHOTO CAROUSEL ────────────────────────────────── */
function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setCurrent((c) => (c - 1 + PHOTOS.length) % PHOTOS.length)
  const next = () => setCurrent((c) => (c + 1) % PHOTOS.length)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === 'Escape') setLightbox(null)
        if (e.key === 'ArrowRight') setLightbox((p) => (p! + 1) % PHOTOS.length)
        if (e.key === 'ArrowLeft') setLightbox((p) => (p! - 1 + PHOTOS.length) % PHOTOS.length)
      } else {
        if (e.key === 'ArrowRight') next()
        if (e.key === 'ArrowLeft') prev()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  const getVisible = () => [0, 1, 2].map(i => PHOTOS[(current + i) % PHOTOS.length])

  return (
    <>
      <div className="relative">
        <div className="hidden md:grid grid-cols-3 gap-3">
          {getVisible().map((p, i) => (
            <button
              key={`${current}-${i}`}
              onClick={() => setLightbox((current + i) % PHOTOS.length)}
              className="relative aspect-[4/3] overflow-hidden focus:outline-none group"
            >
              <Image src={p.src} alt={p.label} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="33vw" />
              <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/20 transition-colors duration-300 flex items-end p-4">
                <span className="text-off-white text-xs font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">{p.label}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="md:hidden relative aspect-[4/3]">
          <Image src={PHOTOS[current].src} alt={PHOTOS[current].label} fill className="object-cover" sizes="100vw" />
        </div>
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brown/70 hover:bg-brown text-off-white flex items-center justify-center transition-colors z-10 text-xl" aria-label="Previous">&#8249;</button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brown/70 hover:bg-brown text-off-white flex items-center justify-center transition-colors z-10 text-xl" aria-label="Next">&#8250;</button>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {PHOTOS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-champagne' : 'bg-brown/20'}`} aria-label={`Photo ${i + 1}`} />
        ))}
      </div>
      <div className="text-center mt-3">
        <span className="font-sans text-xs text-taupe tracking-widest uppercase">{current + 1} / {PHOTOS.length}</span>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 bg-brown/97 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-off-white/50 hover:text-off-white text-3xl z-10" onClick={() => setLightbox(null)} aria-label="Close">&#x2715;</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-off-white text-5xl z-10 px-2" onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + PHOTOS.length) % PHOTOS.length) }} aria-label="Previous">&#8249;</button>
          <div className="relative max-w-4xl w-full max-h-[85vh] aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].label} fill className="object-contain" sizes="90vw" priority />
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-off-white text-5xl z-10 px-2" onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % PHOTOS.length) }} aria-label="Next">&#8250;</button>
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="text-off-white/40 font-sans text-xs tracking-widest uppercase">{PHOTOS[lightbox].label} &middot; {lightbox + 1} / {PHOTOS.length}</span>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── FLOOR PLAN IMAGES ─────────────────────────────── */
function FloorPlanImages({ floors }: { floors: { label: string; img: string }[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {floors.map((f, i) => (
          <div key={i} className="text-center">
            <button
              onClick={() => setLightbox(i)}
              className="w-full relative aspect-[3/4] bg-soft-gray/30 border border-soft-gray overflow-hidden group focus:outline-none focus:ring-1 focus:ring-champagne block"
              aria-label={`View ${f.label}`}
            >
              <Image src={f.img} alt={f.label} fill className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 33vw, 20vw" />
              <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/10 transition-colors duration-300" />
            </button>
            <span className="font-sans text-xs text-taupe tracking-widest uppercase mt-2 block">{f.label}</span>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 bg-brown/97 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-off-white/50 hover:text-off-white text-3xl z-10" onClick={() => setLightbox(null)} aria-label="Close">&#x2715;</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-off-white text-5xl z-10 px-2" onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + floors.length) % floors.length) }} aria-label="Previous">&#8249;</button>
          <div className="relative w-full max-w-lg max-h-[85vh] aspect-[3/4] bg-white" onClick={(e) => e.stopPropagation()}>
            <Image src={floors[lightbox].img} alt={floors[lightbox].label} fill className="object-contain p-4" sizes="90vw" priority />
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-off-white text-5xl z-10 px-2" onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % floors.length) }} aria-label="Next">&#8250;</button>
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="text-off-white/40 font-sans text-xs tracking-widest uppercase">{floors[lightbox].label}</span>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── FLOOR PLANS ───────────────────────────────────── */
function FloorPlans() {
  const [active, setActive] = useState(0)
  const plan = FLOOR_PLANS[active]

  return (
    <div>
      <div className="flex gap-0 mb-12 border-b border-soft-gray">
        {FLOOR_PLANS.map((p, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-8 py-4 font-serif text-xl transition-all duration-200 border-b-2 -mb-px focus:outline-none ${
              active === i ? 'text-brown border-brown' : 'text-brown/30 border-transparent hover:text-brown/60'
            }`}
          >{p.name}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-2">{plan.tag}</p>
          <div className="flex gap-10 my-6 py-6 border-t border-b border-soft-gray">
            {[{ label: 'Bedrooms', val: plan.beds }, { label: 'Baths', val: plan.baths }, { label: 'Garage', val: plan.garage }].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl text-brown font-light">{s.val}</div>
                <div className="font-sans text-xs text-taupe tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="font-sans text-brown/70 text-sm leading-relaxed mb-8">{plan.desc}</p>
          <ul className="space-y-3 mb-10">
            {plan.details.map((d, i) => (
              <li key={i} className="flex items-start gap-3 font-sans text-sm text-brown/70">
                <span className="w-px h-4 bg-taupe flex-shrink-0 mt-0.5" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mb-8">
            <div className="font-sans text-xs tracking-widest uppercase text-taupe mb-2">Starting At</div>
            <div className="font-serif text-5xl text-brown font-light">$2,795<span className="text-xl text-taupe">/mo</span></div>
          </div>
          <a href="#contact" className="inline-block border border-brown text-brown font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-brown hover:text-off-white transition-colors">
            Request a Tour
          </a>
        </div>
        <FloorPlanImages floors={plan.floors} />
      </div>
    </div>
  )
}

/* ─── PAGE ──────────────────────────────────────────── */
export default function Home() {
  useReveal()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#features',    label: 'Features' },
    { href: '#photos',      label: 'Photos' },
    { href: '#floor-plans', label: 'Floor Plans' },
    { href: '#location',    label: 'Location' },
    { href: '#contact',     label: 'Contact' },
  ]

  return (
    <div className="bg-off-white min-h-screen">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-brown border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo — white bg pill so JPG shows cleanly on dark nav */}
          <a href="#" className="flex flex-col leading-tight">
            <span className="font-serif text-xl text-off-white tracking-wide">The Row</span>
            <span className="font-sans text-xs text-taupe tracking-[0.2em] uppercase">Townhomes at 2534</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="font-sans text-xs text-off-white/50 tracking-widest uppercase hover:text-champagne transition-colors">{l.label}</a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:block border border-champagne/60 text-champagne font-sans text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-champagne hover:text-brown transition-colors">
            Request a Tour
          </a>

          <button className="md:hidden text-off-white p-2" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            <div className={`w-5 h-px bg-off-white mb-1.5 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-px bg-off-white mb-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-px bg-off-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden bg-brown border-t border-white/5 px-8 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="font-sans text-xs text-off-white/60 tracking-widest uppercase hover:text-champagne transition-colors">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="border border-champagne/60 text-champagne font-sans text-xs tracking-widest uppercase px-5 py-3 hover:bg-champagne hover:text-brown transition-colors text-center mt-2">
              Request a Tour
            </a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end">
        <div className="absolute inset-0">
          <Image src="/images/exterior-street.jpg" alt="The Row Townhomes at 2534 — Johnstown, CO" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/30 to-brown/5" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full">
          <div className="max-w-2xl">
            <p className="font-sans text-xs tracking-widest uppercase text-champagne mb-5">Johnstown, Colorado &middot; Now Leasing</p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-off-white font-light leading-[1.05] mb-6">
              Three-story townhomes,<br />built to be lived in.
            </h1>
            <p className="font-sans text-off-white/65 text-base leading-relaxed mb-10 max-w-lg">
              32 residences at Exposition Drive and Thompson Parkway. Three bedrooms, private fenced yards, oversized garages. Starting at $2,795/mo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-champagne text-brown font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-off-white transition-colors font-medium text-center">
                Request a Tour
              </a>
              <a href="#features" className="border border-off-white/25 text-off-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-off-white/60 transition-colors text-center">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brown py-8 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: '32',     label: 'Residences' },
            { num: '3',      label: 'Bedrooms' },
            { num: '2-3',    label: 'Car Garages' },
            { num: '$2,795', label: 'Starting / Mo' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-4xl text-champagne font-light">{s.num}</div>
              <div className="font-sans text-xs text-off-white/40 tracking-widest uppercase mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES — now first */}
      <section id="features" className="py-14 px-8 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-8 max-w-lg">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">What Is Included</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-brown font-light">Every detail was a decision.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-cream-warm border border-soft-gray p-8">
                <div className="w-6 h-px bg-taupe mb-6" />
                <h3 className="font-serif text-lg text-brown mb-3 font-light">{f.title}</h3>
                <p className="font-sans text-brown/55 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal mt-12 text-center">
            <a href="#contact" className="inline-block bg-brown text-off-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-brown-mid transition-colors">
              Join the Interest List
            </a>
          </div>
        </div>
      </section>

      {/* PHOTOS — now after features */}
      <section id="photos" className="py-14 px-8 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-8 max-w-lg">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">Photos</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-brown font-light">Inside the residence.</h2>
            <p className="font-sans text-brown/50 mt-4 text-sm leading-relaxed">
              White oak floors. Honed stone. A layout organized around light and separation of space. Use the arrows to browse — click any photo to view full screen.
            </p>
          </div>
          <div className="reveal reveal-delay-1">
            <PhotoCarousel />
          </div>
        </div>
      </section>

      {/* FLOOR PLANS */}
      <section id="floor-plans" className="py-14 px-8 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-8 max-w-lg">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">Floor Plans</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-brown font-light">Two plans. One standard.</h2>
            <p className="font-sans text-brown/50 mt-4 text-sm leading-relaxed">
              The Addison adds a private office on the entry level. The Forge trades it for a third garage bay. Both deliver the same finish level, the same living floor, the same bedroom level.
            </p>
          </div>
          <div className="reveal reveal-delay-1">
            <FloorPlans />
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-14 px-8 bg-brown">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">Location</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-off-white font-light mb-6">
              Exposition Drive &amp;<br />Thompson Parkway.
            </h2>
            <p className="font-sans text-off-white/55 text-sm leading-relaxed mb-10">
              Positioned at the Johnstown-Windsor border. Twenty minutes to Fort Collins. Quick access to I-25. Close enough to everything — far enough from the noise.
            </p>
            <div className="space-y-4 border-t border-white/10 pt-8">
              {[
                ['Address',      'Exposition Drive & Thompson Pkwy, Johnstown, CO 80534'],
                ['Fort Collins', '~20 min north via I-25'],
                ['Greeley',      '~30 min east'],
                ['Denver',       '~1 hr south'],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-6">
                  <span className="font-sans text-xs tracking-widest uppercase text-taupe w-28 flex-shrink-0 pt-0.5">{label}</span>
                  <span className="font-sans text-sm text-off-white/60">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-delay-1 overflow-hidden h-80 lg:h-[420px]">
            <iframe
              title="The Row Townhomes at 2534 location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3043.4!2d-105.058!3d40.398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDIzJzUyLjgiTiAxMDXCsDAzJzI4LjgiVw!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-14 px-8 bg-off-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          <div className="reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">Private Tours</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-brown font-light mb-6">
              Now leasing.<br />Tours by appointment.
            </h2>
            <p className="font-sans text-brown/55 text-sm leading-relaxed mb-10 max-w-sm">
              Units are available now. Submit your information and we will follow up directly with availability, pricing, and scheduling.
            </p>
            <div className="space-y-5 border-t border-brown/10 pt-8">
              <div className="flex gap-6">
                <span className="font-sans text-xs tracking-widest uppercase text-taupe w-20 flex-shrink-0 pt-0.5">Email</span>
                <a href="mailto:hello@row2534.com" className="font-sans text-sm text-brown/60 hover:text-champagne transition-colors">hello@row2534.com</a>
              </div>
              <div className="flex gap-6">
                <span className="font-sans text-xs tracking-widest uppercase text-taupe w-20 flex-shrink-0 pt-0.5">Address</span>
                <p className="font-sans text-sm text-brown/60">Exposition Drive &amp; Thompson Pkwy<br />Johnstown, CO 80534</p>
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-1 bg-brown p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brown border-t border-white/5 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-base text-off-white tracking-wide">The Row</span>
            <span className="font-sans text-xs text-taupe tracking-[0.2em] uppercase">Townhomes at 2534</span>
            <span className="font-sans text-xs text-off-white/30 mt-1">Johnstown, CO 80534</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="font-sans text-xs text-off-white/30 hover:text-off-white/60 transition-colors tracking-widest uppercase">{l.label}</a>
            ))}
          </div>
          <div className="font-sans text-xs text-off-white/25">&copy; {new Date().getFullYear()} The Row at 2534</div>
        </div>
      </footer>

    </div>
  )
}