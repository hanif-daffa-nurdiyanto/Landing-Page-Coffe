'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import { useLandingCart } from './LandingCart'

export type ProductCategoryView = {
  id: number | string
  name: string
  slug: string
}

export type ProductView = {
  categoryId: number | string
  description: string
  imageAlt: string
  imageUrl: string
  name: string
  price: string
  rating: number
  reviewCount: number
}

type LandingProductsProps = {
  categories: ProductCategoryView[]
  products: ProductView[]
}

export function LandingProducts({ categories, products }: LandingProductsProps) {
  const { addItem } = useLandingCart()
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id)
  const [selectedProduct, setSelectedProduct] = useState<ProductView | null>(null)

  const visibleProducts = useMemo(() => {
    return products.filter((product) => product.categoryId === activeCategory).slice(0, 4)
  }, [activeCategory, products])

  return (
    <>
      <div className="mx-auto mt-16 flex w-fit rounded-full bg-coffee-muted/45 p-2">
        {categories.map((item) => (
          <button
            aria-pressed={item.id === activeCategory}
            className={`rounded-full px-4 sm:px-6 md:px-9 py-4 text-xs sm:text-md md:text-2xl transition duration-200 ${
              item.id === activeCategory
                ? 'bg-coffee-white text-coffee-black shadow-sm'
                : 'text-coffee-black/45 hover:text-coffee-primary'
            }`}
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-4">
        {visibleProducts.map((product) => (
          <article
            className="transition duration-200 hover:-translate-y-1"
            key={product.name}
          >
            <button
              className="block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-coffee-primary/40"
              onClick={() => setSelectedProduct(product)}
              type="button"
            >
              <div className="relative h-[232px] overflow-hidden rounded-tr-[36px] rounded-bl-[36px]">
                <Image
                  alt={product.imageAlt}
                  className="h-full w-full object-cover"
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  src={product.imageUrl}
                />
              </div>

              <h3 className="mt-5 text-card-title text-coffee-black">{product.name}</h3>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xl leading-none text-coffee-star">★</span>
                <span className="text-lg font-semibold text-coffee-black">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-coffee-black/45">({product.reviewCount} Reviews)</span>
              </div>
              <p className="mt-4 text-base leading-7 text-coffee-black/50">{product.description}</p>
            </button>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-xl font-semibold text-coffee-black">{product.price}</p>
              <button
                aria-label={`Tambah ${product.name} ke keranjang`}
                className="cursor-pointer grid h-11 w-20 place-items-center rounded-md bg-coffee-primary text-4xl leading-none text-coffee-white transition duration-200 hover:bg-coffee-primary-light"
                onClick={(event) => {
                  event.stopPropagation()
                  addItem({ name: product.name, price: product.price })
                }}
                onMouseDown={(event) => event.stopPropagation()}
                onPointerDown={(event) => event.stopPropagation()}
                type="button"
              >
                <Image alt="" height={23} src="/plus.svg" width={23} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedProduct ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[70]"
          role="dialog"
        >
          <button
            aria-label="Tutup detail produk"
            className="absolute inset-0 cursor-default bg-coffee-black/35"
            onClick={() => setSelectedProduct(null)}
            type="button"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-coffee-white shadow-[-20px_0_50px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between border-b border-coffee-muted px-6 py-5">
              <h3 className="font-heading text-3xl text-coffee-black">Detail Produk</h3>
              <button
                aria-label="Tutup"
                className="grid size-10 place-items-center rounded-md border border-coffee-muted text-2xl leading-none text-coffee-black transition duration-200 hover:border-coffee-primary hover:text-coffee-primary"
                onClick={() => setSelectedProduct(null)}
                type="button"
              >
                x
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="relative h-72 overflow-hidden rounded-tr-[42px] rounded-bl-[42px]">
                <Image
                  alt={selectedProduct.imageAlt}
                  className="h-full w-full object-cover"
                  fill
                  sizes="420px"
                  src={selectedProduct.imageUrl}
                />
              </div>

              <h4 className="mt-7 font-heading text-4xl text-coffee-black">{selectedProduct.name}</h4>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xl leading-none text-coffee-star">★</span>
                <span className="text-lg font-semibold text-coffee-black">{selectedProduct.rating.toFixed(1)}</span>
                <span className="text-sm text-coffee-black/45">({selectedProduct.reviewCount} Reviews)</span>
              </div>
              <p className="mt-5 text-base leading-7 text-coffee-black/60">{selectedProduct.description}</p>
              <p className="mt-7 text-2xl font-semibold text-coffee-black">{selectedProduct.price}</p>
            </div>

            <div className="border-t border-coffee-muted p-6">
              <button
                className="h-14 w-full rounded-md bg-coffee-primary px-6 font-heading text-xl uppercase text-coffee-white transition duration-200 hover:bg-coffee-primary-light"
                onClick={() => addItem({ name: selectedProduct.name, price: selectedProduct.price })}
                type="button"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      {/* <div className="mt-10 flex justify-center gap-1.5">
        {[0, 1, 2, 3].map((dot) => (
          <span
            className={`size-2 rounded-full ${dot === 0 ? 'bg-coffee-primary' : 'bg-coffee-black/25'}`}
            key={dot}
          />
        ))}
      </div> */}
    </>
  )
}
