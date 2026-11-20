export type ItemCategory = 'vehicle' | 'apparel' | 'parts' | 'booking'

export interface CartItem {
  id: string
  title: string
  subtitle: string
  category: ItemCategory
  unitPrice: number
  quantity: number
  image: string
  meta?: string
}

export interface FlagshipChapter {
  id: string
  index: string
  label: string
  title: string
  summary: string
  detail: string
  image: string
  imageAlt: string
  specs: Array<{ label: string; value: string }>
}

export interface CustomizerGroup {
  id: 'finish' | 'wheels' | 'interior' | 'acoustic'
  label: string
  options: Array<{
    id: string
    name: string
    detail: string
    priceDelta: number
    swatch: string
    badge: string
  }>
}

export interface ApparelItem {
  id: string
  code: string
  name: string
  fabricSpec: string
  description: string
  price: number
  image: string
  imageAlt: string
  sizes: string[]
  featured?: boolean
}

export interface AutoPartItem {
  id: string
  sku: string
  name: string
  category: 'Wheels' | 'Carbon Aero' | 'Exhaust & Brakes'
  fitment: string
  spec: string
  price: number
  availability: string
  image: string
}

export interface AtelierService {
  id: string
  title: string
  duration: string
  summary: string
  depositAmount: number
}

export const BRAND_CONTACT = {
  company: 'Opulence Automotive Productions LLC.',
  founder: 'Deshawn Lee Stampley',
  email: 'deshawn@opulenceautomiveproductions.com',
  phoneDisplay: '+1 (760) 220-4597',
  phoneHref: 'tel:+17602204597',
  deliveryWindow: '21-Day Turnkey Commissioning & Dispatch',
} as const

export const FLAGSHIP_BASE_PRICE = 248000
export const FLAGSHIP_DEPOSIT_AMOUNT = 5000

export const FLAGSHIP_CHAPTERS: FlagshipChapter[] = [
  {
    id: 'exterior',
    index: '01',
    label: 'Exterior Silhouette',
    title: 'Widebody Obsidian Carbon',
    summary:
      'Hand-finished in deep satin obsidian with autoclave forged carbon splitters, rocker extensions, and brushed champagne gold daylight trim.',
    detail:
      'Every panel on Commission 01 is hand-aligned to tight atelier tolerances. The widened front and rear track frames bespoke 21-inch forged monoblock wheels wrapped in ultra-high-performance Michelin rubber.',
    image: '/images/hero-flagship.jpg',
    imageAlt:
      'Opulence OP-01 Black Sovereign custom widebody coupe in satin obsidian black with brushed champagne gold wheels',
    specs: [
      { label: 'Chassis Serial', value: 'OAP-001 / 001' },
      { label: 'Bodywork', value: 'Satin Obsidian + Forged Carbon' },
      { label: 'Track Stance', value: '+68mm Widebody Architecture' },
    ],
  },
  {
    id: 'powertrain',
    index: '02',
    label: 'Rear Aero & Exhaust',
    title: '840 HP Twin-Turbo & Titanium',
    summary:
      'Calibrated 4.0L twin-turbo V8 paired with a custom valvetronic Grade-5 titanium exhaust exiting through quad brushed-gold tips.',
    detail:
      'An exposed forged carbon rear diffuser generates balanced high-speed downforce beneath a smoked full-width LED blade. Active valves transition instantly from quiet nocturnal cruising to raw motorsport acoustics.',
    image: '/images/flagship-rear.jpg',
    imageAlt:
      'Rear three-quarter view of Opulence OP-01 showing forged carbon rear diffuser and quad brushed-gold titanium exhaust tips',
    specs: [
      { label: 'Output', value: '840 HP / 720 LB-FT' },
      { label: '0-60 MPH', value: '2.7 Seconds' },
      { label: 'Exhaust', value: 'Valvetronic Grade-5 Titanium' },
    ],
  },
  {
    id: 'interior',
    index: '03',
    label: 'Bespoke Cockpit',
    title: 'Nero Nappa & Champagne Stitch',
    summary:
      'Diamond-quilted black Nappa leather and dark Alcantara surfaces trimmed in fine 24K-tone champagne gold contrast stitching.',
    detail:
      'The driver grips a marbled forged-carbon wheel crowned by a brushed gold 12-o-clock center ring. Warm ambient cabin illumination traces the console toward an individually engraved serialized builder plaque.',
    image: '/images/flagship-interior.jpg',
    imageAlt:
      'Opulence OP-01 cockpit showing diamond-quilted black leather seats with champagne gold stitching and forged carbon steering wheel',
    specs: [
      { label: 'Upholstery', value: 'Nero Nappa + Alcantara' },
      { label: 'Hardware', value: 'Billet Titanium & Gold Trim' },
      { label: 'Plaque', value: 'Custom Owner Monogram' },
    ],
  },
]

