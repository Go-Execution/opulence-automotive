import { ArrowUpRight, ArrowsLeftRight, CheckCircle, SlidersHorizontal } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { FLAGSHIP_BASE_PRICE, FLAGSHIP_CHAPTERS } from '../data/catalog'
import { Tilt3DFrame } from './Tilt3DFrame'

interface FlagshipShowcaseProps {
  onAcquireTurnkey: () => void
}

export function FlagshipShowcase({ onAcquireTurnkey }: FlagshipShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [splitCompare, setSplitCompare] = useState(false)
  const [sliderPercent, setSliderPercent] = useState(50)
  const [addedTurnkey, setAddedTurnkey] = useState(false)
  const reduceMotion = useReducedMotion()
  const activeChapter = FLAGSHIP_CHAPTERS[activeIndex]

  const handleTurnkeyClick = () => {
    onAcquireTurnkey()
    setAddedTurnkey(true)
    window.setTimeout(() => setAddedTurnkey(false), 1800)
  }

  return (
    <section
      id="flagship"
      className="relative border-t border-white/[0.08] bg-[#050507] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5F4F0] leading-none sm:text-5xl">
              <span className="mr-3 font-mono text-2xl font-medium text-[#D4AF37] sm:text-3xl">
                01.
              </span>
              Slow Focus On The Main Automobile
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="max-w-[46ch] text-sm leading-relaxed text-[#9A9992] sm:text-base lg:text-right">
              Every proportion, forged carbon edge, and gold-stitched seam on OP-01 Black Sovereign anchors the parts and apparel designed around it.
            </p>
            <button
              type="button"
              onClick={() => setSplitCompare((prev) => !prev)}
              data-agent="flagship-toggle-split-compare"
              aria-pressed={splitCompare}
              className={`inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                splitCompare
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#050507]'
                  : 'border-white/15 bg-[#0B0B0F] text-[#F5F4F0] hover:border-[#D4AF37]/50'
              }`}
            >
              <ArrowsLeftRight size={14} weight="bold" />
              <span>{splitCompare ? 'Exit Front / Rear Split' : 'Compare Front vs Rear Aero'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 7 cols: Interactive 3D-Tilt Studio Media Stage */}
          <div className="lg:sticky lg:top-24 lg:col-span-7">
            <Tilt3DFrame intensity={3.5}>
              <div className="overflow-hidden rounded-sm border border-white/[0.09] bg-[#0B0B0F]">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050507]">
                  {splitCompare ? (
                    <div className="relative h-full w-full select-none">
                      <img
                        src="/images/flagship-rear.jpg"
                        alt="Opulence OP-01 Rear Forged Carbon Diffuser and Quad Titanium Exhaust"
                        className="h-full w-full object-cover object-center"
                      />
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPercent}% 0 0)` }}
                      >
                        <img
                          src="/images/hero-flagship.jpg"
                          alt="Opulence OP-01 Front Satin Widebody and Forged Carbon Splitter"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Gold Split Divider Bar */}
                      <div
                        aria-hidden="true"
                        style={{ left: `${sliderPercent}%` }}
                        className="pointer-events-none absolute inset-y-0 w-px bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.85)]"
                      >
                        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-[#D4AF37] bg-[#050507] text-[#D4AF37]">
                          <ArrowsLeftRight size={15} weight="bold" />
                        </div>
                      </div>

                      <input
                        type="range"
                        min={8}
                        max={92}
                        value={sliderPercent}
                        onChange={(e) => setSliderPercent(Number(e.target.value))}
                        aria-label="Slide to compare front silhouette and rear titanium exhaust"
                        data-agent="flagship-split-slider"
                        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
                      />

                      <div className="pointer-events-none absolute top-4 left-4 right-4 flex justify-between">
                        <span className="border border-[#D4AF37]/40 bg-[#050507]/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#D4AF37]">
                          FRONT WIDEBODY
                        </span>
                        <span className="border border-white/15 bg-[#050507]/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#F5F4F0]">
                          REAR DIFFUSER & TITANIUM
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeChapter.id}
                          src={activeChapter.image}
                          alt={activeChapter.imageAlt}
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full w-full object-cover object-center"
                        />
                      </AnimatePresence>

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/45 to-transparent" />

                      <div className="pointer-events-none absolute bottom-4 left-5 right-5 flex items-center justify-between gap-4">
                        <span className="border border-[#D4AF37]/40 bg-[#050507]/85 px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-[#D4AF37]">
                          ANGLE {activeChapter.index} / 03
                        </span>
                        <span className="font-mono text-xs text-[#F5F4F0]/90">
                          {activeChapter.label}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 divide-y divide-white/[0.08] border-t border-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {activeChapter.specs.map((spec) => (
                    <div key={spec.label} className="px-6 py-4">
                      <p className="font-mono text-[10px] tracking-[0.16em] text-[#9A9992] uppercase">
                        {spec.label}
                      </p>
                      <p className="mt-1 font-display text-sm font-semibold text-[#F5F4F0]">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Tilt3DFrame>
          </div>

          {/* Right 5 cols: Study chapters + Turnkey acquisition */}
          <div className="flex flex-col justify-between gap-5 lg:col-span-5">
            <div
              className="divide-y divide-white/[0.08] border border-white/[0.09] bg-[#0B0B0F]"
              role="tablist"
              aria-label="Flagship study chapters"
            >
              {FLAGSHIP_CHAPTERS.map((chapter, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    data-agent={`flagship-chapter-${chapter.id}`}
                    onClick={() => {
                      setSplitCompare(false)
                      setActiveIndex(index)
                    }}
                    className={`w-full border-l-2 p-6 text-left transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      isActive
                        ? 'border-l-[#D4AF37] bg-[#121218]'
                        : 'border-l-transparent bg-[#0B0B0F] hover:bg-[#0F0F15]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-mono text-xs tracking-[0.16em] ${
                          isActive ? 'text-[#D4AF37]' : 'text-[#9A9992]'
                        }`}
                      >
                        {chapter.index} / {chapter.label.toUpperCase()}
                      </span>
                      <span
                        className={`h-1.5 w-6 ${
                          isActive ? 'bg-[#D4AF37]' : 'bg-white/10'
                        }`}
                      />
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#F5F4F0]">
                      {chapter.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9A9992]">
                      {chapter.summary}
                    </p>
                    {isActive && (
                      <p className="mt-3 border-t border-white/[0.08] pt-3 text-xs leading-relaxed text-[#F5F4F0]/80">
                        {chapter.detail}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="rounded-sm border border-[#D4AF37]/30 bg-[#0D0D11] p-6">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#D4AF37]">
                    DIRECT VEHICLE SALE
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-[#F5F4F0] tabular-nums">
                    ${FLAGSHIP_BASE_PRICE.toLocaleString()}
                  </p>
                </div>
                <span className="border border-white/10 bg-[#14141A] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#9A9992]">
                  READY FOR DISPATCH
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleTurnkeyClick}
                  data-agent="acquire-turnkey-vehicle"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#D4AF37] px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] text-[#050507] uppercase transition-all hover:bg-[#EBD074] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  {addedTurnkey ? (
                    <>
                      <CheckCircle size={16} weight="bold" />
                      <span>Added To Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Acquire Turnkey</span>
                      <ArrowUpRight size={15} weight="bold" />
                    </>
                  )}
                </button>

                <a
                  href="#customize"
                  data-agent="jump-to-customizer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-[#14141A] px-5 py-3 font-mono text-xs font-semibold tracking-[0.12em] text-[#F5F4F0] uppercase transition-all hover:border-[#D4AF37]/50 hover:bg-[#1B1B23] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <SlidersHorizontal size={15} className="text-[#D4AF37]" />
                  <span>Tailor Spec</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
