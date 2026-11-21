import { ArrowDownRight, ArrowRight, Crosshair } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { Tilt3DFrame } from './Tilt3DFrame'

const HERO_HOTSPOTS = [
  {
    id: 'splitter',
    label: 'Front Aero Splitter',
    detail: 'Sculpted low-profile chin splitter and front dive planes',
    x: '16%',
    y: '71%',
  },
  {
    id: 'wheel',
    label: '5-Spoke Black Wheel',
    detail: 'Gloss black 5-spoke alloy paired with slotted performance rotors',
    x: '43%',
    y: '67%',
  },
  {
    id: 'cockpit',
    label: 'Open-Air Cockpit',
    detail: 'Swept dark windscreen with sculpted driver cockpit and moto controls',
    x: '62%',
    y: '38%',
  },
] as const

export function HeroStage() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [activeHotspot, setActiveHotspot] = useState<string>('wheel')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const stageY = useTransform(scrollYProgress, [0, 1], [0, 28])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.03])

  const selectedPin =
    HERO_HOTSPOTS.find((h) => h.id === activeHotspot) ?? HERO_HOTSPOTS[1]

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-[#050507] pt-24 pb-8"
    >
      {/* Subtle 3D architectural floor perspective grid behind studio stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46vh] overflow-hidden opacity-35"
        style={{ perspective: '700px' }}
      >
        <div
          className="h-full w-full origin-bottom"
          style={{
            transform: 'rotateX(68deg) scale(1.4)',
            backgroundImage:
              'linear-gradient(to right, rgba(212,175,55,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.14) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 60% 70%, black 15%, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 60% 70%, black 15%, transparent 72%)',
          }}
        />
      </div>

      {/* Warm champagne gold ambient studio rim glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-[6%] h-[440px] w-[540px] rounded-full bg-[#D4AF37]/[0.08] blur-[150px]"
      />

      <div className="relative z-10 mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Strictly 4 text elements in hero copy stack */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <p className="mb-5 inline-flex items-center gap-2 border-l-2 border-[#D4AF37] pl-3 font-mono text-[11px] font-medium tracking-[0.22em] text-[#D4AF37] uppercase">
            COMMISSION 01 / AVAILABLE FOR ACQUISITION
          </p>

          <h1 className="font-display text-4xl font-bold tracking-tighter text-[#F5F4F0] leading-[1.02] sm:text-5xl xl:text-[3.6rem]">
            <span className="block">Forged In Black.</span>
            <span className="gold-gradient-text block">Built To Command.</span>
          </h1>

          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[#A8A7A0] sm:text-lg">
            One bespoke open-cockpit custom automobile for sale, surrounded by matched custom auto parts and limited capsule apparel.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#customize"
              data-agent="hero-primary-configure"
              className="inline-flex items-center gap-2.5 rounded-sm bg-[#D4AF37] px-6 py-3.5 font-mono text-xs font-bold tracking-[0.14em] text-[#050507] uppercase transition-all hover:bg-[#EBD074] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
            >
              <span>Configure & Reserve</span>
              <ArrowRight size={15} weight="bold" />
            </a>

            <a
              href="#apparel"
              data-agent="hero-secondary-apparel"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-[#0B0B0F] px-6 py-3.5 font-mono text-xs font-medium tracking-[0.14em] text-[#F5F4F0] uppercase transition-all hover:border-[#D4AF37]/60 hover:bg-[#14141A] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>Explore Capsule Apparel</span>
              <ArrowDownRight size={15} weight="bold" className="text-[#D4AF37]" />
            </a>
          </div>
        </motion.div>

        {/* Architectural Studio Frame Showcase for Opulence Flagship Vehicle */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <Tilt3DFrame intensity={4}>
            <motion.div
              style={reduceMotion ? undefined : { y: stageY, scale: stageScale }}
              className="relative overflow-hidden rounded-sm border border-[#D4AF37]/30 bg-[#0B0B0F] shadow-2xl"
            >
              <div className="relative aspect-[2/1] w-full overflow-hidden">
                <img
                  src="/images/hero-roadster.jpg"
                  alt="Opulence Automotive Productions custom jet-black open-cockpit flagship vehicle with 5-spoke gloss black wheels"
                  className="h-full w-full object-cover object-center contrast-[1.06] brightness-[0.96]"
                />
                {/* Subtle studio cyclorama edge vignette tying light grey studio backdrop into obsidian frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_78%_at_50%_52%,transparent_52%,rgba(5,5,7,0.75)_100%)]"
                />
              </div>

              {/* Interactive architectural hotspot pins */}
              {HERO_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeHotspot
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(spot.id)}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    style={{ left: spot.x, top: spot.y }}
                    aria-label={`Inspect ${spot.label}`}
                    data-agent={`hero-hotspot-${spot.id}`}
                    className={`group absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      isSelected ? 'scale-110' : ''
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-[#050507]'
                          : 'border-[#D4AF37]/70 bg-[#050507]/85 text-[#D4AF37] hover:bg-[#D4AF37]/25'
                      }`}
                    >
                      <Crosshair size={12} weight="bold" />
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </Tilt3DFrame>
        </motion.div>
      </div>

      {/* Crisp Architectural Bottom Specification & Hotspot Readout Bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-xs tracking-[0.16em] text-[#D4AF37]">
            OP-01 BLACK SOVEREIGN
          </span>
          <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
          <span className="font-mono text-[11px] text-[#9A9992]">
            {selectedPin.label.toUpperCase()}: {selectedPin.detail}
          </span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#9A9992]">
            TURNKEY BASE
          </span>
          <span className="font-display text-xl font-bold text-[#F5F4F0] tabular-nums">
            $248,000
          </span>
        </div>
      </div>
    </section>
  )
}
