import { BRAND_CONTACT } from '../data/catalog'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#060608] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-block">
              <img
                src="/images/opulence-logo.png"
                alt="Opulence Automotive Productions LLC - The Level Above Luxury"
                className="h-32 w-auto object-contain"
              />
            </a>

            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-[#9A9992]">
              Bespoke custom automobiles, precision forged auto parts, and matched luxury capsule apparel built in black and gold.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-xs tracking-[0.16em] text-[#D4AF37] uppercase">
              Sections
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#9A9992]">
              <li>
                <a href="#flagship" className="transition-colors hover:text-[#F5F4F0]">
                  OP-01 Flagship Build
                </a>
              </li>
              <li>
                <a href="#customize" className="transition-colors hover:text-[#F5F4F0]">
                  Vehicle Configurator
                </a>
              </li>
              <li>
                <a href="#apparel" className="transition-colors hover:text-[#F5F4F0]">
                  Capsule Apparel
                </a>
              </li>
              <li>
                <a href="#parts" className="transition-colors hover:text-[#F5F4F0]">
                  Custom Auto Parts
                </a>
              </li>
              <li>
                <a href="#booking" className="transition-colors hover:text-[#F5F4F0]">
                  Atelier Booking
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.16em] text-[#D4AF37] uppercase">
              Direct Concierge
            </p>
            <div className="mt-4 space-y-2.5 text-sm text-[#9A9992]">
              <p className="font-semibold text-[#F5F4F0]">{BRAND_CONTACT.founder}</p>
              <p>
                <a
                  href={`mailto:${BRAND_CONTACT.email}`}
                  className="transition-colors hover:text-[#D4AF37]"
                >
                  {BRAND_CONTACT.email}
                </a>
              </p>
              <p>
                <a
                  href={BRAND_CONTACT.phoneHref}
                  className="font-mono transition-colors hover:text-[#D4AF37]"
                >
                  {BRAND_CONTACT.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-[#9A9992] sm:flex-row sm:items-center">
          <p>© 2026 {BRAND_CONTACT.company} All rights reserved.</p>
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#9A9992]">
            COMMISSION 01 | BLACK & GOLD EDITION
          </p>
        </div>
      </div>
    </footer>
  )
}
