import { Check, Plus, Wrench } from '@phosphor-icons/react'
import { useState } from 'react'
import { CUSTOM_AUTO_PARTS, type AutoPartItem, type CartItem } from '../data/catalog'
import { Tilt3DFrame } from './Tilt3DFrame'

interface AutoPartsCatalogProps {
  onAddPart: (item: CartItem) => void
}

const CATEGORIES = ['All Parts', 'Wheels', 'Carbon Aero', 'Exhaust & Brakes'] as const

export function AutoPartsCatalog({ onAddPart }: AutoPartsCatalogProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>('All Parts')
  const [activePreviewPart, setActivePreviewPart] = useState<AutoPartItem>(
    CUSTOM_AUTO_PARTS[0]
  )
  const [addedSku, setAddedSku] = useState<string | null>(null)

  const filteredParts =
    selectedCategory === 'All Parts'
      ? CUSTOM_AUTO_PARTS
      : CUSTOM_AUTO_PARTS.filter((part) => part.category === selectedCategory)

  const handleAdd = (part: AutoPartItem) => {
    onAddPart({
      id: part.id,
      title: part.name,
      subtitle: `${part.sku} | ${part.fitment}`,
      category: 'parts',
      unitPrice: part.price,
      quantity: 1,
      image: part.image,
      meta: part.availability,
    })
    setAddedSku(part.sku)
    window.setTimeout(() => setAddedSku(null), 1300)
  }

  return (
    <section
      id="parts"
      className="relative border-t border-white/[0.08] bg-[#050507] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5F4F0] leading-none sm:text-5xl">
              <span className="mr-3 font-mono text-2xl font-medium text-[#D4AF37] sm:text-3xl">
                04.
              </span>
              Custom Auto Parts Program
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter custom auto parts by category"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  data-agent={`parts-filter-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className={`rounded-sm border px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    active
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#050507]'
                      : 'border-white/10 bg-[#0B0B0F] text-[#9A9992] hover:border-white/25 hover:text-[#F5F4F0]'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 5 cols: Sticky Studio Hardware Frame with 3D spatial tilt */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <Tilt3DFrame intensity={5}>
                <div className="overflow-hidden rounded-sm border border-white/[0.09] bg-[#0B0B0F]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050507]">
                    <img
                      src={activePreviewPart.image}
                      alt={`${activePreviewPart.name} precision automotive hardware`}
                      className="h-full w-full object-cover object-center transition-all duration-500"
                    />
                    <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="border border-[#D4AF37]/35 bg-[#050507]/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#D4AF37]">
                        ATELIER HARDWARE
                      </span>
                      <span className="border border-white/10 bg-[#050507]/85 px-2.5 py-1 font-mono text-[10px] text-[#9A9992]">
                        {activePreviewPart.sku}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.08] p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs tracking-[0.16em] text-[#D4AF37]">
                        {activePreviewPart.category.toUpperCase()}
                      </span>
                      <span className="border border-white/10 bg-[#14141A] px-2.5 py-1 font-mono text-[10px] text-[#9A9992]">
                        {activePreviewPart.availability}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-[#F5F4F0]">
                      {activePreviewPart.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9A9992]">
                      {activePreviewPart.spec}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-[#9A9992]">
                      <span className="inline-flex items-center gap-2">
                        <Wrench size={15} className="text-[#D4AF37]" />
                        <span>{activePreviewPart.fitment}</span>
                      </span>
                      <span className="font-display text-xl font-bold text-[#F5F4F0] tabular-nums">
                        ${activePreviewPart.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Tilt3DFrame>
            </div>
          </div>

          {/* Right 7 cols: Precision Architectural Hardware Ledger */}
          <div className="divide-y divide-white/[0.08] border border-white/[0.09] bg-[#0B0B0F] lg:col-span-7">
            {filteredParts.map((part) => {
              const isSelected = activePreviewPart.id === part.id
              return (
                <div
                  key={part.id}
                  onMouseEnter={() => setActivePreviewPart(part)}
                  onClick={() => setActivePreviewPart(part)}
                  className={`flex cursor-pointer flex-col justify-between gap-5 border-l-2 p-6 transition-colors sm:flex-row sm:items-center ${
                    isSelected
                      ? 'border-l-[#D4AF37] bg-[#14141A]'
                      : 'border-l-transparent hover:bg-[#101016]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-[#D4AF37]">
                        {part.sku}
                      </span>
                      <span className="border border-white/10 bg-[#07070A] px-2 py-0.5 font-mono text-[10px] text-[#9A9992]">
                        {part.category.toUpperCase()}
                      </span>
                      <span className="font-mono text-[11px] text-[#9A9992]">
                        {part.availability}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-bold text-[#F5F4F0]">
                      {part.name}
                    </h3>

                    <p className="mt-1.5 text-sm leading-relaxed text-[#9A9992]">
                      {part.spec}
                    </p>
                    <p className="mt-2 font-mono text-xs text-[#F5F4F0]/75">
                      Fitment: {part.fitment}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span className="font-display text-2xl font-bold text-[#F5F4F0] tabular-nums">
                      ${part.price.toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAdd(part)
                      }}
                      data-agent={`add-part-${part.sku.toLowerCase()}`}
                      className="inline-flex items-center gap-2 rounded-sm border border-[#D4AF37]/40 bg-[#14141A] px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.12em] text-[#F5F4F0] uppercase transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050507] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                    >
                      {addedSku === part.sku ? (
                        <>
                          <Check size={14} weight="bold" />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} weight="bold" />
                          <span>Order Part</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
