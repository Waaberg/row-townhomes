'use client'

import { useState, useEffect, useRef } from 'react'
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
  { title: 'Considered Throughout',      desc: 'From the entry threshold to the primary bath — every material, every finish, every detail was a decision.' },
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
    tag: '3 Bed + Office · 4 Bath · 2-Car Garage',
    beds: '3+', baths: '4', garage: '2',
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
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
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

        <a href="/schedule-a-tour.html" className="hide-mobile" style={{
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
          <a href="/schedule-a-tour.html" style={{ border: '1px solid rgba(201,169,122,.5)', color: '#C9A97A', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '12px', textDecoration: 'none', textAlign: 'center' }}>Schedule a Tour</a>
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
      <div ref={stripRef} style={{ display: 'flex', gap: 3, overflowX: 'auto', padding: '0 40px', scrollbarWidth: 'none', cursor: 'grab', userSelect: 'none' }}>
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
  const [selected, setSelected] = useState<{ plan: 'addison' | 'forge'; unit: string } | null>(null)
  const [floorLightbox, setFloorLightbox] = useState<number | null>(null)
  const plan = selected ? PLANS[selected.plan] : null

  const A_COLOR = '#C9A97A'
  const F_COLOR = '#7A6852'
  const A_LIGHT = 'rgba(201,169,122,.18)'
  const F_LIGHT = 'rgba(122,104,82,.18)'

  // Render a single unit rectangle in SVG
  const Unit = ({ x, y, w, h, unit, rotate = 0 }: { x: number; y: number; w: number; h: number; unit: { num: string; plan: 'addison' | 'forge' }; rotate?: number }) => {
    const isSelected = selected?.unit === unit.num
    const color = unit.plan === 'addison' ? A_COLOR : F_COLOR
    const fill = isSelected ? color : (unit.plan === 'addison' ? A_LIGHT : F_LIGHT)
    const stroke = isSelected ? color : (unit.plan === 'addison' ? 'rgba(201,169,122,.5)' : 'rgba(122,104,82,.5)')
    const cx = x + w / 2
    const cy = y + h / 2
    const transform = rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined

    return (
      <g transform={transform} style={{ cursor: 'pointer' }} onClick={() => setSelected({ plan: unit.plan, unit: unit.num })}>
        <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={isSelected ? 1.5 : 1} rx={1}
          style={{ transition: 'all .2s' }}
        />
        {/* Garage indicator bar */}
        <rect x={x} y={y + h - 6} width={w} height={6} fill={color} opacity={isSelected ? .9 : .35} rx={1} />
        <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 7, fill: isSelected ? '#1F1508' : '#7A6852', fontWeight: isSelected ? '600' : '400', pointerEvents: 'none', userSelect: 'none' }}
        >{unit.num}</text>
      </g>
    )
  }

  // Building label
  const BLabel = ({ x, y, label }: { x: number; y: number; label: string }) => (
    <text x={x} y={y} textAnchor="middle"
      style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, fill: 'rgba(31,21,8,.35)', letterSpacing: '.12em', textTransform: 'uppercase', pointerEvents: 'none' }}
    >{label}</text>
  )

  // Road label
  const Road = ({ x, y, label, rotate = 0 }: { x: number; y: number; label: string; rotate?: number }) => (
    <text x={x} y={y} textAnchor="middle" transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fill: 'rgba(31,21,8,.4)', letterSpacing: '.14em', textTransform: 'uppercase', pointerEvents: 'none' }}
    >{label}</text>
  )

  const UW = 36  // unit width
  const UH = 48  // unit height
  const GAP = 4  // gap between units

  // Building helper: renders a row of units left-to-right
  const buildRow = (units: typeof BUILDINGS[0]['units'], startX: number, startY: number) =>
    units.map((u, i) => <Unit key={u.num} x={startX + i * (UW + GAP)} y={startY} w={UW} h={UH} unit={u} />)

  const buildCol = (units: typeof BUILDINGS[0]['units'], startX: number, startY: number) =>
    units.map((u, i) => <Unit key={u.num} x={startX} y={startY + i * (UH + GAP)} w={UW} h={UH} unit={u} />)

  // SVG viewBox layout
  // Left side: Buildings 4, 5, 6 (stacked vertically, facing right)
  // Right side: Buildings 1, 2, 3 (stacked vertically, facing left)
  // Bottom: Building 7 (diagonal — we'll approximate as rotated)
  // Road on left: Exposition Drive
  // Road on bottom: Thompson Parkway
  // Center: internal drive

  const B1 = BUILDINGS[0].units  // right top
  const B2 = BUILDINGS[1].units  // right mid
  const B3 = BUILDINGS[2].units  // right bottom
  const B4 = BUILDINGS[3].units  // left top
  const B5 = BUILDINGS[4].units  // left mid
  const B6 = BUILDINGS[5].units  // left bottom
  const B7 = BUILDINGS[6].units  // bottom diagonal

  // Layout coordinates
  const rightX = 320  // right column x
  const leftX = 60    // left column x
  const ctrX = 230    // center drive x

  const row1Y = 30    // top row
  const row2Y = 140   // mid row
  const row3Y = 230   // bottom row
  const driveY = 320  // main internal drive y
  const b7Y = 360     // building 7 y

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>

        {/* SVG Map */}
        <div style={{ background: '#F0EBE2', border: '1px solid #D9D5CF', padding: '20px 16px', overflowX: 'auto' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A89887', textAlign: 'center', marginBottom: 12 }}>
            5005 Exposition Drive — Johnstown, CO · Select a unit
          </div>

          <svg viewBox="0 0 620 520" style={{ width: '100%', maxWidth: 620, display: 'block', margin: '0 auto' }}>

            {/* Background */}
            <rect width={620} height={520} fill="#F0EBE2" />

            {/* Green areas */}
            <rect x={0} y={0} width={40} height={440} fill="#d8e8c8" opacity={.4} />
            <rect x={0} y={440} width={620} height={80} fill="#d8e8c8" opacity={.3} />

            {/* Exposition Drive — left */}
            <rect x={0} y={0} width={52} height={440} fill="#DDD8CF" />
            <Road x={26} y={220} label="EXPOSITION DRIVE" rotate={-90} />

            {/* Thompson Parkway — bottom */}
            <rect x={0} y={460} width={620} height={60} fill="#DDD8CF" />
            <Road x={340} y={490} label="THOMPSON PARKWAY" />

            {/* Internal drives */}
            <rect x={52} y={100} width={560} height={18} fill="#E8E2D8" />
            <Road x={310} y={112} label="INTERNAL DRIVE" />
            <rect x={52} y={200} width={380} height={16} fill="#E8E2D8" />
            <rect x={52} y={295} width={380} height={16} fill="#E8E2D8" />
            {/* Curved drive to B7 */}
            <path d="M 432 311 Q 432 400 350 430 L 240 455" stroke="#DDD8CF" strokeWidth={40} fill="none" />
            <path d="M 432 311 Q 432 400 350 430 L 240 455" stroke="#E8E2D8" strokeWidth={36} fill="none" />

            {/* ── BUILDING 1 (right, top) ── 6 units in a column */}
            <rect x={430} y={22} width={UW * 6 + GAP * 5 + 8} height={UH + 24} fill="#E8E2D8" opacity={.5} rx={2} />
            {B1.map((u, i) => <Unit key={u.num} x={434 + i * (UW + GAP)} y={30} w={UW} h={UH} unit={u} />)}
            <BLabel x={556} y={90} label="BLDG 1" />

            {/* ── BUILDING 4 (left, top) ── 6 units in a column */}
            <rect x={56} y={22} width={UW * 6 + GAP * 5 + 8} height={UH + 24} fill="#E8E2D8" opacity={.5} rx={2} />
            {B4.map((u, i) => <Unit key={u.num} x={60 + i * (UW + GAP)} y={30} w={UW} h={UH} unit={u} />)}
            <BLabel x={180} y={90} label="BLDG 4" />

            {/* ── BUILDING 2 (right, mid) ── 4 units */}
            <rect x={430} y={122} width={UW * 4 + GAP * 3 + 8} height={UH + 24} fill="#E8E2D8" opacity={.5} rx={2} />
            {B2.map((u, i) => <Unit key={u.num} x={434 + i * (UW + GAP)} y={130} w={UW} h={UH} unit={u} />)}
            <BLabel x={534} y={190} label="BLDG 2" />

            {/* ── BUILDING 5 (left, mid) ── 3 units */}
            <rect x={56} y={122} width={UW * 3 + GAP * 2 + 8} height={UH + 24} fill="#E8E2D8" opacity={.5} rx={2} />
            {B5.map((u, i) => <Unit key={u.num} x={60 + i * (UW + GAP)} y={130} w={UW} h={UH} unit={u} />)}
            <BLabel x={140} y={190} label="BLDG 5" />

            {/* Dog park + amenities center */}
            <rect x={230} y={122} width={100} height={70} fill="#b8d4a0" opacity={.5} rx={4} />
            <text x={280} y={153} textAnchor="middle" style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, fill: '#4a7a3a', letterSpacing: '.1em' }}>DOG</text>
            <text x={280} y={165} textAnchor="middle" style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, fill: '#4a7a3a', letterSpacing: '.1em' }}>PARK</text>

            {/* ── BUILDING 3 (right, bottom) ── 4 units */}
            <rect x={430} y={217} width={UW * 4 + GAP * 3 + 8} height={UH + 24} fill="#E8E2D8" opacity={.5} rx={2} />
            {B3.map((u, i) => <Unit key={u.num} x={434 + i * (UW + GAP)} y={225} w={UW} h={UH} unit={u} />)}
            <BLabel x={534} y={285} label="BLDG 3" />

            {/* ── BUILDING 6 (left, bottom) ── 4 units */}
            <rect x={56} y={217} width={UW * 4 + GAP * 3 + 8} height={UH + 24} fill="#E8E2D8" opacity={.5} rx={2} />
            {B6.map((u, i) => <Unit key={u.num} x={60 + i * (UW + GAP)} y={225} w={UW} h={UH} unit={u} />)}
            <BLabel x={180} y={285} label="BLDG 6" />

            {/* ── BUILDING 7 (bottom, angled) ── 6 units in 2 rows of 3 */}
            <g transform="rotate(-18 300 410)">
              <rect x={220} y={335} width={UW * 3 + GAP * 2 + 8} height={UH * 2 + GAP + 24} fill="#E8E2D8" opacity={.5} rx={2} />
              {B7.slice(0,3).map((u, i) => <Unit key={u.num} x={224 + i * (UW + GAP)} y={343} w={UW} h={UH} unit={u} />)}
              {B7.slice(3,6).map((u, i) => <Unit key={u.num} x={224 + i * (UW + GAP)} y={343 + UH + GAP} w={UW} h={UH} unit={u} />)}
              <BLabel x={296} y={440} label="BLDG 7" />
            </g>

            {/* Legend */}
            <g transform="translate(56, 312)">
              <rect x={0} y={0} width={10} height={10} fill={A_LIGHT} stroke={A_COLOR} strokeWidth={1} rx={1} />
              <text x={14} y={8} style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, fill: '#7A6852', letterSpacing: '.08em' }}>ADDISON</text>
              <rect x={80} y={0} width={10} height={10} fill={F_LIGHT} stroke={F_COLOR} strokeWidth={1} rx={1} />
              <text x={94} y={8} style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, fill: '#7A6852', letterSpacing: '.08em' }}>FORGE</text>
            </g>

          </svg>
        </div>

        {/* Info panel */}
        <div style={{ background: '#1F1508', padding: 36, minHeight: 440, display: 'flex', flexDirection: 'column', position: 'sticky', top: 80 }}>
          {!selected ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, textAlign: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, border: '1px solid rgba(168,152,135,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <div style={{ width: 14, height: 14, border: '1px solid rgba(201,169,122,.4)' }} />
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,242,236,.3)', lineHeight: 1.7, letterSpacing: '.04em', maxWidth: 220 }}>
                Select a unit on the site map to view its floor plan and details.
              </p>
            </div>
          ) : plan && (
            <>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: '#F5F2EC', fontWeight: 300, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', marginBottom: 24 }}>Unit {selected.unit}</div>

              <div style={{ display: 'flex', gap: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 20 }}>
                {[{ val: plan.beds, label: 'Beds' }, { val: plan.baths, label: 'Baths' }, { val: plan.garage + '-Car', label: 'Garage' }].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#C9A97A', fontWeight: 300 }}>{s.val}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(245,242,236,.4)', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <ul style={{ listStyle: 'none', marginBottom: 20, flex: 1 }}>
                {plan.details.map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,242,236,.55)', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.05)', lineHeight: 1.5 }}>
                    <span style={{ color: '#A89887', flexShrink: 0 }}>—</span>{d}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 20 }}>
                {plan.floors.map((f, i) => (
                  <button key={i} onClick={() => setFloorLightbox(i)} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', cursor: 'pointer', padding: 0, position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                    <Image src={f.img} alt={f.label} fill className="object-contain" sizes="100px" style={{ padding: 4 }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(31,21,8,.7)', padding: '3px 0', textAlign: 'center' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,242,236,.5)' }}>{f.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', marginBottom: 4 }}>Starting At</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: '#F5F2EC', fontWeight: 300 }}>$2,795<span style={{ fontSize: 14, color: '#A89887' }}>/mo</span></div>
              </div>

              <a href="/schedule-a-tour.html" style={{ display: 'block', textAlign: 'center', background: '#C9A97A', color: '#1F1508', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: 14, textDecoration: 'none', fontWeight: 600, transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F5F2EC')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C9A97A')}
              >Schedule a Tour</a>
            </>
          )}
        </div>
      </div>

      {floorLightbox !== null && plan && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(31,21,8,.97)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setFloorLightbox(null)}>
          <button style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 32, cursor: 'pointer' }} onClick={() => setFloorLightbox(null)}>×</button>
          <button style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(245,242,236,.5)', fontSize: 52, cursor: 'pointer' }} onClick={e => { e.stopPropagation(); setFloorLightbox(p => (p! - 1 + 3) % 3) }}>‹</button>
          <div style={{ position: 'relative', width: '60vw', maxWidth: 600, height: '80vh', background: 'white' }} onClick={e => e.stopPropagation()}>
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

