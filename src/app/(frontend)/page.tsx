import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { LandingCartProvider } from './LandingCart'
import { LandingProducts, type ProductCategoryView, type ProductView } from './LandingProducts'
import { SiteHeader } from './SiteHeader'
import './styles.css'

type CMSMedia = {
  alt?: string | null
  url?: string | null
}

type CMSCategory = {
  id: number | string
  name?: string | null
  slug?: string | null
}

type CMSProduct = {
  category?: CMSCategory | number | string | null
  description?: string | null
  image?: CMSMedia | number | string | null
  name?: string | null
  price?: string | null
  rating?: number | null
  reviewCount?: number | null
}

type CMSTestimonial = {
  avatar?: CMSMedia | number | string | null
  name?: string | null
  quote?: string | null
  rating?: number | null
}

type CMSArticle = {
  author?: string | null
  image?: CMSMedia | number | string | null
  publishedDate?: string | null
  title?: string | null
}

type LandingContent = {
  about?: {
    ctaLabel?: string | null
    heading?: string | null
    label?: string | null
    paragraphs?: { text?: string | null }[] | null
    primaryImage?: CMSMedia | number | string | null
    secondaryImage?: CMSMedia | number | string | null
  }
  blogSection?: {
    ctaLabel?: string | null
    heading?: string | null
    label?: string | null
  }
  footer?: {
    brandName?: string | null
    description?: string | null
    email?: string | null
    phone?: string | null
  }
  hero?: {
    ctaLabel?: string | null
    description?: string | null
    gallery?: { alt?: string | null; image?: CMSMedia | number | string | null }[] | null
    heading?: string | null
  }
  productsSection?: {
    heading?: string | null
    label?: string | null
  }
  stats?: { label?: string | null; value?: string | null }[] | null
  testimonialSection?: {
    heading?: string | null
    label?: string | null
  }
  whatsapp?: {
    message?: string | null
    phoneNumber?: string | null
  }
}

const fallbackHeroImages = [
  {
    alt: 'Espresso cup on roasted coffee beans',
    src: '/images/home/coffee-beans.png',
  },
  {
    alt: 'Coffee portafilters with latte art and beans',
    src: '/images/home/coffee-tools.png',
  },
  {
    alt: 'Warm latte cup on a wooden cafe table',
    src: '/images/home/cafe-cup.png',
  },
  {
    alt: 'Latte cups served beside cafe plants',
    src: '/images/home/latte-table.png',
  },
  {
    alt: 'Hands holding a cup of latte art',
    src: '/images/home/latte-hands.png',
  },
]

const fallbackStats = [
  {
    label: 'Happy Customers',
    value: '15K+',
  },
  {
    label: 'Signature Menus',
    value: '30+',
  },
  {
    label: 'Average Rating',
    value: '4.9',
  },
]

const fallbackCategories: ProductCategoryView[] = [
  {
    id: 'latte',
    name: 'Latte',
    slug: 'latte',
  },
  {
    id: 'robusta',
    name: 'Robusta',
    slug: 'robusta',
  },
  {
    id: 'arabica',
    name: 'Arabica',
    slug: 'arabica',
  },
]

const fallbackProducts: ProductView[] = [
  {
    categoryId: 'latte',
    description: 'Lorem ipsum dolor sit amet consectetur. Suspendisse posuere morbi curabitur rutrum.',
    imageAlt: 'Choco Latte',
    imageUrl: '/images/home/product-choco-latte.jpg',
    name: 'Choco Latte',
    price: 'Rp 15.000',
    rating: 4.9,
    reviewCount: 360,
  },
  {
    categoryId: 'latte',
    description: 'Lorem ipsum dolor sit amet consectetur. Suspendisse posuere morbi curabitur rutrum.',
    imageAlt: 'Caramel Latte',
    imageUrl: '/images/home/product-caramel-latte.jpg',
    name: 'Caramel Latte',
    price: 'Rp 15.000',
    rating: 4.9,
    reviewCount: 360,
  },
  {
    categoryId: 'latte',
    description: 'Lorem ipsum dolor sit amet consectetur. Suspendisse posuere morbi curabitur rutrum.',
    imageAlt: 'Mocha Latte',
    imageUrl: '/images/home/product-mocha-latte.jpg',
    name: 'Mocha Latte',
    price: 'Rp 15.000',
    rating: 5,
    reviewCount: 360,
  },
  {
    categoryId: 'latte',
    description: 'Lorem ipsum dolor sit amet consectetur. Suspendisse posuere morbi curabitur rutrum.',
    imageAlt: 'Hazelnut Latte',
    imageUrl: '/images/home/product-hazelnut-latte.jpg',
    name: 'Hazelnut Latte',
    price: 'Rp 15.000',
    rating: 4.5,
    reviewCount: 360,
  },
]

