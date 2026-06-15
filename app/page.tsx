'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

/* ─── DATA ─────────────────────────────────────────── */
const FEATURES = [
  {
    title: 'High-End Finishes',
    desc: 'Quartz countertops. Luxury vinyl plank. Stainless appliances. Matte black hardware throughout.',
  },
  {
    title: 'Private Fenced Yards',
    desc: 'Each unit has its own enclosed outdoor space. Ground-level, fenced, yours.',
  },
  {
    title: '2- & 3-Car Garages',
    desc: 'Oversized attached garages. Built for trucks, gear, and everything that comes with living in Colorado.',
  },
  {
    title: 'Tankless Hot Water',
    desc: 'On-demand. No tank, no wait, no running out.',
  },
  {
    title: 'Primary Suite with Balcony',
    desc: 'The primary bedroom opens to a private balcony. A floor dedicated to rest.',
  },
  {
    title: 'Community Spaces',
    desc: 'Pergola, fire pit, BBQ area, and a dedicated dog park. Shared amenities without the apartment-complex feel.',
  },
  {
    title: 'Three-Story Floor Plans',
    desc: 'Living on the main floor. Bedrooms on their own level. A layout that separates work, life, and sleep.',
  },
  {
    title: 'Considered Throughout',
    desc: 'From the entry threshold to the primary bath — every material, every finish, every detail was a decision.',
  },
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
    beds: '3 + Office',
    baths: '4',
    garage: '2-Car',
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
    beds: '3',
    baths: '3',
    garage: '3-Car',
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

  const inputCls = 'w-full bg-charcoal border border-white/10 px-4 py-3 text-off-white placeholder-off-white/30 font-sans text-sm focus:outline-none focus:border-taupe transition-colors'
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
        className="w-full bg-champagne text-charcoal font-sans text-xs tracking-widest uppercase py-4 hover:bg-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {status === 'sending' ? 'Sending...' : 'Request Information'}
      </button>
      <p className="text-off-white/25 text-xs font-sans text-center">Private tours available by appointment.</p>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
        {PHOTOS.map((p, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="group relative aspect-square overflow-hidden focus:outline-none focus:ring-1 focus:ring-champagne"
            aria-label={`View ${p.label}`}
          >
            <Image
              src={p.src}
              alt={p.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-300 flex items-end p-3">
              <span className="text-off-white text-xs font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {p.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-charcoal/97 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-off-white/50 hover:text-off-white text-3xl font-light z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >x</button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-off-white text-5xl font-thin z-10 px-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + PHOTOS.length) % PHOTOS.length) }}
            aria-label="Previous"
          >&lsaquo;</button>
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-off-white text-5xl font-thin z-10 px-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % PHOTOS.length) }}
            aria-label="Next"
          >&rsaquo;</button>
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="text-off-white/40 font-sans text-xs tracking-widest uppercase">
              {PHOTOS[lightbox].label} &middot; {lightbox + 1} / {PHOTOS.length}
            </span>
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
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-8 py-4 font-serif text-xl transition-all duration-200 border-b-2 -mb-px focus:outline-none ${
              active === i
                ? 'text-charcoal border-charcoal'
                : 'text-charcoal/30 border-transparent hover:text-charcoal/60'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-2">{plan.tag}</p>

          <div className="flex gap-10 my-6 py-6 border-t border-b border-soft-gray">
            {[
              { label: 'Bedrooms', val: plan.beds },
              { label: 'Baths',    val: plan.baths },
              { label: 'Garage',   val: plan.garage },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl text-charcoal font-light">{s.val}</div>
                <div className="font-sans text-xs text-taupe tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="font-sans text-deep-slate text-sm leading-relaxed mb-8">{plan.desc}</p>

          <ul className="space-y-3 mb-10">
            {plan.details.map((d, i) => (
              <li key={i} className="flex items-start gap-3 font-sans text-sm text-deep-slate">
                <span className="w-px h-4 bg-taupe flex-shrink-0 mt-0.5" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mb-8">
            <div className="font-sans text-xs tracking-widest uppercase text-taupe mb-2">Starting At</div>
            <div className="font-serif text-5xl text-charcoal font-light">$2,795<span className="text-xl text-taupe">/mo</span></div>
          </div>

          <a
            href="#contact"
            className="inline-block border border-charcoal text-charcoal font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-charcoal hover:text-off-white transition-colors"
          >
            Request a Tour
          </a>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {plan.floors.map((f, i) => (
            <div key={i} className="text-center">
              <div className="bg-soft-gray/40 border border-soft-gray aspect-[3/4] flex items-center justify-center mb-3">
                <span className="font-sans text-xs text-taupe/50 text-center leading-relaxed px-2">
                  Floor plan<br />coming soon
                </span>
              </div>
              <span className="font-sans text-xs text-taupe tracking-widest uppercase">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── PAGE ──────────────────────────────────────────── */
export default function Home() {
  useReveal()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#photos',      label: 'Photos' },
    { href: '#features',    label: 'Features' },
    { href: '#floor-plans', label: 'Floor Plans' },
    { href: '#location',    label: 'Location' },
    { href: '#contact',     label: 'Contact' },
  ]

  return (
    <div className="bg-off-white min-h-screen">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-charcoal border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <a href="#" className="font-serif text-lg text-off-white tracking-wide">
            The Row <span className="text-taupe font-light">at 2534</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="font-sans text-xs text-off-white/50 tracking-widest uppercase hover:text-champagne transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:block border border-champagne/60 text-champagne font-sans text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-champagne hover:text-charcoal transition-colors">
            Request a Tour
          </a>

          <button
            className="md:hidden text-off-white p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className={`w-5 h-px bg-off-white mb-1.5 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-px bg-off-white mb-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-px bg-off-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden bg-charcoal border-t border-white/5 px-8 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="font-sans text-xs text-off-white/60 tracking-widest uppercase hover:text-champagne transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="border border-champagne/60 text-champagne font-sans text-xs tracking-widest uppercase px-5 py-3 hover:bg-champagne hover:text-charcoal transition-colors text-center mt-2">
              Request a Tour
            </a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/exterior-street.jpg"
            alt="The Row Townhomes at 2534 — Loveland, CO"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full">
          <div className="max-w-2xl">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-5">
              Loveland, Colorado &middot; Now Leasing
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-off-white font-light leading-[1.05] mb-6">
              Three-story townhomes,<br />built to be lived in.
            </h1>
            <p className="font-sans text-off-white/65 text-base leading-relaxed mb-10 max-w-lg">
              32 residences at Exposition Drive and Thompson Parkway. Three bedrooms, private fenced yards, oversized garages. Starting at $2,795/mo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-champagne text-charcoal font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-off-white transition-colors font-medium text-center">
                Request a Tour
              </a>
              <a href="#photos" className="border border-off-white/25 text-off-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-off-white/60 transition-colors text-center">
                View Photos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-deep-slate py-10 px-8">
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

      {/* PHOTOS */}
      <section id="photos" className="py-20 px-8 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 max-w-lg">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">The Addison &middot; Model Unit</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal font-light">Inside the residence.</h2>
            <p className="font-sans text-deep-slate/60 mt-4 text-sm leading-relaxed">White oak floors. Honed stone. A layout organized around light and separation of space. Select any photo to view full screen.</p>
          </div>
          <div className="reveal reveal-delay-1">
            <Gallery />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-14 max-w-lg">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">What Is Included</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-off-white font-light">Every detail was a decision.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1} bg-charcoal p-8 hover:bg-deep-slate transition-colors duration-300 group`}
              >
                <div className="w-6 h-px bg-taupe mb-6" />
                <h3 className="font-serif text-lg text-off-white mb-3 font-light group-hover:text-champagne transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="font-sans text-off-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 text-center">
            <a
              href="#contact"
              className="inline-block border border-taupe/40 text-taupe font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-champagne hover:text-champagne transition-colors"
            >
              Request a Tour
            </a>
          </div>
        </div>
      </section>

      {/* FLOOR PLANS */}
      <section id="floor-plans" className="py-20 px-8 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 max-w-lg">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">Floor Plans</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal font-light">Two plans. One standard.</h2>
            <p className="font-sans text-deep-slate/60 mt-4 text-sm leading-relaxed">
              The Addison adds a private office on the entry level. The Forge trades it for a third garage bay. Both deliver the same finish level, the same living floor, the same bedroom level.
            </p>
          </div>
          <div className="reveal reveal-delay-1">
            <FloorPlans />
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-20 px-8 bg-deep-slate">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">Location</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-off-white font-light mb-6">
              Exposition Drive &amp;<br />Thompson Parkway.
            </h2>
            <p className="font-sans text-off-white/55 text-sm leading-relaxed mb-10">
              Positioned at the Loveland-Windsor border. Twenty minutes to Fort Collins. Quick access to I-25. Close enough to everything — far enough from the noise.
            </p>
            <div className="space-y-4 border-t border-white/10 pt-8">
              {[
                ['Address',      'Exposition Drive & Thompson Pkwy, Loveland, CO 80538'],
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

      {/* CONTACT */}
      <section id="contact" className="py-20 px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          <div className="reveal">
            <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-3">Private Tours</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-off-white font-light mb-6">
              Now leasing.<br />Tours by appointment.
            </h2>
            <p className="font-sans text-off-white/55 text-sm leading-relaxed mb-10 max-w-sm">
              Units are available now. Submit your information and we will follow up directly with availability, pricing, and scheduling.
            </p>
            <div className="space-y-5 border-t border-white/10 pt-8">
              <div className="flex gap-6">
                <span className="font-sans text-xs tracking-widest uppercase text-taupe w-20 flex-shrink-0 pt-0.5">Email</span>
                <a href="mailto:hello@row2534.com" className="font-sans text-sm text-off-white/60 hover:text-champagne transition-colors">
                  hello@row2534.com
                </a>
              </div>
              <div className="flex gap-6">
                <span className="font-sans text-xs tracking-widest uppercase text-taupe w-20 flex-shrink-0 pt-0.5">Address</span>
                <p className="font-sans text-sm text-off-white/60">
                  Exposition Drive &amp; Thompson Pkwy<br />Loveland, CO 80538
                </p>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1 bg-deep-slate p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal border-t border-white/5 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-serif text-base text-off-white">
              The Row <span className="text-taupe font-light">at 2534</span>
            </div>
            <div className="font-sans text-xs text-off-white/30 mt-1">Exposition Drive, Loveland, CO 80538</div>
          </div>
          <div className="flex flex-wrap gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="font-sans text-xs text-off-white/30 hover:text-off-white/60 transition-colors tracking-widest uppercase">
                {l.label}
              </a>
            ))}
          </div>
          <div className="font-sans text-xs text-off-white/25">
            &copy; {new Date().getFullYear()} The Row at 2534
          </div>
        </div>
      </footer>

    </div>
  )
}
