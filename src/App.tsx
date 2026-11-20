import { MotionConfig } from 'motion/react'
import { useState } from 'react'
import { ApparelCapsule } from './components/ApparelCapsule'
import { AtelierBooking } from './components/AtelierBooking'
import { AutoPartsCatalog } from './components/AutoPartsCatalog'
import { BuildConfigurator } from './components/BuildConfigurator'
import { CheckoutDrawer } from './components/CheckoutDrawer'
import { FlagshipShowcase } from './components/FlagshipShowcase'
import { Footer } from './components/Footer'
import { HeroStage } from './components/HeroStage'
import { Navbar } from './components/Navbar'
import { FLAGSHIP_BASE_PRICE, type CartItem } from './data/catalog'

export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const addToCart = (newItem: CartItem, openDrawer = false) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id)
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...prev, newItem]
    })
    if (openDrawer) {
      setDrawerOpen(true)
    }
  }

  const handleAcquireTurnkey = () => {
    addToCart(
      {
        id: 'op01-turnkey-standard',
        title: 'OP-01 Black Sovereign (Turnkey Acquisition)',
        subtitle:
          'Obsidian Satin Matte | 21" Satin Black & Gold Wheels | Nero Nappa + 840 HP V8',
        meta: 'Chassis Serial OAP-001 / 001 | Enclosed Transport Ready',
        category: 'vehicle',
        unitPrice: FLAGSHIP_BASE_PRICE,
        quantity: 1,
        image: '/images/hero-flagship.jpg',
      },
      true
    )
  }

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#050507] text-[#F5F4F0]">
        <Navbar cartCount={totalCount} onOpenCart={() => setDrawerOpen(true)} />

        <main>
          <HeroStage />
          <FlagshipShowcase onAcquireTurnkey={handleAcquireTurnkey} />
          <BuildConfigurator
            onAddConfiguredBuild={(item) => addToCart(item, true)}
          />
          <ApparelCapsule onAddItem={(item) => addToCart(item, false)} />
          <AutoPartsCatalog onAddPart={(item) => addToCart(item, false)} />
          <AtelierBooking
            onAddPriorityBooking={(item) => addToCart(item, true)}
          />
        </main>

        <Footer />

        <CheckoutDrawer
          isOpen={drawerOpen}
          items={cartItems}
          onClose={() => setDrawerOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={() => setCartItems([])}
        />
      </div>
    </MotionConfig>
  )
}

export default App
