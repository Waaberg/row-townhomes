'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

/* ─── DATA ─────────────────────────────────────────── */
const FEATURES = [
  { title: 'High-End Finishes',          desc: 'Quartz countertops. Luxury vinyl plank. Stainless appliances. Matte black hardware throughout.' },
  { title: 'Private Fenced Yards',       desc: 'Each unit has its own enclosed outdoor space. Ground-level, fenced, yours.' },
  { title: '2- & 3-Car Garages',         desc: 'Oversized attached garages. Built for trucks, gear, and everything that comes with living in Colorado.' },
  { title: 'Tankless Hot Water',         desc: 'On-demand. No tank, no wait, no running out.' },
  { title: 'Primary Suite & Balcony',    desc: 'The primary bedroom opens to a private balcony. A floor dedicated to rest.' },
  { title: 'Community Spaces',           desc: 'Pergola, fire pit, BBQ area, and a dedicated dog park.' },
  { title: 'Three-Story Floor Plans',    desc: 'Living on the main floor. Bedrooms on their own level. A layout that separates work, life, and sleep.' },
  { title: 'Beautiful Details',          desc: 'From the entry threshold to the primary bath — every material and finish was carefully thought out.' },
]

const PHOTOS = [
  { src: '/images/exterior-street.jpg',  label: 'Exterior',        wide: true },
  { src: '/images/living-kitchen.jpg',   label: 'Living & Kitchen', wide: false },
  { src: '/images/primary-bedroom.jpg',  label: 'Primary Suite',    wide: false },
  { src: '/images/garage.jpg',           label: 'Garage',           wide: true },
  { src: '/images/living-room.jpg',      label: 'Living Room',      wide: false },
  { src: '/images/bath-primary.jpg',     label: 'Primary Bath',     wide: false },
  { src: '/images/entryway.jpg',         label: 'Entry',            wide: false },
  { src: '/images/office.jpg',           label: 'Office / Den',     wide: true },
  { src: '/images/bedroom-2.jpg',        label: 'Bedroom',          wide: false },
  { src: '/images/bath-full.jpg',        label: 'Full Bath',        wide: false },
  { src: '/images/laundry.jpg',          label: 'Laundry',          wide: false },
  { src: '/images/exterior-door.jpg',    label: 'Entry Detail',     wide: false },
]

const PLANS = {
  addison: {
    name: 'The Addison',
    tag: '3 Bed · 4 Bath · 2-Car Garage',
    beds: '3', baths: '4', garage: '2',
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
  forge: {
    name: 'The Forge',
    tag: '3 Bed · 3 Bath · 3-Car Garage',
    beds: '3', baths: '3', garage: '3',
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
}

// Buildings with correct Addison/Forge assignments from the actual site plan
const BUILDINGS = [
  { id: 'B1', label: 'Building 1', units: [
    { num: '5079', plan: 'addison' as const },
    { num: '5075', plan: 'forge' as const },
    { num: '5071', plan: 'forge' as const },
    { num: '5067', plan: 'forge' as const },
    { num: '5063', plan: 'forge' as const },
    { num: '5059', plan: 'addison' as const },
  ]},
  { id: 'B2', label: 'Building 2', units: [
    { num: '5055', plan: 'addison' as const },
    { num: '5051', plan: 'forge' as const },
    { num: '5047', plan: 'addison' as const },
    { num: '5043', plan: 'addison' as const },
  ]},
  { id: 'B3', label: 'Building 3', units: [
    { num: '5039', plan: 'addison' as const },
    { num: '5035', plan: 'forge' as const },
    { num: '5031', plan: 'addison' as const },
    { num: '5027', plan: 'addison' as const },
  ]},
  { id: 'B4', label: 'Building 4', units: [
    { num: '5077', plan: 'addison' as const },
    { num: '5073', plan: 'forge' as const },
    { num: '5069', plan: 'forge' as const },
    { num: '5065', plan: 'forge' as const },
    { num: '5061', plan: 'forge' as const },
    { num: '5057', plan: 'addison' as const },
  ]},
  { id: 'B5', label: 'Building 5', units: [
    { num: '5049', plan: 'addison' as const },
    { num: '5045', plan: 'forge' as const },
    { num: '5041', plan: 'addison' as const },
  ]},
  { id: 'B6', label: 'Building 6', units: [
    { num: '5037', plan: 'addison' as const },
    { num: '5033', plan: 'forge' as const },
    { num: '5029', plan: 'addison' as const },
    { num: '5025', plan: 'addison' as const },
  ]},
  { id: 'B7', label: 'Building 7', units: [
    { num: '5021', plan: 'addison' as const },
    { num: '5017', plan: 'addison' as const },
    { num: '5013', plan: 'forge' as const },
    { num: '5009', plan: 'forge' as const },
    { num: '5005', plan: 'addison' as const },
    { num: '5001', plan: 'forge' as const },
  ]},
]

/* ─── SCROLL REVEAL ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─── NAV ───────────────────────────────────────────── */
function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features',    label: 'Features' },
    { href: '#photos',      label: 'Photos' },
    { href: '#sitemap',     label: 'Site Map' },
    { href: '#floor-plans', label: 'Floor Plans' },
    { href: '#location',    label: 'Location' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(31,21,8,0.97)' : '#1F1508',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      transition: 'background .3s',
    }}>
      <div className="nav-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: '#F5F2EC', letterSpacing: '.03em', lineHeight: 1.1 }}>The Row</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: '#A89887', marginTop: 2 }}>at 2534</div>
        </a>

        <nav style={{ display: 'flex', gap: 32 }} className="hide-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,242,236,.5)', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A97A')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,242,236,.5)')}
            >{l.label}</a>
          ))}
        </nav>

        <a href="#contact" className="hide-mobile" style={{
          border: '1px solid rgba(201,169,122,.5)', color: '#C9A97A',
          fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          padding: '10px 22px', textDecoration: 'none', transition: 'all .2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C9A97A'; e.currentTarget.style.color = '#1F1508'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A97A'; }}
        >Schedule a Tour</a>

        <button className="show-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <div style={{ width: 22, height: 1, background: '#F5F2EC', marginBottom: 6, transition: 'all .2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: 22, height: 1, background: '#F5F2EC', marginBottom: 6, transition: 'all .2s', opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 22, height: 1, background: '#F5F2EC', transition: 'all .2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: '#1F1508', borderTop: '1px solid rgba(255,255,255,.06)', padding: '24px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(245,242,236,.6)', textDecoration: 'none' }}>{l.label}</a>
          ))}
          <a href="#contact" style={{ border: '1px solid rgba(201,169,122,.5)', color: '#C9A97A', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '12px', textDecoration: 'none', textAlign: 'center' }}>Schedule a Tour</a>
        </div>
      )}
    </header>
  )
}

