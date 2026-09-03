'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type CartItem = {
  name: string
  price: string
  quantity: number
}

type LandingCartContextValue = {
  addItem: (item: Pick<CartItem, 'name' | 'price'>) => void
  openCart: () => void
  itemCount: number
  orderHref?: string
}

const LandingCartContext = createContext<LandingCartContextValue | null>(null)

function normalizeWhatsAppNumber(phoneNumber?: string | null) {
  if (!phoneNumber) {
    return undefined
  }

  const digits = phoneNumber.replace(/\D/g, '')

  if (!digits) {
    return undefined
  }

  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`
  }

  if (digits.startsWith('8')) {
    return `62${digits}`
  }

  return digits
}

function buildOrderMessage(items: CartItem[], message?: string | null) {
  const intro = message || 'Halo El Koffee, saya ingin memesan:'
  const orderList = items.map((item, index) => `${index + 1}. ${item.name} x${item.quantity} - ${item.price}`).join('\n')
  const total = formatRupiah(calculateCartTotal(items))

  return `${intro}\n\nDaftar pesanan:\n${orderList}\n\nTotal: ${total}`
}

function parseRupiah(price: string) {
  const value = Number(price.replace(/[^\d]/g, ''))

  return Number.isFinite(value) ? value : 0
}

function calculateCartTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + parseRupiah(item.price) * item.quantity, 0)
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)
}

type LandingCartProviderProps = {
  children: ReactNode
  message?: string | null
  phoneNumber?: string | null
}

export function LandingCartProvider({ children, message, phoneNumber }: LandingCartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const changeQuantity = (name: string, amount: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.name === name ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (name: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.name !== name))
  }

  const addItem = (item: Pick<CartItem, 'name' | 'price'>) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.name === item.name)

      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.name === item.name
            ? { ...currentItem, quantity: currentItem.quantity + 1 }
            : currentItem,
        )
      }

      return [...currentItems, { ...item, quantity: 1 }]
    })
  }

  const value = useMemo<LandingCartContextValue>(() => {
    const normalizedPhoneNumber = normalizeWhatsAppNumber(phoneNumber)
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)
    const orderHref =
      normalizedPhoneNumber && items.length
        ? `https://wa.me/${normalizedPhoneNumber}?text=${encodeURIComponent(buildOrderMessage(items, message))}`
        : undefined

    return {
      addItem,
      itemCount,
      openCart: () => setIsCartOpen(true),
      orderHref,
    }
  }, [items, message, phoneNumber])

  return (
    <LandingCartContext.Provider value={value}>
      {children}
      {isCartOpen ? (
        <div aria-modal="true" className="fixed inset-0 z-[80]" role="dialog">
          <button
            aria-label="Tutup keranjang"
            className="absolute inset-0 cursor-default bg-coffee-black/35"
            onClick={() => setIsCartOpen(false)}
            type="button"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-coffee-white shadow-[-20px_0_50px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between border-b border-coffee-muted px-6 py-5">
              <div>
                <h2 className="font-heading text-3xl text-coffee-black">Keranjang</h2>
                <p className="mt-1 text-sm text-coffee-black/50">{value.itemCount} item dipilih</p>
              </div>
              <button
                aria-label="Tutup"
                className="grid size-10 place-items-center rounded-md border border-coffee-muted text-2xl leading-none text-coffee-black transition duration-200 hover:border-coffee-primary hover:text-coffee-primary"
                onClick={() => setIsCartOpen(false)}
                type="button"
              >
                x
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length ? (
                <ul className="grid gap-4">
                  {items.map((item) => (
                    <li className="border-b border-coffee-muted pb-4 last:border-b-0" key={item.name}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-coffee-black">{item.name}</p>
                          <p className="mt-1 text-sm text-coffee-black/50">{item.price}</p>
                        </div>
                        <button
                          aria-label={`Hapus ${item.name}`}
                          className="grid size-9 shrink-0 place-items-center rounded-md border border-coffee-muted text-xl leading-none text-coffee-black transition duration-200 hover:border-coffee-primary hover:text-coffee-primary"
                          onClick={() => removeItem(item.name)}
                          type="button"
                        >
                          x
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex h-10 items-center overflow-hidden rounded-md border border-coffee-muted">
                          <button
                            aria-label={`Kurangi jumlah ${item.name}`}
                            className="grid h-full w-10 place-items-center text-xl text-coffee-black transition duration-200 hover:bg-coffee-muted/50 hover:text-coffee-primary"
                            onClick={() => changeQuantity(item.name, -1)}
                            type="button"
                          >
                            -
                          </button>
                          <span className="grid h-full min-w-12 place-items-center border-x border-coffee-muted px-3 text-base font-semibold text-coffee-black">
                            {item.quantity}
                          </span>
                          <button
                            aria-label={`Tambah jumlah ${item.name}`}
                            className="grid h-full w-10 place-items-center text-xl text-coffee-black transition duration-200 hover:bg-coffee-muted/50 hover:text-coffee-primary"
                            onClick={() => changeQuantity(item.name, 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-coffee-black/60">x{item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-heading text-3xl text-coffee-black">Keranjang kosong</p>
                    <p className="mt-3 text-base leading-7 text-coffee-black/55">
                      Pilih produk terlebih dahulu, lalu lanjutkan order lewat WhatsApp.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-coffee-muted p-6">
              {items.length ? (
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-coffee-black/60">Total</span>
                  <span className="text-2xl font-semibold text-coffee-black">{formatRupiah(calculateCartTotal(items))}</span>
                </div>
              ) : null}
              {value.orderHref ? (
                <a
                  className="grid h-14 w-full place-items-center rounded-md bg-coffee-primary px-6 font-heading text-xl uppercase text-coffee-white transition duration-200 hover:bg-coffee-primary-light"
                  href={value.orderHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Order
                </a>
              ) : (
                <button
                  className="h-14 w-full rounded-md bg-coffee-muted px-6 font-heading text-xl uppercase text-coffee-black/45"
                  disabled
                  type="button"
                >
                  Keranjang Kosong
                </button>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </LandingCartContext.Provider>
  )
}

export function useLandingCart() {
  const context = useContext(LandingCartContext)

  if (!context) {
    throw new Error('useLandingCart must be used inside LandingCartProvider')
  }

  return context
}
