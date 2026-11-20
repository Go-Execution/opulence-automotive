import { CalendarCheck, CheckCircle, Clock, CreditCard, EnvelopeSimple, Phone } from '@phosphor-icons/react'
import { useState, type FormEvent } from 'react'
import {
  ATELIER_SERVICES,
  BOOKING_TIME_SLOTS,
  BRAND_CONTACT,
  type CartItem,
} from '../data/catalog'

interface AtelierBookingProps {
  onAddPriorityBooking: (item: CartItem) => void
}

export function AtelierBooking({ onAddPriorityBooking }: AtelierBookingProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(ATELIER_SERVICES[0].id)
  const [selectedDate, setSelectedDate] = useState('2026-11-28')
  const [selectedSlot, setSelectedSlot] = useState(BOOKING_TIME_SLOTS[1])
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [projectNotes, setProjectNotes] = useState('')
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null)

  const activeService =
    ATELIER_SERVICES.find((srv) => srv.id === selectedServiceId) ?? ATELIER_SERVICES[0]

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault()
    const code = `OAP-${Math.floor(1000 + Math.random() * 9000)}`
    setConfirmedRef(code)

    if (activeService.depositAmount > 0) {
      onAddPriorityBooking({
        id: `booking-${activeService.id}-${selectedDate}-${selectedSlot}`,
        title: `${activeService.title} (Priority Slot)`,
        subtitle: `${selectedDate} at ${selectedSlot} | ${clientName || 'Client Reservation'}`,
        meta: `Reference ${code} | Applied toward commission or hardware install`,
        category: 'booking',
        unitPrice: activeService.depositAmount,
        quantity: 1,
        image: '/images/flagship-interior.jpg',
      })
    }
  }

  return (
    <section
      id="booking"
      className="relative border-t border-white/[0.08] bg-[#050507] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 5 cols: Atelier Overview & Direct Line */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 border-l-2 border-[#D4AF37] pl-3 font-mono text-[11px] font-medium tracking-[0.2em] text-[#D4AF37] uppercase">
                PRIVATE ATELIER / BOOKING & INSTALL
              </p>

              <h2 className="font-display text-4xl font-bold tracking-tight text-[#F5F4F0] leading-none sm:text-5xl">
                Reserve Your Studio Session
              </h2>

              <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-[#9A9992] sm:text-base">
                Schedule a private walkaround of OP-01 Black Sovereign, plan a ground-up vehicle commission, or book a bay for custom parts installation.
              </p>

              <div className="mt-8 space-y-4 rounded-sm border border-white/[0.09] bg-[#0B0B0F] p-6">
                <div className="flex items-start gap-3">
                  <Clock size={20} weight="duotone" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F5F4F0]">
                      {BRAND_CONTACT.deliveryWindow}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#9A9992]">
                      Priority allocations and capsule sets ship or enter bay scheduling immediately upon deposit clearance.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-4">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#D4AF37]">
                    DIRECT CLIENT CONCIERGE
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-[#F5F4F0]">
                    {BRAND_CONTACT.founder}
                  </p>

                  <div className="mt-3 flex flex-col gap-2.5 text-sm">
                    <a
                      href={`mailto:${BRAND_CONTACT.email}`}
                      data-agent="atelier-direct-email"
                      className="inline-flex items-center gap-2.5 py-1 text-[#9A9992] transition-colors hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                    >
                      <EnvelopeSimple size={16} className="shrink-0 text-[#D4AF37]" />
                      <span className="truncate">{BRAND_CONTACT.email}</span>
                    </a>
                    <a
                      href={BRAND_CONTACT.phoneHref}
                      data-agent="atelier-direct-phone"
                      className="inline-flex items-center gap-2.5 py-1 font-mono text-[#9A9992] transition-colors hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                    >
                      <Phone size={16} className="shrink-0 text-[#D4AF37]" />
                      <span>{BRAND_CONTACT.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 cols: Interactive Scheduler Form */}
          <div className="rounded-sm border border-white/[0.09] bg-[#0B0B0F] p-6 sm:p-8 lg:col-span-7">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div>
                <p className="font-mono text-xs tracking-[0.16em] text-[#D4AF37] uppercase">
                  Select Service Or Viewing
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ATELIER_SERVICES.map((srv) => {
                    const active = srv.id === selectedServiceId
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => {
                          setSelectedServiceId(srv.id)
                          setConfirmedRef(null)
                        }}
                        data-agent={`booking-service-${srv.id}`}
                        aria-pressed={active}
                        className={`rounded-sm border p-4 text-left transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          active
                            ? 'border-[#D4AF37] bg-[#14141A]'
                            : 'border-white/[0.08] bg-[#08080B] hover:border-white/25 hover:bg-[#101016]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] tracking-[0.14em] text-[#D4AF37]">
                            {srv.duration}
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#F5F4F0]">
                            {srv.depositAmount === 0
                              ? 'Complimentary'
                              : `$${srv.depositAmount} Hold`}
                          </span>
                        </div>
                        <p className="mt-1.5 font-display text-base font-bold text-[#F5F4F0]">
                          {srv.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#9A9992]">
                          {srv.summary}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block font-mono text-xs tracking-[0.14em] text-[#9A9992] uppercase"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    required
                    value={selectedDate}
                    min="2026-11-21"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    data-agent="booking-date-input"
                    className="mt-2 w-full rounded-sm border border-white/15 bg-[#08080B] px-4 py-3 font-mono text-sm text-[#F5F4F0] transition-colors hover:border-[#D4AF37]/50 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <span className="block font-mono text-xs tracking-[0.14em] text-[#9A9992] uppercase">
                    Time Window
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {BOOKING_TIME_SLOTS.map((slot) => {
                      const active = selectedSlot === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          aria-pressed={active}
                          className={`rounded-sm border px-3 py-2.5 font-mono text-xs transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                            active
                              ? 'border-[#D4AF37] bg-[#D4AF37] font-bold text-[#050507]'
                              : 'border-white/10 bg-[#08080B] text-[#9A9992] hover:border-white/30 hover:text-[#F5F4F0]'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block font-mono text-xs tracking-[0.14em] text-[#9A9992] uppercase"
                  >
                    Full Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Alex Morgan"
                    data-agent="booking-name-input"
                    className="mt-2 w-full rounded-sm border border-white/15 bg-[#08080B] px-4 py-3 text-sm text-[#F5F4F0] placeholder:text-[#9A9992]/45 hover:border-[#D4AF37]/50 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-email"
                    className="block font-mono text-xs tracking-[0.14em] text-[#9A9992] uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@domain.com"
                    data-agent="booking-email-input"
                    className="mt-2 w-full rounded-sm border border-white/15 bg-[#08080B] px-4 py-3 text-sm text-[#F5F4F0] placeholder:text-[#9A9992]/45 hover:border-[#D4AF37]/50 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block font-mono text-xs tracking-[0.14em] text-[#9A9992] uppercase"
                  >
                    Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (760) 555-0192"
                    data-agent="booking-phone-input"
                    className="mt-2 w-full rounded-sm border border-white/15 bg-[#08080B] px-4 py-3 font-mono text-sm text-[#F5F4F0] placeholder:text-[#9A9992]/45 hover:border-[#D4AF37]/50 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-notes"
                  className="block font-mono text-xs tracking-[0.14em] text-[#9A9992] uppercase"
                >
                  Vehicle Platform Or Customization Notes
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Specify interest in OP-01 acquisition, wheel offset fitment, or apparel sizing..."
                  className="mt-2 w-full rounded-sm border border-white/15 bg-[#08080B] px-4 py-3 text-sm text-[#F5F4F0] placeholder:text-[#9A9992]/45 hover:border-[#D4AF37]/50 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                data-agent="submit-atelier-booking"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-[#D4AF37] px-6 py-4 font-mono text-xs font-bold tracking-[0.14em] text-[#050507] uppercase transition-all hover:bg-[#EBD074] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                {activeService.depositAmount > 0 ? (
                  <>
                    <CreditCard size={17} weight="bold" />
                    <span>
                      Book Priority Slot & Add ${activeService.depositAmount} Hold To Bag
                    </span>
                  </>
                ) : (
                  <>
                    <CalendarCheck size={17} weight="bold" />
                    <span>Confirm Private Atelier Appointment</span>
                  </>
                )}
              </button>

              {confirmedRef && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-sm border border-[#D4AF37]/40 bg-[#14141A] p-4"
                >
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-mono font-semibold text-[#F5F4F0]">
                      RESERVATION LOGGED: {confirmedRef}
                    </p>
                    <p className="mt-1 text-[#9A9992]">
                      {activeService.title} scheduled for {selectedDate} at {selectedSlot}.
                      {activeService.depositAmount > 0
                        ? ' Your $250 priority bay deposit is staged in your Bag for instant payment.'
                        : ' Studio concierge will send calendar credentials shortly.'}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