const fallbackTestimonials = [
  {
    avatar: '/images/home/testimonial-annie.jpg',
    name: 'Annie',
    quote:
      'Lorem ipsum dolor sit amet consectetur. Adipiscing fringilla nascetur mauris nunc bibendum sed vulputate dolor. Integer sit est urna in duis pellentesque fringilla. Gravida hendrerit eu neque malesuada lacus.',
  },
  {
    avatar: '/images/home/testimonial-erwin.jpg',
    name: 'Erwin',
    quote:
      'Lorem ipsum dolor sit amet consectetur. Adipiscing fringilla nascetur mauris nunc bibendum sed vulputate dolor. Integer sit est urna in duis pellentesque.',
  },
  {
    avatar: '/images/home/testimonial-mikasa.jpg',
    name: 'Mikasa',
    quote:
      'Lorem ipsum dolor sit amet consectetur. Adipiscing fringilla nascetur mauris nunc bibendum sed vulputate dolor. Integer sit est urna in duis pellentesque fringilla. Gravida hendrerit eu neque malesuada lacus.',
  },
]

const fallbackArticles = [
  {
    author: 'Sasha Blouse',
    date: '01 Jan2026',
    image: '/images/home/blog-brewing.jpg',
    title: 'Lorem ipsum dolor sit amet consectetur. Nibh non iaculis dui elit neque vitae',
  },
  {
    author: 'Hanji Zoe',
    date: '01 Jan2026',
    image: '/images/home/blog-cafe.jpg',
    title: 'Lorem ipsum dolor sit amet consectetur. Nibh non iaculis dui elit neque vitae',
  },
  {
    author: 'Falco Grice',
    date: '01 Jan2026',
    image: '/images/home/blog-barista.jpg',
    title: 'Lorem ipsum dolor sit amet consectetur. Nibh non iaculis dui elit neque vitae',
  },
]

const fallbackLanding: LandingContent = {
  about: {
    ctaLabel: 'Baca Selengkapnya',
    heading: 'Why we are the best',
    label: 'About us',
    paragraphs: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur. Vitae vitae viverra elementum aenean ac diam. Tincidunt in non nullam volutpat hendrerit. Lobortis diam lobortis aliquet nunc. Nam quis nibh sit nunc ipsum pellentesque et. Proin ut auctor sed venenatis venenatis facilisi.',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur. Adipiscing fringilla nascetur mauris nunc bibendum sed vulputate dolor. Integer sit est urna in duis pellentesque fringilla. Gravida hendrerit eu neque malesuada lacus.',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur. Adipiscing fringilla nascetur mauris nunc bibendum sed vulputate dolor.',
      },
    ],
  },
  blogSection: {
    ctaLabel: 'Read More',
    heading: 'Read our articles',
    label: 'Blog',
  },
  footer: {
    brandName: 'El Koffee',
    description:
      'Lorem ipsum dolor sit amet consectetur. Tellus phasellus diam non mauris ac ut quis. Hendrerit semper tellus posuere hendrerit amet.',
    email: 'elkoffee@gmail.com',
    phone: '+62821341325',
  },
  hero: {
    ctaLabel: 'Pesan Sekarang',
    description: 'El Koffe menyediakan berbagai jenis kopi terbaik yang ada di dunia!',
    heading: 'Jangan Lupa Ngopi di El Koffee',
  },
  productsSection: {
    heading: 'From Top Quality Materials',
    label: 'Our Products',
  },
  stats: fallbackStats,
  testimonialSection: {
    heading: 'What they say about us',
    label: 'Testimonial',
  },
  whatsapp: {
    message: 'Halo El Koffee, saya ingin bertanya tentang menu kopi.',
    phoneNumber: '+62821341325',
  },
}

