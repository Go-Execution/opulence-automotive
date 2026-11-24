import {
  Bank,
  CheckCircle,
  CreditCard,
  DeviceMobile,
  Minus,
  Plus,
  ShieldCheck,
  Trash,
  X,
} from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { BRAND_CONTACT, type CartItem } from '../data/catalog'

interface CheckoutDrawerProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onUpdateQty: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

type PaymentMethod = 'card' | 'express' | 'wire'

export function CheckoutDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CheckoutDrawerProps) {
  const reduceMotion = useReducedMotion()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'transport'>('transport')
  const [billingEmail, setBillingEmail] = useState('')
  const [billingName, setBillingName] = useState('')
  const [cardLastFour, setCardLastFour] = useState('4242')
  const [processing, setProcessing] = useState(false)
  const [receiptCode, setReceiptCode] = useState<string | null>(null)
  const [paidTotal, setPaidTotal] = useState<number>(0)

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const hasVehicle = items.some((item) => item.category === 'vehicle')
  const shippingFee =
    items.length === 0 ? 0 : deliveryMode === 'pickup' ? 0 : hasVehicle ? 1450 : 45
  const totalDue = subtotal + shippingFee

  const handleCompletePayment = (e: FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setProcessing(true)
    window.setTimeout(() => {
      const confirmation = `OAP-PAY-${Math.floor(100000 + Math.random() * 900000)}`
      setPaidTotal(totalDue)
      setReceiptCode(confirmation)
      setProcessing(false)
      onClearCart()
    }, 650)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Opulence Checkout and Payments"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050507]/85 backdrop-blur-sm"
          />

          <motion.aside
            initial={reduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[#0F0F14] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#D4AF37]">
                  OPULENCE DIRECT COMMERCE
                </p>
                <h2 className="font-display text-xl font-bold text-[#F5F4F0]">
                  Acquisition Bag & Payments
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                data-agent="close-bag-drawer"
                aria-label="Close checkout drawer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 bg-[#16161C] text-[#F5F4F0] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              {receiptCode ? (
                <div className="rounded-sm border border-[#D4AF37]/40 bg-[#14141A] p-6">
                  <img
                    src="/images/opulence-logo.png"
                    alt="Opulence Automotive Productions LLC"
                    className="mb-5 h-16 w-auto object-contain"
                  />
                  <div className="flex items-center gap-3">
                    <CheckCircle size={28} weight="fill" className="text-[#D4AF37]" />
                    <div>
                      <p className="font-mono text-xs tracking-[0.16em] text-[#D4AF37]">
                        PAYMENT AUTHORIZED
                      </p>
                      <h3 className="font-display text-2xl font-bold text-[#F5F4F0]">
                        Dossier {receiptCode}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#9A9992]">
                    Thank you{billingName ? `, ${billingName}` : ''}. Settlement of{' '}
                    <span className="font-mono font-semibold text-[#F5F4F0]">
                      ${paidTotal.toLocaleString()}
                    </span>{' '}
                    has been recorded for dispatch or studio allocation under {BRAND_CONTACT.company}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-white/[0.08] pt-4 text-xs text-[#9A9992]">
                    <p>
                      Payment Rail:{' '}
                      <span className="font-mono text-[#F5F4F0] uppercase">
                        {paymentMethod === 'card'
                          ? `Card ending ${cardLastFour}`
                          : paymentMethod === 'express'
                            ? 'Apple Pay Express'
                            : 'Private Wire Escrow'}
                      </span>
                    </p>
                    <p>
                      Concierge Contact:{' '}
                      <span className="font-mono text-[#F5F4F0]">{BRAND_CONTACT.email}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setReceiptCode(null)
                      onClose()
                    }}
                    className="mt-6 w-full rounded-sm bg-[#D4AF37] px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] text-[#050507] uppercase transition-all hover:bg-[#EBD074] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    Return To 3D Atelier
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-white/15 bg-[#0A0A0D] px-6 py-16 text-center">
                  <p className="font-display text-lg font-bold text-[#F5F4F0]">
                    Your Acquisition Bag Is Empty
                  </p>
                  <p className="mt-2 max-w-[34ch] text-xs leading-relaxed text-[#9A9992]">
                    Configure OP-01 Black Sovereign in 3D, add forged auto parts, or select pieces from the capsule apparel collection.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 rounded-sm border border-[#D4AF37]/40 bg-[#14141A] px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.12em] text-[#D4AF37] uppercase transition-all hover:bg-[#D4AF37] hover:text-[#050507] active:scale-[0.98]"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-sm border border-white/[0.08] bg-[#14141A] p-4"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-20 shrink-0 rounded-sm border border-white/10 object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-display text-sm font-bold text-[#F5F4F0]">
                              {item.title}
                            </p>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              aria-label={`Remove ${item.title}`}
                              className="p-1 text-[#9A9992] transition-colors hover:text-[#F5F4F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                            >
                              <Trash size={14} />
                            </button>
                          </div>

                          <p className="mt-1 text-xs leading-snug text-[#9A9992]">
                            {item.subtitle}
                          </p>
                          {item.meta && (
                            <p className="mt-1 font-mono text-[11px] text-[#D4AF37]">
                              {item.meta}
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="inline-flex items-center border border-white/10 bg-[#0B0B0F] p-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, -1)}
                                aria-label="Decrease quantity"
                                className="inline-flex h-6 w-6 items-center justify-center text-[#9A9992] hover:bg-[#16161C] hover:text-[#F5F4F0]"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="min-w-7 text-center font-mono text-xs text-[#F5F4F0] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, 1)}
                                aria-label="Increase quantity"
                                className="inline-flex h-6 w-6 items-center justify-center text-[#9A9992] hover:bg-[#16161C] hover:text-[#F5F4F0]"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="font-mono text-sm font-semibold text-[#F5F4F0] tabular-nums">
                              ${(item.unitPrice * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-sm border border-white/[0.08] bg-[#0B0B0F] p-4">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-[#D4AF37] uppercase">
                      Dispatch & Delivery Method
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryMode('transport')}
                        className={`rounded-sm border p-3 text-left text-xs transition-all active:scale-[0.98] ${
                          deliveryMode === 'transport'
                            ? 'border-[#D4AF37] bg-[#14141A] text-[#F5F4F0]'
                            : 'border-white/10 bg-[#08080B] text-[#9A9992] hover:text-[#F5F4F0]'
                        }`}
                      >
                        <p className="font-semibold">
                          {hasVehicle ? 'Enclosed Carrier ($1,450)' : 'Insured Courier ($45)'}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#9A9992]">
                          Tracked nationwide dispatch
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMode('pickup')}
                        className={`rounded-sm border p-3 text-left text-xs transition-all active:scale-[0.98] ${
                          deliveryMode === 'pickup'
                            ? 'border-[#D4AF37] bg-[#14141A] text-[#F5F4F0]'
                            : 'border-white/10 bg-[#08080B] text-[#9A9992] hover:text-[#F5F4F0]'
                        }`}
                      >
                        <p className="font-semibold">Atelier Pickup ($0)</p>
                        <p className="mt-0.5 text-[11px] text-[#9A9992]">
                          Direct handover in studio
                        </p>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleCompletePayment} className="space-y-4">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-[#D4AF37] uppercase">
                      Payment Method
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'card' as const, label: 'Card', Icon: CreditCard },
                        { id: 'express' as const, label: 'Apple Pay', Icon: DeviceMobile },
                        { id: 'wire' as const, label: 'Wire Escrow', Icon: Bank },
                      ].map(({ id, label, Icon }) => {
                        const active = paymentMethod === id
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setPaymentMethod(id)}
                            data-agent={`payment-method-${id}`}
                            className={`flex flex-col items-center gap-1.5 rounded-sm border py-3 text-xs font-medium transition-all active:scale-[0.98] ${
                              active
                                ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F4F0]'
                                : 'border-white/10 bg-[#0B0B0F] text-[#9A9992] hover:text-[#F5F4F0]'
                            }`}
                          >
                            <Icon size={18} className={active ? 'text-[#D4AF37]' : ''} />
                            <span>{label}</span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        required
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        placeholder="Cardholder / Buyer Name"
                        aria-label="Cardholder or buyer full name"
                        className="rounded-sm border border-white/15 bg-[#08080B] px-4 py-2.5 text-sm text-[#F5F4F0] placeholder:text-[#9A9992]/45 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                      />
                      <input
                        type="email"
                        required
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        placeholder="Receipt Email"
                        aria-label="Email address for receipt"
                        className="rounded-sm border border-white/15 bg-[#08080B] px-4 py-2.5 text-sm text-[#F5F4F0] placeholder:text-[#9A9992]/45 focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                      />
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          defaultValue="4532 8910 3304 4242"
                          onChange={(e) =>
                            setCardLastFour(e.target.value.replace(/\s+/g, '').slice(-4) || '4242')
                          }
                          aria-label="Card number"
                          className="col-span-2 rounded-sm border border-white/15 bg-[#08080B] px-3 py-2.5 font-mono text-xs text-[#F5F4F0] focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                        />
                        <input
                          type="text"
                          required
                          defaultValue="09/29"
                          aria-label="Expiration date"
                          className="rounded-sm border border-white/15 bg-[#08080B] px-3 py-2.5 font-mono text-xs text-[#F5F4F0] focus-visible:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                        />
                      </div>
                    )}

                    {paymentMethod === 'wire' && (
                      <div className="rounded-sm border border-[#D4AF37]/25 bg-[#0B0B0F] p-3.5 text-xs text-[#9A9992]">
                        Wire instructions and bill of sale escrow dossier issue immediately upon submitting this allocation request.
                      </div>
                    )}

                    <div className="space-y-2 border-t border-white/[0.08] pt-4 text-xs">
                      <div className="flex justify-between text-[#9A9992]">
                        <span>Subtotal</span>
                        <span className="font-mono text-[#F5F4F0] tabular-nums">
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#9A9992]">
                        <span>Logistics</span>
                        <span className="font-mono text-[#F5F4F0] tabular-nums">
                          ${shippingFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 text-base font-bold text-[#F5F4F0]">
                        <span>Total Due</span>
                        <span className="font-display text-xl text-[#D4AF37] tabular-nums">
                          ${totalDue.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={processing}
                      data-agent="complete-payment-submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#D4AF37] px-6 py-4 font-mono text-xs font-bold tracking-[0.14em] text-[#050507] uppercase transition-all hover:bg-[#EBD074] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ShieldCheck size={18} weight="bold" />
                      <span>
                        {processing
                          ? 'Authorizing Settlement...'
                          : `Complete Payment ($${totalDue.toLocaleString()})`}
                      </span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
