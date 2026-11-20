import { Check, LockKey, Sparkle } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import {
  CUSTOMIZER_GROUPS,
  FLAGSHIP_BASE_PRICE,
  FLAGSHIP_DEPOSIT_AMOUNT,
  type CartItem,
} from '../data/catalog'
import { Tilt3DFrame } from './Tilt3DFrame'

interface BuildConfiguratorProps {
  onAddConfiguredBuild: (item: CartItem) => void
}

type SelectionMap = Record<'finish' | 'wheels' | 'interior' | 'acoustic', string>

export function BuildConfigurator({ onAddConfiguredBuild }: BuildConfiguratorProps) {
  const [selections, setSelections] = useState<SelectionMap>({
    finish: 'obsidian-satin',
    wheels: 'monoblock-lip',
    interior: 'nappa-diamond',
    acoustic: 'valvetronic-street',
  })
  const [monogram, setMonogram] = useState('STAMPLEY 01')
  const [paymentMode, setPaymentMode] = useState<'deposit' | 'full'>('deposit')
  const [lockedFeedback, setLockedFeedback] = useState(false)
  const [viewAngle, setViewAngle] = useState<'exterior' | 'rear' | 'interior'>('exterior')
  const reduceMotion = useReducedMotion()

  const selectedOptions = CUSTOMIZER_GROUPS.map((group) => {
    const chosen =
      group.options.find((opt) => opt.id === selections[group.id]) ?? group.options[0]
    return { groupLabel: group.label, ...chosen }
  })

  const upgradesTotal = selectedOptions.reduce((sum, opt) => sum + opt.priceDelta, 0)
  const configuredTotal = FLAGSHIP_BASE_PRICE + upgradesTotal
  const dueNow = paymentMode === 'deposit' ? FLAGSHIP_DEPOSIT_AMOUNT : configuredTotal

  const handleGroupPick = (groupId: keyof SelectionMap, optionId: string) => {
    setSelections((prev) => ({ ...prev, [groupId]: optionId }))
    if (groupId === 'interior') {
      setViewAngle('interior')
    } else if (groupId === 'acoustic') {
      setViewAngle('rear')
    } else {
      setViewAngle('exterior')
    }
  }

  const activeImage =
    viewAngle === 'interior'
      ? '/images/flagship-interior.jpg'
      : viewAngle === 'rear'
        ? '/images/flagship-rear.jpg'
        : '/images/hero-flagship.jpg'

  const handleLockBuild = () => {
    const cleanMonogram = monogram.trim().toUpperCase() || 'OPULENCE 01'
    const summaryList = selectedOptions.map((o) => o.name).join(' | ')
    onAddConfiguredBuild({
      id: `op01-${selections.finish}-${selections.wheels}-${selections.interior}-${selections.acoustic}-${paymentMode}-${cleanMonogram}`,
      title:
        paymentMode === 'deposit'
          ? 'OP-01 Black Sovereign (Build Reservation Deposit)'
          : 'OP-01 Black Sovereign (Full Custom Turnkey Build)',
      subtitle: `${summaryList}`,
      meta: `Engraved Plaque: ${cleanMonogram} | Total Build Value: $${configuredTotal.toLocaleString()}`,
      category: 'vehicle',
      unitPrice: dueNow,
      quantity: 1,
      image: activeImage,
    })

    setLockedFeedback(true)
    window.setTimeout(() => setLockedFeedback(false), 1800)
  }

  return (
    <section
      id="customize"
      className="relative border-t border-white/[0.08] bg-[#050507] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5F4F0] leading-none sm:text-5xl">
              <span className="mr-3 font-mono text-2xl font-medium text-[#D4AF37] sm:text-3xl">
                02.
              </span>
              Commission Your Exact Specification
            </h2>
          </div>
          <p className="max-w-[44ch] text-sm leading-relaxed text-[#9A9992] sm:text-base">
            Tailor exterior surface, forged wheel hardware, cabin trim, and exhaust calibration before locking your serialized build slot.
          </p>
        </div>

        <div className="border border-white/[0.09] bg-[#0B0B0F]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start">
            {/* Left 7 cols: Sticky Studio Preview Stage + 3D Metallic Owner Sill Plaque */}
            <div className="flex flex-col border-b border-white/[0.08] lg:sticky lg:top-20 lg:col-span-7 lg:border-r lg:border-b-0">
              <Tilt3DFrame intensity={3.5}>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050507]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt="Configured Opulence OP-01 Black Sovereign studio preview"
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full w-full object-cover object-center"
                    />
                  </AnimatePresence>

                  <div className="pointer-events-none absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="border border-[#D4AF37]/40 bg-[#050507]/85 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-[#D4AF37]">
                      ATELIER SPEC PREVIEW
                    </span>

                    <div className="pointer-events-auto flex flex-wrap gap-1">
                      {[
                        { id: 'exterior' as const, label: 'Exterior' },
                        { id: 'rear' as const, label: 'Rear Exhaust' },
                        { id: 'interior' as const, label: 'Cockpit' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setViewAngle(tab.id)}
                          className={`border px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                            viewAngle === tab.id
                              ? 'border-[#D4AF37] bg-[#D4AF37] font-bold text-[#050507]'
                              : 'border-white/15 bg-[#050507]/85 text-[#9A9992] hover:text-[#F5F4F0]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt3DFrame>

              {/* Interactive 3D Metallic Owner Sill Plaque */}
              <div className="grid grid-cols-1 divide-y divide-white/[0.08] border-t border-white/[0.08] bg-[#09090C] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="p-6">
                  <label
                    htmlFor="sill-monogram"
                    className="block font-mono text-[11px] font-medium tracking-[0.16em] text-[#D4AF37] uppercase"
                  >
                    Owner Sill Plaque Engraving
                  </label>
                  <input
                    id="sill-monogram"
                    type="text"
                    maxLength={18}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value)}
                    data-agent="customizer-monogram-input"
                    placeholder="ENTER INSCRIPTION"
                    className="mt-3 w-full rounded-sm border border-white/15 bg-[#121217] px-3.5 py-2.5 font-mono text-sm tracking-[0.14em] text-[#F5F4F0] uppercase transition-colors placeholder:text-[#9A9992]/50 hover:border-[#D4AF37]/50 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  />
                </div>

                <div className="flex flex-col justify-between p-6">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[#9A9992]">
                    MILLED BILLET PLAQUE OUTPUT
                  </span>
                  <Tilt3DFrame intensity={9} className="mt-3">
                    <div className="flex items-center justify-between border border-[#D4AF37]/45 bg-gradient-to-r from-[#121217] via-[#1E1A12] to-[#121217] px-4 py-3 shadow-inner">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-[#9A9992]">
                        01 / 01
                      </span>
                      <span className="font-mono text-sm font-bold tracking-[0.2em] text-[#EBD074] uppercase">
                        {monogram.trim() || 'OPULENCE 01'}
                      </span>
                    </div>
                  </Tilt3DFrame>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Specification Controls & Checkout Allocation */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
              <div className="space-y-6">
                {CUSTOMIZER_GROUPS.map((group) => (
                  <div key={group.id}>
                    <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-[#D4AF37] uppercase">
                      {group.label}
                    </h3>
                    <div className="mt-2.5 space-y-2">
                      {group.options.map((opt) => {
                        const active = selections[group.id] === opt.id
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleGroupPick(group.id, opt.id)}
                            data-agent={`customizer-option-${group.id}-${opt.id}`}
                            aria-pressed={active}
                            className={`flex w-full items-center justify-between gap-3 rounded-sm border p-3.5 text-left transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                              active
                                ? 'border-[#D4AF37] bg-[#16161D]'
                                : 'border-white/[0.08] bg-[#08080B] hover:border-white/25 hover:bg-[#101016]'
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                aria-hidden="true"
                                style={{ background: opt.swatch }}
                                className="h-5 w-5 shrink-0 rounded-sm border border-white/25"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-display text-sm font-semibold text-[#F5F4F0]">
                                  {opt.name}
                                </p>
                                <p className="truncate text-[11px] text-[#9A9992]">
                                  {opt.detail}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`shrink-0 font-mono text-xs ${
                                active ? 'text-[#D4AF37]' : 'text-[#9A9992]'
                              }`}
                            >
                              {opt.badge}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/[0.08] pt-6">
                <div className="grid grid-cols-2 gap-2 border border-white/[0.08] bg-[#07070A] p-1">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('deposit')}
                    data-agent="customizer-mode-deposit"
                    className={`rounded-sm px-3 py-2 font-mono text-[11px] font-semibold tracking-wider uppercase transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      paymentMode === 'deposit'
                        ? 'bg-[#D4AF37] text-[#050507]'
                        : 'text-[#9A9992] hover:text-[#F5F4F0]'
                    }`}
                  >
                    $5,000 Deposit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('full')}
                    data-agent="customizer-mode-full"
                    className={`rounded-sm px-3 py-2 font-mono text-[11px] font-semibold tracking-wider uppercase transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      paymentMode === 'full'
                        ? 'bg-[#D4AF37] text-[#050507]'
                        : 'text-[#9A9992] hover:text-[#F5F4F0]'
                    }`}
                  >
                    Full Turnkey
                  </button>
                </div>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.14em] text-[#9A9992]">
                      BUILD VALUE: ${configuredTotal.toLocaleString()}
                    </p>
                    <p className="mt-1 font-display text-3xl font-bold text-[#F5F4F0] tabular-nums">
                      ${dueNow.toLocaleString()}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-[#D4AF37]">
                    {paymentMode === 'deposit' ? 'DUE AT CHECKOUT' : 'FULL SETTLEMENT'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLockBuild}
                  data-agent="lock-custom-build-cta"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-[#D4AF37] px-6 py-4 font-mono text-xs font-bold tracking-[0.14em] text-[#050507] uppercase transition-all hover:bg-[#EBD074] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  {lockedFeedback ? (
                    <>
                      <Check size={17} weight="bold" />
                      <span>Build Added To Checkout Bag</span>
                    </>
                  ) : (
                    <>
                      <LockKey size={17} weight="bold" />
                      <span>
                        {paymentMode === 'deposit'
                          ? 'Lock Custom Build ($5,000 Deposit)'
                          : 'Proceed With Full Configured Build'}
                      </span>
                    </>
                  )}
                </button>

                <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-[#9A9992]">
                  <Sparkle size={14} weight="fill" className="text-[#D4AF37]" />
                  <span>Serialized build dossier & 21-day studio delivery</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