export const CUSTOMIZER_GROUPS: CustomizerGroup[] = [
  {
    id: 'finish',
    label: '01 / Exterior Surface',
    options: [
      {
        id: 'obsidian-satin',
        name: 'Obsidian Satin Matte',
        detail: 'Stealth micro-matte urethane clearcoat with satin carbon weave',
        priceDelta: 0,
        swatch: 'linear-gradient(135deg, #1a1a20 0%, #09090c 100%)',
        badge: 'Included',
      },
      {
        id: 'nero-gloss',
        name: 'Nero Liquid Obsidian',
        detail: 'Triple-stage deep mirror black metallic with ceramic coat',
        priceDelta: 3500,
        swatch: 'linear-gradient(135deg, #2d2d38 0%, #050507 100%)',
        badge: '+$3,500',
      },
      {
        id: 'forged-carbon',
        name: 'Full Exposed Forged Carbon',
        detail: 'Marbled raw carbon roof, hood, splitters, and side blades',
        priceDelta: 14000,
        swatch: 'linear-gradient(135deg, #3a3832 0%, #141418 55%, #d4af37 180%)',
        badge: '+$14,000',
      },
    ],
  },
  {
    id: 'wheels',
    label: '02 / Forged Wheels & Brakes',
    options: [
      {
        id: 'monoblock-lip',
        name: '21" Satin Black / Brushed Gold Lip',
        detail: 'OAP-01 multi-spoke monoblock with champagne gold 6-piston calipers',
        priceDelta: 0,
        swatch: 'linear-gradient(135deg, #121216 40%, #d4af37 100%)',
        badge: 'Included',
      },
      {
        id: 'concave-gold',
        name: '22" Full Champagne Gold + Carbon Ceramic',
        detail: 'Deep-concave forged billet centers with 410mm carbon ceramic rotors',
        priceDelta: 8800,
        swatch: 'linear-gradient(135deg, #ebd074 0%, #9c7a1c 100%)',
        badge: '+$8,800',
      },
    ],
  },
  {
    id: 'interior',
    label: '03 / Cockpit Craftsmanship',
    options: [
      {
        id: 'nappa-diamond',
        name: 'Nero Nappa + Champagne Diamond Stitch',
        detail: 'Hand-quilted leather bolsters with warm gold ambient console lighting',
        priceDelta: 0,
        swatch: 'linear-gradient(135deg, #1b1b22 0%, #2b2416 100%)',
        badge: 'Included',
      },
      {
        id: 'alcantara-track',
        name: 'Full Track Alcantara + Gold Billet Shift',
        detail: 'Motorsport suede dash, forged carbon steering ring, milled gold trim',
        priceDelta: 5200,
        swatch: 'linear-gradient(135deg, #16161b 30%, #d4af37 120%)',
        badge: '+$5,200',
      },
    ],
  },
  {
    id: 'acoustic',
    label: '04 / Acoustic & Calibration',
    options: [
      {
        id: 'valvetronic-street',
        name: 'Street Valvetronic Calibration',
        detail: 'Dual-mode ECU mapping with brushed champagne titanium exhaust tips',
        priceDelta: 0,
        swatch: 'linear-gradient(135deg, #272730 0%, #101014 100%)',
        badge: 'Included',
      },
      {
        id: 'stage-ii-ti',
        name: 'Stage II Titanium + Carbon Intake',
        detail: 'Full thin-wall titanium cat-back, forged carbon airbox, 890 HP map',
        priceDelta: 9600,
        swatch: 'linear-gradient(135deg, #d4af37 0%, #433717 100%)',
        badge: '+$9,600',
      },
    ],
  },
]

export const APPAREL_COLLECTION: ApparelItem[] = [
  {
    id: 'apparel-bomber',
    code: 'CAP-01 / OUTERWEAR',
    name: 'Sovereign Wool & Leather Bomber',
    fabricSpec: 'Italian Melton Wool + Matte Lambskin Sleeves',
    description:
      'Tailored directly around Commission 01 with brushed gold zipper hardware and chest crest embroidery.',
    price: 485,
    image: '/images/apparel-lookbook.jpg',
    imageAlt: 'Model wearing Opulence Sovereign black wool and leather bomber jacket with gold hardware beside custom coupe',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'apparel-hoodie',
    code: 'CAP-02 / KNITWEAR',
    name: 'Chassis 01 Heavyweight Hoodie',
    fabricSpec: '520 GSM Combed French Terry',
    description:
      'Boxy cropped atelier silhouette finished with milled gold drawstring aglets and geometric chest crest.',
    price: 210,
    image: '/images/apparel-hoodie.jpg',
    imageAlt: 'Obsidian black 520gsm Opulence hoodie featuring brushed gold aglets and chest crest',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'apparel-tee',
    code: 'CAP-03 / ESSENTIALS',
    name: 'Atelier Boxy Motorsport Tee',
    fabricSpec: '310 GSM Heavy Rib-Collar Cotton',
    description:
      'Garment-dyed jet black jersey engineered with thick structured mock-neck ribbing for paddock or street wear.',
    price: 115,
    image: '/images/apparel-tee-cap.jpg',
    imageAlt: 'Folded heavyweight black Opulence t-shirt paired with matte wool crest cap on dark slate',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'apparel-cap',
    code: 'CAP-04 / HEADWEAR',
    name: 'Bullion Crest 6-Panel Wool Cap',
    fabricSpec: 'Brushed Merino Wool Blend + Gold Pin',
    description:
      'Low-profile structured crown with solid brushed gold crest hardware and rear matte calfskin strap.',
    price: 75,
    image: '/images/apparel-tee-cap.jpg',
    imageAlt: 'Opulence structured black wool cap with minimalist brushed gold geometric crest pin',
    sizes: ['ONE SIZE'],
  },
]

