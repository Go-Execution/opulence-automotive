import { Check, Plus, ShoppingBag } from '@phosphor-icons/react'
import { useState } from 'react'
import { APPAREL_COLLECTION, type ApparelItem, type CartItem } from '../data/catalog'
import { Tilt3DFrame } from './Tilt3DFrame'

interface ApparelCapsuleProps {
  onAddItem: (item: CartItem) => void
}

export function ApparelCapsule({ onAddItem }: ApparelCapsuleProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'apparel-bomber': 'L',
    'apparel-hoodie': 'L',
    'apparel-tee': 'L',
    'apparel-cap': 'ONE SIZE',
  })
  const [justAddedId, setJustAddedId] = useState<string | null>(null)

  const handleAddApparel = (item: ApparelItem) => {
    const size = selectedSizes[item.id] ?? item.sizes[0]
    onAddItem({
      id: `${item.id}-${size}`,
      title: item.name,
      subtitle: `${item.fabricSpec} | Size: ${size}`,
      category: 'apparel',
      unitPrice: item.price,
      quantity: 1,
      image: item.image,
    })
    setJustAddedId(item.id)
    window.setTimeout(() => setJustAddedId(null), 1300)
  }

  const handleAddFullCapsule = () => {
    onAddItem({
      id: 'apparel-full-capsule-pack',
      title: 'Complete 4-Piece Sovereign Capsule Bundle',
      subtitle: `Bomber (${selectedSizes['apparel-bomber']}), Hoodie (${selectedSizes['apparel-hoodie']}), Tee (${selectedSizes['apparel-tee']}) & Crest Cap`,
      category: 'apparel',
      unitPrice: 790,
      quantity: 1,
      image: '/images/apparel-lookbook.jpg',
      meta: 'Capsule Bundle Savings Applied ($95 Off)',
    })
    setJustAddedId('bundle')
    window.setTimeout(() => setJustAddedId(null), 1500)
  }

  const featuredBomber = APPAREL_COLLECTION[0]
  const secondaryPieces = APPAREL_COLLECTION.slice(1)

  return (
    <section
      id="apparel"
      className="relative border-t border-white/[0.08] bg-[#050507] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5F4F0] leading-none sm:text-5xl">
              <span className="mr-3 font-mono text-2xl font-medium text-[#D4AF37] sm:text-3xl">
                03.
              </span>
              Apparel Built Around The Machine
            </h2>
          </div>

          <p className="max-w-[44ch] text-sm leading-relaxed text-[#9A9992] sm:text-base">
            Cut from heavyweight matte textiles and finished with brushed champagne gold hardware matching the OP-01 cabin and exterior.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 5 cols: Interactive 3D-Tilt Editorial Lookbook */}
          <div className="lg:col-span-5">
            <Tilt3DFrame intensity={5} className="h-full">
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-sm border border-white/[0.09] bg-[#0B0B0F]">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src="/images/apparel-lookbook.jpg"
                    alt="Editorial lookbook showing Opulence black wool-and-leather bomber beside OP-01 custom vehicle"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/70 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-[#D4AF37]">
                      ATELIER CAPSULE 01
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-[#F5F4F0]">
                      Built To Wear Next To The Car
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] bg-[#0B0B0F] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#F5F4F0]">
                        Full 4-Piece Driver Capsule Set
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-[#9A9992]">
                        Individual Retail $885 | Bundle $790
                      </p>
                    </div>
                    <span className="border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#D4AF37]">
                      SAVE $95
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddFullCapsule}
                    data-agent="add-full-apparel-capsule"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[#D4AF37] bg-[#14141A] px-5 py-3.5 font-mono text-xs font-semibold tracking-[0.12em] text-[#F5F4F0] uppercase transition-all hover:bg-[#D4AF37] hover:text-[#050507] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    {justAddedId === 'bundle' ? (
                      <>
                        <Check size={16} weight="bold" />
                        <span>Capsule Bundle Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} weight="duotone" />
                        <span>Acquire Complete 4-Piece Kit ($790)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Tilt3DFrame>
          </div>

          {/* Right 7 cols: Featured wide garment + staggered studio pieces with 3D spatial tilt */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Tilt3DFrame intensity={4}>
              <article className="grid grid-cols-1 overflow-hidden rounded-sm border border-white/[0.09] bg-[#0B0B0F] sm:grid-cols-12">
                <div className="relative aspect-[4/3] sm:col-span-5 sm:aspect-auto">
                  <img
                    src={featuredBomber.image}
                    alt={featuredBomber.imageAlt}
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="flex flex-col justify-between p-6 sm:col-span-7">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-[#D4AF37]">
                        {featuredBomber.code}
                      </span>
                      <span className="font-display text-xl font-bold text-[#F5F4F0] tabular-nums">
                        ${featuredBomber.price}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-[#F5F4F0]">
                      {featuredBomber.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[#9A9992]">
                      {featuredBomber.fabricSpec}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#9A9992]">
                      {featuredBomber.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
                    <div className="flex items-center gap-1.5" role="group" aria-label="Bomber jacket sizes">
                      {featuredBomber.sizes.map((size) => {
                        const active = selectedSizes[featuredBomber.id] === size
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [featuredBomber.id]: size,
                              }))
                            }
                            aria-pressed={active}
                            className={`h-8 min-w-9 rounded-sm border px-2 font-mono text-xs transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                              active
                                ? 'border-[#D4AF37] bg-[#D4AF37] font-bold text-[#050507]'
                                : 'border-white/10 bg-[#14141A] text-[#9A9992] hover:border-white/30 hover:text-[#F5F4F0]'
                            }`}
                          >
                            {size}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddApparel(featuredBomber)}
                      data-agent={`add-apparel-${featuredBomber.id}`}
                      className="inline-flex items-center gap-2 rounded-sm bg-[#D4AF37] px-5 py-2.5 font-mono text-xs font-bold tracking-[0.12em] text-[#050507] uppercase transition-all hover:bg-[#EBD074] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                    >
                      {justAddedId === featuredBomber.id ? (
                        <>
                          <Check size={14} weight="bold" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} weight="bold" />
                          <span>Add To Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            </Tilt3DFrame>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {secondaryPieces.map((item) => (
                <Tilt3DFrame key={item.id} intensity={6}>
                  <article className="flex h-full flex-col justify-between overflow-hidden rounded-sm border border-white/[0.09] bg-[#0B0B0F] transition-colors hover:border-[#D4AF37]/40">
                    <div>
                      <div className="aspect-[3/4] w-full overflow-hidden bg-[#08080B]">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] tracking-[0.14em] text-[#D4AF37]">
                            {item.code}
                          </span>
                          <span className="font-display text-lg font-bold text-[#F5F4F0] tabular-nums">
                            ${item.price}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-lg font-bold text-[#F5F4F0]">
                          {item.name}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] text-[#9A9992]">
                          {item.fabricSpec}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.08] p-5 pt-4">
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {item.sizes.map((size) => {
                          const active = selectedSizes[item.id] === size
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [item.id]: size,
                                }))
                              }
                              aria-pressed={active}
                              className={`h-7 min-w-8 rounded-sm border px-2 font-mono text-[11px] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                                active
                                  ? 'border-[#D4AF37] bg-[#D4AF37] font-bold text-[#050507]'
                                  : 'border-white/10 bg-[#14141A] text-[#9A9992] hover:border-white/30 hover:text-[#F5F4F0]'
                              }`}
                            >
                              {size}
                            </button>
                          )
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddApparel(item)}
                        data-agent={`add-apparel-${item.id}`}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-sm border border-white/15 bg-[#14141A] px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-[#F5F4F0] uppercase transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050507] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                      >
                        {justAddedId === item.id ? (
                          <>
                            <Check size={14} weight="bold" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} weight="bold" />
                            <span>Add Item</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                </Tilt3DFrame>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