/* ─── PHOTO STRIP ───────────────────────────────────── */
function PhotoStrip() {
  const stripRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    const onDown = (e: MouseEvent) => { isDown.current = true; el.style.cursor = 'grabbing'; startX.current = e.pageX - el.offsetLeft; scrollLeft.current = el.scrollLeft; }
    const onUp = () => { isDown.current = false; el.style.cursor = 'grab'; }
    const onMove = (e: MouseEvent) => { if (!isDown.current) return; e.preventDefault(); el.scrollLeft = scrollLeft.current - (e.pageX - el.offsetLeft - startX.current) * 1.5; }
    el.addEventListener('mousedown', onDown)
    el.addEventListener('mouseup', onUp)
    el.addEventListener('mouseleave', onUp)
    el.addEventListener('mousemove', onMove)
    return () => { el.removeEventListener('mousedown', onDown); el.removeEventListener('mouseup', onUp); el.removeEventListener('mouseleave', onUp); el.removeEventListener('mousemove', onMove); }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(p => (p! + 1) % PHOTOS.length)
      if (e.key === 'ArrowLeft') setLightbox(p => (p! - 1 + PHOTOS.length) % PHOTOS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <div ref={stripRef} className="photo-strip" style={{ display: 'flex', gap: 3, overflowX: 'auto', padding: '0 40px', scrollbarWidth: 'none', cursor: 'grab', userSelect: 'none' }}>
        {PHOTOS.map((p, i) => (
          <div key={i} onClick={() => setLightbox(i)} style={{ flex: `0 0 ${p.wide ? 480 : 300}px`, height: 360, position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'flex-basis .4s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.flexBasis = '420px'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.flexBasis = p.wide ? '480px' : '300px'; }}
          >
            <Image src={p.src} alt={p.label} fill className="object-cover" sizes="400px" style={{ transition: 'transform .6s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(31,21,8,.6) 0%, transparent 50%)', display: 'flex', alignItems: 'flex-end', padding: 16 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(245,242,236,.8)' }}>{p.label}</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(31,21,8,.97)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setLightbox(null)}>
          <button style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 32, cursor: 'pointer', zIndex: 10 }} onClick={() => setLightbox(null)}>×</button>
          <button style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 52, cursor: 'pointer', zIndex: 10 }} onClick={e => { e.stopPropagation(); setLightbox(p => (p! - 1 + PHOTOS.length) % PHOTOS.length) }}>‹</button>
          <div style={{ position: 'relative', width: '90vw', maxWidth: 1000, height: '80vh' }} onClick={e => e.stopPropagation()}>
            <Image src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].label} fill className="object-contain" sizes="90vw" priority />
          </div>
          <button style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 52, cursor: 'pointer', zIndex: 10 }} onClick={e => { e.stopPropagation(); setLightbox(p => (p! + 1) % PHOTOS.length) }}>›</button>
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(245,242,236,.35)' }}>{PHOTOS[lightbox].label} · {lightbox + 1} / {PHOTOS.length}</span>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── SITE MAP ──────────────────────────────────────── */
function SiteMap() {
  const [openBldg, setOpenBldg] = React.useState<string | null>(null)
  const [selUnit, setSelUnit] = React.useState<string | null>(null)

  const ADDISON = new Set(['5079','5059','5055','5047','5043','5039','5031','5027',
    '5077','5057','5049','5041','5037','5029','5025','5021','5017','5005'])
  const pType = (u: string) => ADDISON.has(u) ? 'addison' : 'forge'

  const ROWS = [
    { buildings: [
      { name: 'Building 1', units: ['5079','5075','5071','5067','5063','5059'] },
      { name: 'Building 2', units: ['5055','5051','5047','5043'] },
      { name: 'Building 3', units: ['5039','5035','5031','5027'] },
    ]},
    { buildings: [
      { name: 'Building 4', units: ['5077','5073','5069','5065','5061','5057'] },
      { name: 'Building 5', units: ['5049','5045','5041'] },
      { name: 'Building 6', units: ['5037','5033','5029','5025'] },
      { name: 'Building 7', units: ['5021','5017','5013','5009','5005'] },
    ]},
  ]

  const LEASED = new Set(['5077'])

  const plan = selUnit ? PLANS[pType(selUnit)] : null

  const handleUnit = (u: string) => {
    if (selUnit === u) { setSelUnit(null); return }
    setSelUnit(u)
  }

  const handleBldg = (name: string) => {
    if (openBldg === name) { setOpenBldg(null); setSelUnit(null); return }
    setOpenBldg(name)
    setSelUnit(null)
  }

  return (
    <>
      <div className="sitemap-map" style={{ maxWidth: 900, marginBottom: 32, border: '1px solid #D9D5CF' }}>
        <div style={{ padding: '10px 16px', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', borderBottom: '1px solid #E8E3D8', background: '#EDE9E0' }}>
          Site Plan · 5005 Exposition Drive · Johnstown, CO 80534
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img style={{ width: '100%', display: 'block', verticalAlign: 'bottom' }} src="/images/sitemap.png" alt="The Row Townhomes Site Plan" />
      </div>

      {ROWS.map((row, ri) => (
        <div key={ri} className="bldg-row-wrap" style={{ display: 'flex', gap: 2, marginBottom: ri === 0 ? 8 : 2 }}>
          {row.buildings.map(b => {
            const open = openBldg === b.name
            const aC = b.units.filter(u => pType(u) === 'addison').length
            const fC = b.units.filter(u => pType(u) === 'forge').length
            const meta = [aC ? `${aC} Addison` : '', fC ? `${fC} Forge` : ''].filter(Boolean).join(' · ')
            return (
              <div key={b.name} style={{ background: open ? '#1F1508' : '#EDE9E0', border: '1px solid #D9D5CF', flexShrink: 0 }}>
                <div style={{ padding: '14px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, userSelect: 'none' }} onClick={() => handleBldg(b.name)}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 300, whiteSpace: 'nowrap', color: open ? '#F5F2EC' : '#1F1508' }}>{b.name}</div>
                    <div style={{ fontSize: 8, letterSpacing: '.09em', textTransform: 'uppercase', color: open ? 'rgba(245,242,236,.35)' : '#A89887', marginTop: 2, whiteSpace: 'nowrap' }}>{b.units.length} units · {meta}</div>
                  </div>
                  <span style={{ fontSize: 18, color: open ? '#C9A97A' : '#A89887', transition: 'transform .18s', transform: open ? 'rotate(90deg)' : 'none', flexShrink: 0 }}>›</span>
                </div>
                {open && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, padding: '10px 12px 14px', background: '#1F1508' }}>
                    {b.units.map(u => {
                      const sel = selUnit === u
                      const leased = LEASED.has(u)
                      return (
                        <div key={u} onClick={() => !leased && handleUnit(u)} style={{ width: 60, height: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: leased ? '1.5px solid rgba(255,255,255,.06)' : sel ? '1.5px solid #C9A97A' : '1.5px solid rgba(255,255,255,.12)', cursor: leased ? 'default' : 'pointer', transition: 'all .15s', gap: 1, background: leased ? 'rgba(255,255,255,.04)' : sel ? '#C9A97A' : 'transparent', position: 'relative' }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: leased ? 'rgba(245,242,236,.2)' : sel ? '#1F1508' : '#F5F2EC' }}>{u}</div>
                          <div style={{ fontSize: 7, letterSpacing: '.06em', textTransform: 'uppercase', color: leased ? 'rgba(245,242,236,.15)' : sel ? 'rgba(31,21,8,.55)' : 'rgba(245,242,236,.35)' }}>{pType(u) === 'addison' ? 'Addison' : 'Forge'}</div>
                          {leased && <div style={{ fontSize: 6, letterSpacing: '.08em', textTransform: 'uppercase', color: '#A89887', marginTop: 1 }}>Leased</div>}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}

      <div style={{ background: '#1F1508', color: '#F5F2EC', overflow: 'hidden', maxHeight: selUnit ? 260 : 0, transition: 'max-height .3s ease' }}>
        {plan && selUnit && (
          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 28, alignItems: 'start', padding: '28px 32px' }}>
            <div>
              <div style={{ fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A89887', marginBottom: 5 }}>Floor Plan</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 300, color: '#F5F2EC', lineHeight: 1 }}>{plan.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(245,242,236,.38)', marginTop: 3 }}>Unit {selUnit}</div>
            </div>
            <div>
              <div style={{ fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A89887', marginBottom: 5 }}>Specifications</div>
              <div style={{ display: 'flex', gap: 22, marginTop: 6 }}>
                {[['Beds', plan.beds], ['Baths', plan.baths], ['Garage', plan.garage]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 8, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A89887', marginBottom: 3 }}>{l}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: '#C9A97A', fontWeight: 300 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <ul style={{ listStyle: 'none', marginTop: 4 }}>
              {plan.details.map((d, i) => (
                <li key={i} style={{ fontSize: 10, color: 'rgba(245,242,236,.5)', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,.05)', display: 'flex', gap: 6 }}>
                  <span style={{ color: '#A89887', flexShrink: 0 }}>—</span>{d}
                </li>
              ))}
            </ul>
            <div>
              <div style={{ fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A89887', marginBottom: 5 }}>Starting At</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: '#F5F2EC', fontWeight: 300, lineHeight: 1 }}>$2,795<span style={{ fontSize: 14, color: '#A89887' }}>/mo</span></div>
              <a href="#contact" style={{ display: 'block', background: '#C9A97A', color: '#1F1508', textAlign: 'center', padding: '13px 20px', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', marginTop: 14 }}>Schedule a Tour</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}


/* ─── FLOOR PLANS SECTION ───────────────────────────── */
function FloorPlans() {
  const [active, setActive] = useState<'addison' | 'forge'>('addison')
  const [floorLightbox, setFloorLightbox] = useState<number | null>(null)
  const plan = PLANS[active]

  return (
    <>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #D9D5CF', marginBottom: 48 }}>
        {(['addison', 'forge'] as const).map((p) => (
          <button key={p} onClick={() => setActive(p)} className="floor-tab-btn" style={{
            padding: '14px 36px', fontFamily: "'Playfair Display', serif", fontSize: 20,
            cursor: 'pointer', marginBottom: -1, color: active === p ? '#1F1508' : 'rgba(31,21,8,.3)',
            background: 'none', border: 'none', borderBottom: `2px solid ${active === p ? '#1F1508' : 'transparent'}`,
            transition: 'all .2s',
          }}>{PLANS[p].name}</button>
        ))}
      </div>

      <div className="floor-tab-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A89887', marginBottom: 20 }}>{plan.tag}</div>
          <div style={{ display: 'flex', gap: 32, padding: '20px 0', borderTop: '1px solid #D9D5CF', borderBottom: '1px solid #D9D5CF', marginBottom: 24 }}>
            {[{ val: plan.beds, label: 'Bedrooms' }, { val: plan.baths, label: 'Baths' }, { val: plan.garage + '-Car', label: 'Garage' }].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1F1508', fontWeight: 300 }}>{s.val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#A89887', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#2C3138', lineHeight: 1.75, marginBottom: 24, opacity: .8 }}>{plan.desc}</p>
          <ul style={{ listStyle: 'none', marginBottom: 32 }}>
            {plan.details.map((d, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#2C3138', padding: '7px 0', borderBottom: '1px solid rgba(217,213,207,.5)' }}>
                <span style={{ width: 1, height: 14, background: '#A89887', flexShrink: 0, marginTop: 3 }} />{d}
              </li>
            ))}
          </ul>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A89887', marginBottom: 6 }}>Starting At</div>
            <div className="floor-price" style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: '#1F1508', fontWeight: 300 }}>$2,795<span style={{ fontSize: 18, color: '#A89887' }}>/mo</span></div>
          </div>
          <a href="#contact" style={{ display: 'inline-block', border: '1px solid #1F1508', color: '#1F1508', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1F1508'; e.currentTarget.style.color = '#F5F2EC'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1F1508'; }}
          >Request a Tour</a>
        </div>

        <div className="floor-images" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {plan.floors.map((f, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <button onClick={() => setFloorLightbox(i)} style={{ width: '100%', aspectRatio: '3/4', background: 'rgba(217,213,207,.4)', border: '1px solid #D9D5CF', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'block', padding: 0 }}>
                <Image src={f.img} alt={f.label} fill className="object-contain" style={{ padding: 8 }} sizes="(max-width: 768px) 33vw, 20vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(31,21,8,0)', transition: 'background .3s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(31,21,8,.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(31,21,8,0)')}
                />
              </button>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#A89887', marginTop: 8 }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {floorLightbox !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(31,21,8,.97)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setFloorLightbox(null)}>
          <button style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 32, cursor: 'pointer' }} onClick={() => setFloorLightbox(null)}>×</button>
          <button style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 52, cursor: 'pointer' }} onClick={e => { e.stopPropagation(); setFloorLightbox(p => (p! - 1 + 3) % 3) }}>‹</button>
          <div className="floor-lightbox-img" style={{ position: 'relative', width: '60vw', maxWidth: 600, height: '80vh', background: 'white' }} onClick={e => e.stopPropagation()}>
            <Image src={plan.floors[floorLightbox].img} alt={plan.floors[floorLightbox].label} fill className="object-contain" style={{ padding: 24 }} sizes="60vw" priority />
          </div>
          <button style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 52, cursor: 'pointer' }} onClick={e => { e.stopPropagation(); setFloorLightbox(p => (p! + 1) % 3) }}>›</button>
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(245,242,236,.4)' }}>{plan.name} · {plan.floors[floorLightbox].label}</span>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── PAGE ──────────────────────────────────────────── */
export default function Home() {
  useReveal()
  const [menuOpen, setMenuOpen] = useState(false)

  const S = {
    wrap: { maxWidth: 1280, margin: '0 auto', padding: '0 40px' } as React.CSSProperties,
    eyebrow: { fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: '#A89887', marginBottom: 16 } as React.CSSProperties,
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F5F2EC; color: #1F1508; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-d1 { transition-delay: .1s; }
        .reveal-d2 { transition-delay: .2s; }
        .reveal-d3 { transition-delay: .3s; }
        .reveal-d4 { transition-delay: .4s; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .mobile-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .mobile-full { flex-basis: 260px !important; }

          /* NAV */
          .nav-wrap { padding: 0 20px !important; height: 58px !important; }

          /* HERO */
          .hero-content { padding: 0 20px 52px !important; }

          /* STATS — 2 col */
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-cell { padding: 24px 16px !important; border-bottom: 1px solid rgba(255,255,255,.06); }

          /* SECTION WRAPPERS */
          .section-pad { padding: 60px 0 !important; }
          .section-inner { padding: 0 20px !important; }

          /* FEATURES — 2 col */
          .features-grid { grid-template-columns: 1fr !important; gap: 1px !important; }

          /* PHOTO STRIP */
          .photo-strip { padding: 0 16px !important; }

          /* SITE MAP — full width */
          .sitemap-map { max-width: 100% !important; }

          /* BUILDING ROWS — wrap */
          .bldg-row-wrap { flex-wrap: wrap !important; }

          /* DETAIL PANEL — 2 col */
          .detail-grid { grid-template-columns: 1fr 1fr !important; gap: 20px !important; padding: 20px !important; }

          /* FLOOR PLANS */
          .floor-tab-content { grid-template-columns: 1fr !important; gap: 28px !important; }
          .floor-images { grid-template-columns: repeat(3, 1fr) !important; }
          .floor-tab-btn { padding: 10px 20px !important; font-size: 16px !important; }
          .floor-price { font-size: 36px !important; }
          .floor-lightbox-img { width: 92vw !important; height: 70vh !important; }

          /* LOCATION MAP */
          .location-map { height: 260px !important; }

          /* CONTACT TOUR BOX */
          .contact-tour-box { padding: 32px 24px !important; min-height: auto !important; }
        }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #1F1508; }
        ::-webkit-scrollbar-thumb { background: #A89887; }
        * { scrollbar-width: thin; scrollbar-color: #A89887 #1F1508; }
      `}</style>

      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ── HERO ── */}
      <section style={{ height: '88vh', minHeight: 600, position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/exterior-street-2.jpg" alt="The Row Townhomes" fill className="object-cover" priority sizes="100vw" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(31,21,8,.55) 0%, rgba(31,21,8,.5) 50%, rgba(31,21,8,.75) 100%)' }} />
        </div>
        {/* Architectural line overlay */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50%', right: '5%', width: '40%', height: '200%', borderLeft: '1px solid rgba(201,169,122,.08)', borderRight: '1px solid rgba(201,169,122,.08)', transform: 'rotate(-8deg)' }} />
        </div>

        <div style={{ ...S.wrap, position: 'relative', zIndex: 2, width: '100%', paddingTop: 64 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <div style={{ width: 40, height: 1, background: '#C9A97A' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#C9A97A' }}>Johnstown, CO · Now Leasing</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: 'clamp(44px, 6.5vw, 88px)', lineHeight: 1.02, color: '#F5F2EC', letterSpacing: '-.02em', marginBottom: 28 }}>
              Luxury Townhomes<br />for Lease<br /><em style={{ fontStyle: 'italic', color: '#C9A97A' }}>At 2534.</em>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(245,242,236,.65)', lineHeight: 1.75, maxWidth: 480, marginBottom: 40 }}>
              32 residences at 5005 Exposition Drive. Three bedrooms, private fenced yards, oversized garages — designed without compromise.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#contact" style={{ background: '#C9A97A', color: '#1F1508', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '16px 36px', textDecoration: 'none', fontWeight: 600, transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F5F2EC')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C9A97A')}
              >Schedule a Tour</a>
              <a href="#features" style={{ border: '1px solid rgba(245,242,236,.3)', color: '#F5F2EC', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '16px 36px', textDecoration: 'none', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,242,236,.7)'; e.currentTarget.style.background = 'rgba(255,255,255,.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,242,236,.3)'; e.currentTarget.style.background = 'transparent'; }}
              >Explore the Residences</a>
            </div>
          </div>
        </div>

        <div className="hide-mobile" style={{ position: 'absolute', right: 40, bottom: 40, textAlign: 'right' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A89887' }}>Starting At</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, color: '#F5F2EC', fontWeight: 300, lineHeight: 1 }}>$2,795<span style={{ fontSize: 18, color: '#A89887' }}>/mo</span></div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: '#1F1508', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ ...S.wrap }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid rgba(255,255,255,.06)' }} className="mobile-col stats-grid">
            {[{ num: '32', label: 'Residences' }, { num: '3', label: 'Bedrooms' }, { num: '2–3', label: 'Car Garages' }, { num: '$2,795', label: 'Starting / Mo' }].map(s => (
              <div key={s.label} style={{ padding: '32px 0 32px 36px', borderRight: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: '#C9A97A', fontWeight: 300 }}>{s.num}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(245,242,236,.35)', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: '#F5F2EC', padding: '90px 0' }}>
        <div style={S.wrap}>
          <div className="reveal">
            <div style={S.eyebrow}>What Is Included</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#1F1508', marginBottom: 12, lineHeight: 1.1 }}>Features That Define<br />Modern Living.</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#2C3138', lineHeight: 1.7, maxWidth: 500, opacity: .65, marginBottom: 52 }}>Every surface considered. Every material selected. The baseline here is what others call an upgrade.</p>
          </div>
          <div className="reveal reveal-d1 features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#D9D5CF' }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: '#F5F2EC', padding: '32px 26px', transition: 'background .3s, transform .25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = '#1F1508'; el.style.transform = 'translateY(-2px)'; el.querySelectorAll('[data-title]').forEach(t => (t as HTMLElement).style.color = '#F5F2EC'); el.querySelectorAll('[data-desc]').forEach(t => (t as HTMLElement).style.color = 'rgba(245,242,236,.5)'); el.querySelectorAll('[data-rule]').forEach(t => (t as HTMLElement).style.background = '#C9A97A'); el.querySelectorAll('[data-rule]').forEach(t => (t as HTMLElement).style.width = '36px'); }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = '#F5F2EC'; el.style.transform = 'translateY(0)'; el.querySelectorAll('[data-title]').forEach(t => (t as HTMLElement).style.color = '#1F1508'); el.querySelectorAll('[data-desc]').forEach(t => (t as HTMLElement).style.color = '#2C3138'); el.querySelectorAll('[data-rule]').forEach(t => (t as HTMLElement).style.background = '#A89887'); el.querySelectorAll('[data-rule]').forEach(t => (t as HTMLElement).style.width = '24px'); }}
              >
                <div data-rule style={{ width: 24, height: 1, background: '#A89887', marginBottom: 20, transition: 'all .3s' }} />
                <div data-title style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#1F1508', marginBottom: 10, fontWeight: 400, transition: 'color .3s' }}>{f.title}</div>
                <div data-desc style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#2C3138', lineHeight: 1.65, opacity: .65, transition: 'color .3s' }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 40, textAlign: 'center' }}>
            <a href="#contact" style={{ display: 'inline-block', background: '#1F1508', color: '#F5F2EC', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '15px 36px', textDecoration: 'none', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2C3138')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1F1508')}
            >Schedule a Tour</a>
          </div>
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section id="photos" style={{ background: '#1F1508', padding: '80px 0' }}>
        <div style={{ ...S.wrap, marginBottom: 36 }} className="reveal">
          <div style={{ ...S.eyebrow, color: '#A89887' }}>Inside the Residence</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#F5F2EC', marginBottom: 10, lineHeight: 1.1 }}>Drag to explore.</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,242,236,.45)', lineHeight: 1.7, maxWidth: 480 }}>White oak floors. Honed stone. A layout organized around light and separation of space. Click any photo to expand.</p>
        </div>
        <div className="reveal reveal-d1">
          <PhotoStrip />
        </div>
        <p style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(245,242,236,.18)', marginTop: 20 }}>← Drag to browse · Click to expand →</p>
      </section>

      {/* ── SITE MAP ── */}
      <section id="sitemap" style={{ background: '#F5F2EC', padding: '90px 0' }}>
        <div style={S.wrap}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div style={S.eyebrow}>Site Map</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#1F1508', marginBottom: 12, lineHeight: 1.1 }}>32 Residences.<br />Select a unit.</h2>
          </div>
          <div className="reveal reveal-d1">
            <SiteMap />
          </div>
        </div>
      </section>

      {/* ── FLOOR PLANS ── */}
      <section id="floor-plans" style={{ background: '#EDEBE3', padding: '90px 0' }}>
        <div style={S.wrap}>
          <div className="reveal" style={{ marginBottom: 0 }}>
            <div style={S.eyebrow}>Floor Plans</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#1F1508', marginBottom: 12, lineHeight: 1.1 }}>Two plans. One standard.</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#2C3138', lineHeight: 1.7, maxWidth: 520, opacity: .65, marginBottom: 48 }}>The Addison adds a private office on the entry level. The Forge trades it for a third garage bay. Both deliver the same finish level throughout.</p>
          </div>
          <div className="reveal reveal-d1">
            <FloorPlans />
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" style={{ background: '#1F1508', padding: '90px 0' }}>
        <div style={{ ...S.wrap }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="mobile-col">
            <div className="reveal">
              <div style={{ ...S.eyebrow, color: '#A89887' }}>Location</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 300, color: '#F5F2EC', marginBottom: 16, lineHeight: 1.1 }}>5005 Exposition Dr,<br />At 2534.</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,242,236,.5)', lineHeight: 1.75, marginBottom: 32 }}>Positioned in the 2534 corridor — walkable to shopping, dining, and everyday essentials, with quick access to I-25 and everything Northern Colorado has to offer.</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Address', '5005 Exposition Dr, Johnstown, CO 80534'], ['Fort Collins', '~20 min north via I-25'], ['Greeley', '~30 min east'], ['Denver', '~1 hr south']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 24 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', width: 100, flexShrink: 0, paddingTop: 1 }}>{k}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,242,236,.55)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1 location-map" style={{ height: 420, overflow: 'hidden' }}>
              <iframe
                title="The Row at 2534 location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.2!2d-104.9089!3d40.3368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876ea2b3e1234567%3A0x0!2s5005+Exposition+Dr%2C+Johnstown%2C+CO+80534!5e0!3m2!1sen!2sus!4v1718000000000"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: '#F5F2EC', padding: '90px 0' }}>
        <div style={S.wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="mobile-col">
            <div className="reveal">
              <div style={S.eyebrow}>Private Tours</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 300, color: '#1F1508', marginBottom: 16, lineHeight: 1.1 }}>Now leasing.<br />Tours by appointment.</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#2C3138', lineHeight: 1.75, maxWidth: 360, marginBottom: 36, opacity: .7 }}>Units are available now. Fill out the form and we will follow up directly with availability, pricing, and scheduling.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid #D9D5CF', paddingTop: 28 }}>
                {[['Email', 'hello@row2534.com'], ['Address', '5005 Exposition Dr\nJohnstown, CO 80534']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 24 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', width: 72, flexShrink: 0, paddingTop: 1 }}>{k}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#2C3138', opacity: .7, whiteSpace: 'pre-line' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1" style={{ background: '#1F1508', padding: 44 }}>
              <ContactFormInline />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#1F1508', borderTop: '1px solid rgba(255,255,255,.05)', padding: '36px 0' }}>
        <div style={{ ...S.wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#F5F2EC' }}>The Row <span style={{ color: '#A89887', fontWeight: 300 }}>at 2534</span></div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,242,236,.3)', marginTop: 3 }}>Johnstown, CO 80534</div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[['#features','Features'],['#photos','Photos'],['#sitemap','Site Map'],['#floor-plans','Floor Plans'],['#location','Location'],['#contact','Contact']].map(([href, label]) => (
              <a key={href} href={href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(245,242,236,.3)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,242,236,.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,242,236,.3)')}
              >{label}</a>
            ))}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,242,236,.2)' }}>© {new Date().getFullYear()} The Row at 2534</div>
        </div>
      </footer>
    </>
  )
}

/* ─── INLINE CONTACT FORM ───────────────────────────── */
function ContactFormInline() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    tourDate: '', tourTime: '', tourType: 'In Person',
    moveIn: '', currentCity: '', housing: '',
    occupants: '', pets: '', petType: [] as string[], petCount: '',
    floorPlan: '', garage: '', source: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm(p => ({
        ...p,
        petType: checked ? [...p.petType, value] : p.petType.filter(v => v !== value)
      }))
    } else {
      setForm(p => ({ ...p, [name]: value }))
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        unit: form.floorPlan,
        timeline: form.moveIn,
        message: [
          form.message,
          `Tour Date: ${form.tourDate} at ${form.tourTime}`,
          `Tour Type: ${form.tourType}`,
          `Current City: ${form.currentCity}`,
          `Housing: ${form.housing}`,
          `Occupants: ${form.occupants}`,
          `Pets: ${form.pets}${form.petType.length ? ` (${form.petType.join(', ')})` : ''}${form.petCount ? ` x${form.petCount}` : ''}`,
          `Garage: ${form.garage}`,
          `Heard Via: ${form.source}`,
        ].filter(Boolean).join(' | ')
      }
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); setStatus('error'); return }
      setStatus('success')
    } catch { setError('Network error. Please try again.'); setStatus('error') }
  }

  const iS: React.CSSProperties = { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,.15)', padding: '10px 0', color: '#F5F2EC', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none', transition: 'border-color .2s' }
  const lS: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', display: 'block', marginBottom: 8 }
  const sL: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#A89887', display: 'block', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,.08)' }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderBottomColor = '#C9A97A')
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.15)')
  const g2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }
  const rS: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,242,236,.7)', cursor: 'pointer' }

  if (status === 'success') return (
    <div style={{ padding: '48px 0', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#A89887', marginBottom: 16 }}>Request Received</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: '#F5F2EC', fontWeight: 300, marginBottom: 14 }}>Thank you.</div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,242,236,.5)', lineHeight: 1.7, maxWidth: 320, margin: '0 auto' }}>Your tour request is in. A member of the leasing team will confirm your appointment by email shortly.</p>
    </div>
  )

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Contact */}
      <div>
        <span style={sL}>Contact Information</span>
        <div style={g2}>
          <div><label style={lS}>First Name *</label><input name="firstName" value={form.firstName} onChange={handle} required onFocus={focus} onBlur={blur} style={iS} /></div>
          <div><label style={lS}>Last Name *</label><input name="lastName" value={form.lastName} onChange={handle} required onFocus={focus} onBlur={blur} style={iS} /></div>
          <div><label style={lS}>Email *</label><input name="email" type="email" value={form.email} onChange={handle} required onFocus={focus} onBlur={blur} style={iS} placeholder="you@email.com" /></div>
          <div><label style={lS}>Mobile Phone *</label><input name="phone" type="tel" value={form.phone} onChange={handle} required onFocus={focus} onBlur={blur} style={iS} placeholder="(970) 000-0000" /></div>
        </div>
      </div>

      {/* Tour Preferences */}
      <div>
        <span style={sL}>Tour Preferences</span>
        <div style={{ ...g2, marginBottom: 20 }}>
          <div><label style={lS}>Preferred Tour Date *</label><input name="tourDate" type="date" value={form.tourDate} onChange={handle} required onFocus={focus} onBlur={blur} style={{ ...iS, colorScheme: 'dark' }} /></div>
          <div>
            <label style={lS}>Preferred Tour Time *</label>
            <select name="tourTime" value={form.tourTime} onChange={handle} required onFocus={focus} onBlur={blur} style={{ ...iS, cursor: 'pointer' }}>
              <option value="" disabled>Select time</option>
              {['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <label style={lS}>Tour Type</label>
        <div style={{ display: 'flex', gap: 24 }}>
          {['In Person', 'Virtual Tour'].map(t => (
            <label key={t} style={rS}>
              <input type="radio" name="tourType" value={t} checked={form.tourType === t} onChange={handle} style={{ accentColor: '#C9A97A' }} />
              {t}
            </label>
          ))}
        </div>
      </div>

      {/* Move-In */}
      <div>
        <span style={sL}>Move-In Information</span>
        <div style={{ ...g2, marginBottom: 20 }}>
          <div><label style={lS}>Desired Move-In Date *</label><input name="moveIn" type="date" value={form.moveIn} onChange={handle} required onFocus={focus} onBlur={blur} style={{ ...iS, colorScheme: 'dark' }} /></div>
          <div><label style={lS}>Current City</label><input name="currentCity" value={form.currentCity} onChange={handle} onFocus={focus} onBlur={blur} style={iS} /></div>
        </div>
        <label style={lS}>Current Housing Situation</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
          {['Apartment', 'House Rental', 'Own Home', 'Relocating'].map(h => (
            <label key={h} style={rS}>
              <input type="radio" name="housing" value={h} checked={form.housing === h} onChange={handle} style={{ accentColor: '#C9A97A' }} />
              {h}
            </label>
          ))}
        </div>
      </div>

      {/* Household */}
      <div>
        <span style={sL}>Household Information</span>
        <div style={{ ...g2, marginBottom: form.pets === 'Yes' ? 20 : 0 }}>
          <div><label style={lS}>Number of Occupants</label><input name="occupants" type="number" min="1" max="12" value={form.occupants} onChange={handle} onFocus={focus} onBlur={blur} style={iS} /></div>
          <div>
            <label style={lS}>Pets?</label>
            <div style={{ display: 'flex', gap: 24, paddingTop: 10 }}>
              {['Yes', 'No'].map(p => (
                <label key={p} style={rS}>
                  <input type="radio" name="pets" value={p} checked={form.pets === p} onChange={handle} style={{ accentColor: '#C9A97A' }} />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>
        {form.pets === 'Yes' && (
          <div style={g2}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={lS}>Pet Type</label>
              <div style={{ display: 'flex', gap: 24 }}>
                {['Dog', 'Cat', 'Other'].map(p => (
                  <label key={p} style={rS}>
                    <input type="checkbox" name="petType" value={p} checked={form.petType.includes(p)} onChange={handle} style={{ accentColor: '#C9A97A' }} />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div><label style={lS}>Number of Pets</label><input name="petCount" type="number" min="1" max="10" value={form.petCount} onChange={handle} onFocus={focus} onBlur={blur} style={iS} /></div>
          </div>
        )}
      </div>

      {/* Floor Plan */}
      <div>
        <span style={sL}>Floor Plan Interest</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { val: 'Addison', name: 'The Addison', sub: '3 Bed + Office · 4 Bath · 2-Car Garage' },
            { val: 'Forge',   name: 'The Forge',   sub: '3 Bed · 3 Bath · 3-Car Garage' },
            { val: 'Not Sure', name: 'Not Sure Yet', sub: 'Help me decide' },
          ].map(p => (
            <label key={p.val} style={{ ...rS, alignItems: 'flex-start' }}>
              <input type="radio" name="floorPlan" value={p.val} checked={form.floorPlan === p.val} onChange={handle} style={{ accentColor: '#C9A97A', marginTop: 3 }} />
              <span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#F5F2EC', display: 'block', lineHeight: 1.3 }}>{p.name}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#A89887', display: 'block' }}>{p.sub}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Garage */}
      <div>
        <span style={sL}>Garage Preference</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
          {['2-Car Garage', '3-Car Garage', 'No Preference'].map(g => (
            <label key={g} style={rS}>
              <input type="radio" name="garage" value={g} checked={form.garage === g} onChange={handle} style={{ accentColor: '#C9A97A' }} />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* How did you hear */}
      <div>
        <span style={sL}>How Did You Hear About Us?</span>
        <select name="source" value={form.source} onChange={handle} onFocus={focus} onBlur={blur} style={{ ...iS, cursor: 'pointer' }}>
          <option value="">Select one</option>
          {['Zillow','Apartments.com','Google','Instagram','Facebook','Referral','Drive By','Realtor','Other'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={lS}>Additional Notes</label>
        <textarea name="message" value={form.message} onChange={handle} rows={3} placeholder="Anything you'd like us to know." onFocus={focus} onBlur={blur} style={{ ...iS, resize: 'none' }} />
      </div>

      {error && <p style={{ color: '#e07070', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{error}</p>}

      <div>
        <button type="submit" disabled={status === 'sending'} style={{ background: '#C9A97A', color: '#1F1508', border: 'none', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '16px 32px', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? .6 : 1, fontWeight: 600, transition: 'background .2s', width: '100%' }}
          onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = '#F5F2EC' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#C9A97A' }}
        >{status === 'sending' ? 'Sending…' : 'Request Tour'}</button>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,242,236,.2)', textAlign: 'center', letterSpacing: '.04em', marginTop: 12 }}>Private tours by appointment. We’ll confirm by email.</p>
      </div>

    </form>
  )
}