function mediaUrl(media: CMSMedia | number | string | null | undefined, fallback: string) {
  return typeof media === 'object' && media?.url ? media.url : fallback
}

function mediaAlt(media: CMSMedia | number | string | null | undefined, fallback: string) {
  return typeof media === 'object' && media?.alt ? media.alt : fallback
}

function categoryId(category: CMSCategory | number | string | null | undefined) {
  if (!category) {
    return undefined
  }

  return typeof category === 'object' ? category.id : category
}

function CursorIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <Image alt="" className={className} height={30} src="/arrow-click.svg" width={30} />
  )
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div aria-label={`${rating} star rating`} className="flex items-center gap-1 text-coffee-star">
      {Array.from({ length: 5 }).map((_, index) => (
        <span className="text-xl leading-none" key={index}>
          {index < Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2.5 17.3c.8-3.2 3.7-5.5 7.5-5.5s6.7 2.3 7.5 5.5c.1.4-.2.7-.6.7H3.1c-.4 0-.7-.3-.6-.7Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1.5A1.5 1.5 0 0 1 18 5.5V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 17V5.5A1.5 1.5 0 0 1 3.5 4H5V3a1 1 0 0 1 1-1Zm10 7H4v7.5h12V9Z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path d="m7.5 4.5 5 5.5-5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="size-7 md:size-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.1 4.9A9.9 9.9 0 0 0 3.6 16.8L2.2 22l5.3-1.4A9.9 9.9 0 0 0 22 11.9a9.8 9.8 0 0 0-2.9-7Zm-7.1 15a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3a8.1 8.1 0 1 1 7 3.9Zm4.5-6.1c-.2-.1-1.5-.8-1.8-.8s-.4-.1-.6.2-.7.8-.8 1-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.5 11.2 11.2 0 0 0 4.3 3.8 14.3 14.3 0 0 0 1.4.5 3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}

function whatsappHref(phoneNumber?: string | null, message?: string | null) {
  if (!phoneNumber) {
    return undefined
  }

  const digits = phoneNumber.replace(/\D/g, '')
  const normalizedPhoneNumber = digits.startsWith('0') ? `62${digits.slice(1)}` : digits.startsWith('8') ? `62${digits}` : digits

  if (!normalizedPhoneNumber) {
    return undefined
  }

  const text = message ? `?text=${encodeURIComponent(message)}` : ''

  return `https://wa.me/${normalizedPhoneNumber}${text}`
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [landingData, categoriesData, productsData, testimonialsData, articlesData] = await Promise.all([
    payload.findGlobal({ slug: 'landing-page', depth: 2 }),
    payload.find({ collection: 'product-categories', depth: 0, limit: 20, sort: '_order' }),
    payload.find({ collection: 'products', depth: 2, limit: 100, sort: '_order' }),
    payload.find({ collection: 'testimonials', depth: 2, limit: 6, sort: '_order' }),
    payload.find({ collection: 'articles', depth: 2, limit: 3, sort: '-createdAt' }),
  ])

  const landing = { ...fallbackLanding, ...(landingData as LandingContent) }
  const heroImages = landing.hero?.gallery?.length
    ? landing.hero.gallery.map((item, index) => ({
        alt: item.alt || mediaAlt(item.image, fallbackHeroImages[index]?.alt || 'El Koffee coffee'),
        src: mediaUrl(item.image, fallbackHeroImages[index]?.src || '/images/home/coffee-beans.png'),
      }))
    : fallbackHeroImages
  const stats = landing.stats?.length ? landing.stats : fallbackStats
  const categories: ProductCategoryView[] = categoriesData.docs.length
    ? categoriesData.docs.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      }))
    : fallbackCategories
  const products: ProductView[] = productsData.docs.length
    ? (productsData.docs as CMSProduct[]).map((product, index) => ({
        categoryId: categoryId(product.category) || categories[0]?.id || 'latte',
        description: product.description || fallbackProducts[index % fallbackProducts.length].description,
        imageAlt: mediaAlt(product.image, product.name || 'Coffee product'),
        imageUrl: mediaUrl(product.image, fallbackProducts[index % fallbackProducts.length].imageUrl),
        name: product.name || fallbackProducts[index % fallbackProducts.length].name,
        price: product.price || fallbackProducts[index % fallbackProducts.length].price,
        rating: product.rating ?? fallbackProducts[index % fallbackProducts.length].rating,
        reviewCount: product.reviewCount ?? fallbackProducts[index % fallbackProducts.length].reviewCount,
      }))
    : fallbackProducts
  const testimonials = testimonialsData.docs.length
    ? (testimonialsData.docs as CMSTestimonial[]).map((testimonial, index) => ({
        avatar: mediaUrl(
          testimonial.avatar,
          fallbackTestimonials[index % fallbackTestimonials.length]?.avatar || '/images/home/testimonial-annie.jpg',
        ),
        name: testimonial.name || fallbackTestimonials[index % fallbackTestimonials.length]?.name || 'Customer',
        quote: testimonial.quote || fallbackTestimonials[index % fallbackTestimonials.length]?.quote || '',
        rating: testimonial.rating ?? 5,
      }))
    : fallbackTestimonials.map((testimonial) => ({ ...testimonial, rating: 5 }))
  const articles = articlesData.docs.length
    ? (articlesData.docs as CMSArticle[]).map((article, index) => ({
        author: article.author || fallbackArticles[index % fallbackArticles.length]?.author || 'El Koffee',
        date: article.publishedDate || fallbackArticles[index % fallbackArticles.length]?.date || '01 Jan2026',
        image: mediaUrl(
          article.image,
          fallbackArticles[index % fallbackArticles.length]?.image || '/images/home/blog-brewing.jpg',
        ),
        title: article.title || fallbackArticles[index % fallbackArticles.length]?.title || 'El Koffee article',
      }))
    : fallbackArticles
  const aboutParagraphs = landing.about?.paragraphs?.length
    ? landing.about.paragraphs
    : fallbackLanding.about?.paragraphs || []
  const whatsappLink = whatsappHref(
    landing.whatsapp?.phoneNumber || fallbackLanding.whatsapp?.phoneNumber,
    landing.whatsapp?.message || fallbackLanding.whatsapp?.message,
  )

  return (
    <LandingCartProvider
      message={landing.whatsapp?.message || fallbackLanding.whatsapp?.message}
      phoneNumber={landing.whatsapp?.phoneNumber || fallbackLanding.whatsapp?.phoneNumber}
    >
      <div className="min-h-screen bg-coffee-white pt-[77px] text-coffee-black">
        <SiteHeader />
      {whatsappLink ? (
        <a
          aria-label="Hubungi El Koffee lewat WhatsApp"
          className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 md:bottom-8 md:right-8 md:size-16"
          href={whatsappLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppIcon />
        </a>
      ) : null}

      <section className="overflow-hidden pb-0 pt-12 md:pb-24 md:pt-4">
        <div className="mx-auto flex max-w-site flex-col items-center px-6 md:px-20">
          <h1 className="max-w-180 text-center font-heading text-[44px] font-medium leading-[1.08] text-coffee-black md:text-hero">
            {landing.hero?.heading}
          </h1>

          <p className="mt-5 max-w-162.5 text-center text-xl leading-relaxed text-coffee-black md:mt-6 md:text-body-lead">
            {landing.hero?.description}
          </p>

          <a
            className="group mt-10 inline-flex h-15.5 min-w-[320px] items-center justify-center gap-6 rounded-bl-button rounded-tr-button bg-coffee-primary px-9 font-heading text-button uppercase text-coffee-white transition duration-200 hover:bg-coffee-primary-light focus:outline-none focus:ring-2 focus:ring-coffee-primary/40 focus:ring-offset-2 focus:ring-offset-coffee-white md:mt-10.5"
            href="#order"
          >
            {landing.hero?.ctaLabel}
            <CursorIcon className="size-8 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <div className="hidden mt-20 w-full gap-5 overflow-x-auto pb-4 md:mt-19.75 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
            {heroImages.map((image) => (
              <div className="relative h-70 min-w-46 md:h-90.5 md:min-w-0" key={image.src}>
                <Image
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  fill
                  priority
                  sizes="(min-width: 768px) 18vw, 184px"
                  src={image.src}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-20 mb-20 md:hidden flex w-full gap-5 overflow-x-auto pb-4 md:mt-19.75 px-6 [&::-webkit-scrollbar]:hidden">
        {heroImages.map((image) => (
          <div className="relative h-70 min-w-46 md:h-90.5 md:min-w-0" key={image.src}>
            <Image
              alt={image.alt}
              className="h-full w-full object-cover"
              fill
              priority
              sizes="(min-width: 768px) 18vw, 184px"
              src={image.src}
            />
          </div>
        ))}
      </div>

      <section className="border-t border-b  border-coffee-muted py-16 md:py-20 w-fit m-auto">
        <div className="mx-auto grid max-w-site  px-6 text-center md:grid-cols-3">
          {stats.map((stat) => (
            <div className="border-coffee-muted flex-1 px-20 py-8 md:py-0 md:border-l md:first:border-l-0" key={stat.label}>
              <p className="font-heading text-stat text-coffee-black">{stat.value}</p>
              <p className="mt-3 text-eyebrow uppercase text-coffee-primary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20 md:px-20 md:py-24" id="products">
        <div className="text-center">
          <p className="text-section-label text-coffee-black">{landing.productsSection?.label}</p>
          <h2 className="mt-5 font-heading text-section-title text-coffee-black">
            {landing.productsSection?.heading}
          </h2>
        </div>

        <LandingProducts categories={categories} products={products} />
      </section>

      <section className="mx-auto max-w-site border-t border-coffee-muted px-6 py-20 md:px-20 md:py-24" id="about-us">
        <div className="text-center">
          <p className="text-section-label text-coffee-black">{landing.about?.label}</p>
          <h2 className="mt-5 font-heading text-section-title text-coffee-black">{landing.about?.heading}</h2>
        </div>

        <div className="mt-20 grid items-center gap-12 md:grid-cols-[1fr_626px]">
          <div className="text-body-copy text-coffee-black">
            {aboutParagraphs.map((paragraph, index) => (
              <p className={index > 0 ? 'mt-8' : undefined} key={`${paragraph.text}-${index}`}>
                {paragraph.text}
              </p>
            ))}

            <a
              className="group mt-8 inline-flex h-[62px] min-w-[288px] items-center justify-center gap-5 rounded-bl-button rounded-tr-button bg-coffee-primary px-7 font-heading text-xl uppercase text-coffee-white transition duration-200 hover:bg-coffee-primary-light"
              href="#blog"
            >
              {landing.about?.ctaLabel}
              <CursorIcon className="size-8 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative h-[396px] overflow-hidden rounded-br-[42px]">
              <Image
                alt="Coffee tools and beans"
                className="h-full w-full object-cover"
                fill
                sizes="(min-width: 768px) 302px, 100vw"
                src={mediaUrl(landing.about?.primaryImage, '/images/home/coffee-tools.png')}
              />
            </div>
            <div className="relative h-[396px] overflow-hidden rounded-tr-[42px]">
              <Image
                alt="El Koffee bar interior"
                className="h-full w-full object-cover"
                fill
                sizes="(min-width: 768px) 302px, 100vw"
                src={mediaUrl(landing.about?.secondaryImage, '/images/home/about-shop.jpg')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site border-t border-coffee-muted px-6 py-20 md:px-20 md:py-24" id="testimonial">
        <div className="text-center">
          <p className="text-section-label text-coffee-black">{landing.testimonialSection?.label}</p>
          <h2 className="mt-5 font-heading text-section-title text-coffee-black">
            {landing.testimonialSection?.heading}
          </h2>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-20">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name}>
              <div className="flex items-center gap-6">
                <Image
                  alt={testimonial.name}
                  className="size-[100px] rounded-full object-cover"
                  height={100}
                  src={testimonial.avatar}
                  width={100}
                />
                <div>
                  <h3 className="text-lg font-semibold text-coffee-black">{testimonial.name}</h3>
                  <div className="mt-3">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>
              <p className="mt-9 text-body-copy text-coffee-black">{testimonial.quote}</p>
            </article>
          ))}
        </div>

        {/* <div className="mt-20 flex justify-center gap-1.5">
          {[0, 1, 2, 3].map((dot) => (
            <span
              className={`size-2 rounded-full ${dot === 0 ? 'bg-coffee-primary' : 'bg-coffee-black/25'}`}
              key={dot}
            />
          ))}
        </div> */}
      </section>

      <section className="mx-auto max-w-site border-t border-coffee-muted px-6 py-20 md:px-20 md:py-24" id="blog">
        <div className="text-center">
          <p className="text-section-label text-coffee-black">{landing.blogSection?.label}</p>
          <h2 className="mt-5 font-heading text-section-title text-coffee-black">{landing.blogSection?.heading}</h2>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <article className="border border-coffee-muted p-3 rounded-tr-[64px] rounded-bl-[64px]" key={article.author}>
              <div className="relative h-[329px] overflow-hidden rounded-tr-[52px] rounded-bl-[52px]">
                <Image
                  alt={article.title}
                  className="h-full w-full object-cover"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={article.image}
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 text-sm text-coffee-black">
                <span className="inline-flex items-center gap-2">
                  <UserIcon />
                  {article.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarIcon />
                  {article.date}
                </span>
              </div>
              <h3 className="mt-4 text-card-title text-coffee-black">{article.title}</h3>
              <a className="mt-5 flex items-center justify-end gap-3 text-base text-coffee-black" href="#blog">
                View Details
                <ArrowRightIcon />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a
            className="group inline-flex h-[72px] min-w-[256px] items-center justify-center gap-6 rounded-bl-button rounded-tr-button bg-coffee-primary px-10 font-heading text-button uppercase text-coffee-white transition duration-200 hover:bg-coffee-primary-light"
            href="#blog"
          >
            {landing.blogSection?.ctaLabel}
            <CursorIcon className="mt-1 size-8 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <footer className="bg-coffee-primary px-6 py-16 text-coffee-white md:px-20 md:py-24">
        <div className="mx-auto grid max-w-site gap-12 md:grid-cols-[1.45fr_0.65fr_0.75fr_0.65fr]">
          <div>
            <div className="flex items-center gap-5">
              <Image
                alt=""
                className="brightness-0 invert"
                height={50}
                src="/icon.svg"
                width={65}
              />
              <p className="text-4xl font-semibold">{landing.footer?.brandName}</p>
            </div>
            <p className="mt-7 max-w-[410px] text-xl leading-tight">
              {landing.footer?.description}
            </p>
            <p className="mt-7 text-xl leading-tight">
              Email : {landing.footer?.email}
              <br />
              Phone : {landing.footer?.phone}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-4xl">Quick Links</h2>
            <ul className="mt-9 space-y-5 text-xl">
              {['Products', 'About Us', 'Testimonial', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-4xl">Resources</h2>
            <ul className="mt-9 space-y-5 text-xl">
              {['Support', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <a href="#resources">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-4xl">Social Media</h2>
            <div className="mt-10 flex gap-4">
              {['IG', 'f', 'in'].map((item) => (
                <a
                  aria-label={item === 'IG' ? 'Instagram' : item === 'f' ? 'Facebook' : 'LinkedIn'}
                  className="grid size-12 place-items-center rounded-md bg-coffee-white/20 text-2xl font-bold text-coffee-white"
                  href="#social"
                  key={item}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      </div>
    </LandingCartProvider>
  )
}