export const CUSTOM_AUTO_PARTS: AutoPartItem[] = [
  {
    id: 'part-wheels',
    sku: 'OAP-WHL-21G',
    name: 'OAP-01 Monoblock Forged Wheel Set (4x)',
    category: 'Wheels',
    fitment: '21x10.5F / 21x12.5R Custom Offset',
    spec: 'Aerospace 6061-T6 forged aluminum, satin obsidian center with brushed champagne gold barrel.',
    price: 6800,
    availability: 'Built To Order (14 Days)',
    image: '/images/parts-hardware.jpg',
  },
  {
    id: 'part-caliper',
    sku: 'OAP-BRK-6P',
    name: 'Champagne Gold 6-Piston Big Brake Kit',
    category: 'Exhaust & Brakes',
    fitment: 'Front & Rear 410mm Two-Piece Rotors',
    spec: 'Billet monoblock calipers anodized in signature champagne gold with braided stainless lines.',
    price: 4900,
    availability: 'In Atelier Stock',
    image: '/images/parts-hardware.jpg',
  },
  {
    id: 'part-aero',
    sku: 'OAP-AER-FC1',
    name: 'Forged Carbon Splitter & Diffuser Package',
    category: 'Carbon Aero',
    fitment: 'OP-01 & Widebody Coupe Platforms',
    spec: 'Autoclave-cured marbled forged composite with UV matte shield and CNC aluminum under-trays.',
    price: 3450,
    availability: 'In Atelier Stock',
    image: '/images/parts-hardware.jpg',
  },
  {
    id: 'part-exhaust',
    sku: 'OAP-EXH-TI8',
    name: 'Valvetronic Grade-5 Titanium Exhaust',
    category: 'Exhaust & Brakes',
    fitment: 'Twin-Turbo V8 & Performance Coupes',
    spec: 'Thin-wall titanium mandrel system with remote acoustic flaps and double-wall brushed gold tips.',
    price: 5200,
    availability: 'Ready To Ship (5 Days)',
    image: '/images/flagship-rear.jpg',
  },
  {
    id: 'part-badges',
    sku: 'OAP-BLT-CR1',
    name: 'CNC Billet & Brushed Gold Emblem Suite',
    category: 'Carbon Aero',
    fitment: 'Universal Hood, Trunk & Center Caps',
    spec: '5-axis machined obsidian anodized crest frames inlaid with hand-brushed gold geometric inserts.',
    price: 420,
    availability: 'In Stock Now',
    image: '/images/parts-hardware.jpg',
  },
]

export const ATELIER_SERVICES: AtelierService[] = [
  {
    id: 'private-viewing',
    title: 'Private Flagship Viewing',
    duration: '60 MIN STUDIO SESSION',
    summary: 'In-person walkaround or live high-definition studio stream of OP-01 Black Sovereign.',
    depositAmount: 0,
  },
  {
    id: 'custom-commission',
    title: 'Custom Vehicle Commission',
    duration: '90 MIN BUILD BRIEFING',
    summary: 'Spec materials, forged hardware, and powertrain calibration directly with Deshawn.',
    depositAmount: 250,
  },
  {
    id: 'parts-install',
    title: 'Custom Parts Fitment & Install',
    duration: 'ATELIER BAY ALLOCATION',
    summary: 'Precision mounting, alignment, and road calibration for OAP forged wheels, brakes, and aero.',
    depositAmount: 250,
  },
  {
    id: 'capsule-vip',
    title: 'VIP Capsule Fitting & Pickup',
    duration: '45 MIN ATELIER APPOINTMENT',
    summary: 'Private apparel sizing session and same-day collection for serialized capsule releases.',
    depositAmount: 0,
  },
]

export const BOOKING_TIME_SLOTS = [
  '10:00 AM PST',
  '12:30 PM PST',
  '03:00 PM PST',
  '05:30 PM PST',
]
