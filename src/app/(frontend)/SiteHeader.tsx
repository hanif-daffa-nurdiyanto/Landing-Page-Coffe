'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useLandingCart } from './LandingCart'

const navigationItems = ['Products', 'About Us', 'Testimonial', 'Blog']

function CartIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M5.4 7.4h13.2v12.1H5.4V7.4ZM9 7.4a3 3 0 0 1 6 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M9.1 11.1c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      {isOpen ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      )}
    </svg>
  )
}

export function SiteHeader() {
  const { itemCount, openCart } = useLandingCart()
  const [isOpen, setIsOpen] = useState(false)

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  const cartButtonClassName =
    'relative grid size-6 place-items-center transition duration-200 hover:text-coffee-primary sm:grid'
  const mobileCartButtonClassName =
    'relative grid size-10 place-items-center rounded-md border border-coffee-muted transition duration-200 hover:border-coffee-primary hover:text-coffee-primary'
  const cartLabel = itemCount ? `Buka keranjang, ${itemCount} item` : 'Buka keranjang'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-coffee-muted/70 bg-coffee-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-[77px] max-w-site items-center justify-between px-6 md:px-20">
        <Link aria-label="El Koffee home" href="/" onClick={() => setIsOpen(false)}>
          <Image
            alt=""
            className="h-auto w-[39px]"
            height={29}
            priority
            src="/icon.svg"
            width={38}
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-[58px] md:flex">
          {navigationItems.map((item) => (
            <Link
              className="text-nav text-coffee-black transition duration-200 hover:text-coffee-primary"
              href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-coffee-black">
          <button
            aria-label={cartLabel}
            className={cartButtonClassName}
            onClick={() => {
              if (itemCount) {
                openCart()
              } else {
                scrollToProducts()
              }
            }}
            type="button"
          >
            <CartIcon />
            {itemCount ? (
              <span className="absolute -right-2 -top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-coffee-primary px-1 text-[10px] font-semibold leading-none text-coffee-white">
                {itemCount}
              </span>
            ) : null}
          </button>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            className="grid size-10 place-items-center rounded-md border border-coffee-muted text-coffee-black transition duration-200 hover:border-coffee-primary hover:text-coffee-primary md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute left-6 right-6 top-[68px] border border-coffee-muted bg-coffee-white p-5 shadow-lg md:hidden"
            id="mobile-navigation"
          >
            <nav aria-label="Mobile navigation" className="grid gap-4">
              {navigationItems.map((item) => (
                <Link
                  className="text-nav text-coffee-black transition duration-200 hover:text-coffee-primary"
                  href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                  key={item}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex items-center gap-4 border-t border-coffee-muted pt-5">
              <button
                aria-label={cartLabel}
                className={mobileCartButtonClassName}
                onClick={() => {
                  if (itemCount) {
                    openCart()
                    setIsOpen(false)
                  } else {
                    scrollToProducts()
                  }
                }}
                type="button"
              >
                <CartIcon />
                {itemCount ? (
                  <span className="absolute -right-2 -top-2 grid min-h-5 min-w-5 place-items-center rounded-full bg-coffee-primary px-1 text-xs font-semibold leading-none text-coffee-white">
                    {itemCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
