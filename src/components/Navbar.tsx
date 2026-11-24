import { List, ShoppingBag, X } from '@phosphor-icons/react'
import { useState } from 'react'

interface NavbarProps {
  cartCount: number
  onOpenCart: () => void
}

const NAV_LINKS = [
  { href: '#flagship', label: 'Flagship' },
  { href: '#customize', label: 'Customize' },
  { href: '#apparel', label: 'Apparel' },
  { href: '#parts', label: 'Auto Parts' },
  { href: '#booking', label: 'Atelier' },
]

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#050507]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <a
          href="#top"
          data-agent="nav-brand-home"
          className="group flex items-center py-1 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
        >
          <img
            src="/images/opulence-logo.png"
            alt="Opulence Automotive Productions LLC - The Level Above Luxury"
            className="h-[67px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-[77px]"
          />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-agent={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-1.5 py-1 font-mono text-[11px] font-medium tracking-[0.16em] text-[#9A9992] uppercase transition-colors hover:text-[#F5F4F0] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            data-agent="open-bag-drawer"
            aria-label={`Open acquisition bag with ${cartCount} items`}
            className="relative inline-flex items-center gap-2.5 rounded-sm border border-[#D4AF37]/40 bg-[#0D0D11] px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-[#F5F4F0] uppercase transition-all hover:border-[#D4AF37] hover:bg-[#16161C] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
          >
            <ShoppingBag size={15} weight="duotone" className="text-[#D4AF37]" />
            <span>Bag</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-[#D4AF37] px-1.5 font-mono text-[11px] font-bold text-[#050507] tabular-nums">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            data-agent="toggle-mobile-nav"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 bg-[#0D0D11] text-[#F5F4F0] transition-colors hover:border-[#D4AF37]/50 hover:bg-[#16161C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/[0.08] bg-[#0B0B0F] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 font-mono text-xs font-medium tracking-[0.14em] text-[#F5F4F0] uppercase transition-colors hover:bg-[#16161C] hover:text-[#D4AF37] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