/* ─── FLOOR PLANS SECTION ───────────────────────────── */
function FloorPlans() {
  const [active, setActive] = useState<'addison' | 'forge'>('addison')
  const [floorLightbox, setFloorLightbox] = useState<number | null>(null)
  const plan = PLANS[active]

  return (
    <>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #D9D5CF', marginBottom: 48 }}>
        {(['addison', 'forge'] as const).map((p) => (
          <button key={p} onClick={() => setActive(p)} style={{
            padding: '14px 36px', fontFamily: "'Playfair Display', serif", fontSize: 20,
            cursor: 'pointer', marginBottom: -1, color: active === p ? '#1F1508' : 'rgba(31,21,8,.3)',
            background: 'none', border: 'none', borderBottom: `2px solid ${active === p ? '#1F1508' : 'transparent'}`,
            transition: 'all .2s',
          }}>{PLANS[p].name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
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
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: '#1F1508', fontWeight: 300 }}>$2,795<span style={{ fontSize: 18, color: '#A89887' }}>/mo</span></div>
          </div>
          <a href="/schedule-a-tour.html" style={{ display: 'inline-block', border: '1px solid #1F1508', color: '#1F1508', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1F1508'; e.currentTarget.style.color = '#F5F2EC'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1F1508'; }}
          >Request a Tour</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
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
          <div style={{ position: 'relative', width: '60vw', maxWidth: 600, height: '80vh', background: 'white' }} onClick={e => e.stopPropagation()}>
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
          .mobile-col { grid-template-columns: 1fr !important; }
          .mobile-full { flex-basis: 280px !important; }
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
          <Image src="/images/exterior-street.jpg" alt="The Row Townhomes" fill className="object-cover" priority sizes="100vw" />
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
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#C9A97A' }}>Johnstown, Colorado · Now Leasing</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: 'clamp(44px, 6.5vw, 88px)', lineHeight: 1.02, color: '#F5F2EC', letterSpacing: '-.02em', marginBottom: 28 }}>
              Luxury Townhomes<br />for Lease in<br /><em style={{ fontStyle: 'italic', color: '#C9A97A' }}>Johnstown, CO.</em>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(245,242,236,.65)', lineHeight: 1.75, maxWidth: 480, marginBottom: 40 }}>
              32 residences at 5005 Exposition Drive. Three bedrooms, private fenced yards, oversized garages — designed without compromise.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/schedule-a-tour.html" style={{ background: '#C9A97A', color: '#1F1508', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '16px 36px', textDecoration: 'none', fontWeight: 600, transition: 'background .2s' }}
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

        <div style={{ position: 'absolute', right: 40, bottom: 40, textAlign: 'right' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A89887' }}>Starting At</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, color: '#F5F2EC', fontWeight: 300, lineHeight: 1 }}>$2,795<span style={{ fontSize: 18, color: '#A89887' }}>/mo</span></div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: '#1F1508', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ ...S.wrap }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid rgba(255,255,255,.06)' }} className="mobile-col">
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
          <div className="reveal reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#D9D5CF' }}>
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
            <a href="/schedule-a-tour.html" style={{ display: 'inline-block', background: '#1F1508', color: '#F5F2EC', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '15px 36px', textDecoration: 'none', transition: 'background .2s' }}
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
            <div style={S.eyebrow}>Interactive Site Map</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 300, color: '#1F1508', marginBottom: 12, lineHeight: 1.1 }}>32 Residences.<br />Select a unit.</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#2C3138', lineHeight: 1.7, maxWidth: 500, opacity: .65 }}>Click any unit on the site map to explore its floor plan, specifications, and tour options.</p>
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
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 300, color: '#F5F2EC', marginBottom: 16, lineHeight: 1.1 }}>5005 Exposition Dr,<br />Johnstown, CO.</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,242,236,.5)', lineHeight: 1.75, marginBottom: 32 }}>Positioned at the Johnstown-Windsor border. Twenty minutes to Fort Collins. Quick access to I-25. Close enough to everything — far enough from the noise.</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Address', '5005 Exposition Dr, Johnstown, CO 80534'], ['Fort Collins', '~20 min north via I-25'], ['Greeley', '~30 min east'], ['Denver', '~1 hr south']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 24 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', width: 100, flexShrink: 0, paddingTop: 1 }}>{k}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,242,236,.55)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1" style={{ height: 420, overflow: 'hidden' }}>
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', unit: '', timeline: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending'); setError('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); setStatus('error'); return }
      setStatus('success')
      setForm({ name: '', email: '', phone: '', unit: '', timeline: '', message: '' })
    } catch { setError('Network error. Please try again.'); setStatus('error') }
  }

  if (status === 'success') return (
    <div style={{ padding: '40px 0', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#A89887', marginBottom: 12 }}>Received</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#F5F2EC', fontWeight: 300, marginBottom: 12 }}>You are on the list.</div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,242,236,.5)', lineHeight: 1.7 }}>We'll be in touch with availability and next steps.</p>
    </div>
  )

  const inputStyle: React.CSSProperties = { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,.12)', padding: '10px 0', color: '#F5F2EC', fontFamily: "'Inter', sans-serif", fontSize: 15, outline: 'none', transition: 'border-color .2s' }
  const labelStyle: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#A89887', display: 'block', marginBottom: 8 }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div><label style={labelStyle}>Name</label><input name="name" value={form.name} onChange={handle} required placeholder="First & Last" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A97A')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.12)')} /></div>
        <div><label style={labelStyle}>Email</label><input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@email.com" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A97A')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.12)')} /></div>
        <div><label style={labelStyle}>Phone</label><input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="(970) 000-0000" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A97A')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.12)')} /></div>
        <div><label style={labelStyle}>Floor Plan</label>
          <select name="unit" value={form.unit} onChange={handle} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Select one</option>
            <option value="The Addison — 2-Car Garage">The Addison — 2-Car Garage</option>
            <option value="The Forge — 3-Car Garage">The Forge — 3-Car Garage</option>
            <option value="Either / Flexible">Either / Flexible</option>
          </select>
        </div>
      </div>
      <div><label style={labelStyle}>Message</label><textarea name="message" value={form.message} onChange={handle} rows={2} placeholder="Anything you'd like us to know." style={{ ...inputStyle, resize: 'none' }} onFocus={e => (e.currentTarget.style.borderBottomColor = '#C9A97A')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.12)')} /></div>
      {error && <p style={{ color: '#e07070', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{error}</p>}
      <button type="submit" disabled={status === 'sending'} style={{ background: '#C9A97A', color: '#1F1508', border: 'none', fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', padding: '15px', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? .6 : 1, fontWeight: 600, transition: 'background .2s' }}
        onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = '#F5F2EC'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#C9A97A'; }}
      >{status === 'sending' ? 'Sending…' : 'Request Information'}</button>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,242,236,.2)', textAlign: 'center', letterSpacing: '.04em' }}>Private tours by appointment only.</p>
    </form>
  )
}