import 'dotenv/config'

import path from 'path'
import { fileURLToPath } from 'url'

import { getPayload } from 'payload'

import config from '@/payload.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '../..')

const description = 'Kopi pilihan dengan rasa seimbang, aroma hangat, dan racikan yang cocok untuk dinikmati kapan saja.'

const mediaSources = {
  aboutShop: 'public/images/home/about-shop.jpg',
  blogBarista: 'public/images/home/blog-barista.jpg',
  blogBrewing: 'public/images/home/blog-brewing.jpg',
  blogCafe: 'public/images/home/blog-cafe.jpg',
  cafeCup: 'public/images/home/cafe-cup.png',
  coffeeBeans: 'public/images/home/coffee-beans.png',
  coffeeTools: 'public/images/home/coffee-tools.png',
  latteHands: 'public/images/home/latte-hands.png',
  latteTable: 'public/images/home/latte-table.png',
  productCaramelLatte: 'public/images/home/product-caramel-latte.jpg',
  productChocoLatte: 'public/images/home/product-choco-latte.jpg',
  productHazelnutLatte: 'public/images/home/product-hazelnut-latte.jpg',
  productMochaLatte: 'public/images/home/product-mocha-latte.jpg',
  testimonialAnnie: 'public/images/home/testimonial-annie.jpg',
  testimonialErwin: 'public/images/home/testimonial-erwin.jpg',
  testimonialMikasa: 'public/images/home/testimonial-mikasa.jpg',
}

const mediaAltTexts: Record<keyof typeof mediaSources, string> = {
  aboutShop: 'Suasana hangat di kedai El Koffee',
  blogBarista: 'Barista sedang meracik kopi',
  blogBrewing: 'Proses menyeduh kopi manual',
  blogCafe: 'Area kafe yang nyaman',
  cafeCup: 'Cangkir kopi di meja kayu',
  coffeeBeans: 'Biji kopi pilihan',
  coffeeTools: 'Peralatan seduh kopi',
  latteHands: 'Tangan memegang latte art',
  latteTable: 'Latte di atas meja kafe',
  productCaramelLatte: 'Produk karamel latte',
  productChocoLatte: 'Produk cokelat latte',
  productHazelnutLatte: 'Produk hazelnut latte',
  productMochaLatte: 'Produk moka latte',
  testimonialAnnie: 'Foto pelanggan Annie',
  testimonialErwin: 'Foto pelanggan Erwin',
  testimonialMikasa: 'Foto pelanggan Mikasa',
}

const mediaEntries = Object.entries(mediaSources) as Array<[keyof typeof mediaSources, string]>

async function main() {
  const payload = await getPayload({ config })

  const media = await mediaEntries.reduce(
    async (promise, [key, filePath]) => {
      const acc = await promise
      const alt = mediaAltTexts[key]
      const existing = await payload.find({
        collection: 'media',
        limit: 1,
        where: {
          alt: {
            equals: alt,
          },
        },
      })

      if (existing.docs[0]) {
        return { ...acc, [key]: existing.docs[0].id }
      }

      const uploaded = await payload.create({
        collection: 'media',
        data: { alt },
        filePath: path.join(rootDir, filePath),
      })

      return { ...acc, [key]: uploaded.id }
    },
    Promise.resolve({} as Record<keyof typeof mediaSources, number>),
  )

  const categorySeeds = [
    { name: 'Latte', slug: 'latte', sortOrder: 0 },
    { name: 'Robusta', slug: 'robusta', sortOrder: 1 },
    { name: 'Arabica', slug: 'arabica', sortOrder: 2 },
  ]

  const categories = await categorySeeds.reduce(
    async (promise, seed) => {
      const acc = await promise
      const existing = await payload.find({
        collection: 'product-categories',
        limit: 1,
        where: { slug: { equals: seed.slug } },
      })
      const category = existing.docs[0]
        ? await payload.update({
            collection: 'product-categories',
            id: existing.docs[0].id,
            data: seed,
          })
        : await payload.create({
            collection: 'product-categories',
            data: seed,
          })

      return { ...acc, [seed.slug]: category.id }
    },
    Promise.resolve({} as Record<string, number>),
  )

  const productSeeds = [
    ['latte', 'Cokelat Latte', media.productChocoLatte, 4.9],
    ['latte', 'Karamel Latte', media.productCaramelLatte, 4.9],
    ['latte', 'Moka Latte', media.productMochaLatte, 5.0],
    ['latte', 'Hazelnut Latte', media.productHazelnutLatte, 4.5],
    ['robusta', 'Java Robusta', media.coffeeBeans, 4.8],
    ['robusta', 'Lampung Robusta', media.coffeeTools, 4.7],
    ['robusta', 'Flores Robusta', media.cafeCup, 4.9],
    ['robusta', 'Toraja Robusta', media.latteHands, 4.6],
    ['arabica', 'Gayo Arabica', media.latteTable, 4.9],
    ['arabica', 'Kintamani Arabica', media.productChocoLatte, 4.8],
    ['arabica', 'Mandailing Arabica', media.productMochaLatte, 5.0],
    ['arabica', 'Papua Arabica', media.productHazelnutLatte, 4.7],
  ] as const

  for (const [categorySlug, name, image, rating] of productSeeds) {
    const existing = await payload.find({
      collection: 'products',
      limit: 1,
      where: { name: { equals: name } },
    })
    const data = {
      category: categories[categorySlug],
      description,
      image,
      name,
      price: 'Rp 15.000',
      rating,
      reviewCount: 360,
      sortOrder: productSeeds.findIndex((product) => product[1] === name),
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'products', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'products', data })
    }
  }

  const testimonialSeeds = [
    {
      avatar: media.testimonialAnnie,
      name: 'Annie',
      quote:
        'Kopinya selalu konsisten dan tempatnya nyaman untuk kerja singkat. Karamel latte jadi menu favorit saya setiap mampir.',
      rating: 5,
      sortOrder: 0,
    },
    {
      avatar: media.testimonialErwin,
      name: 'Erwin',
      quote:
        'Aromanya kuat, rasanya halus, dan pelayanannya ramah. El Koffee terasa seperti tempat pulang setelah hari yang panjang.',
      rating: 5,
      sortOrder: 1,
    },
    {
      avatar: media.testimonialMikasa,
      name: 'Mikasa',
      quote:
        'Saya suka pilihan bijinya. Baristanya juga mau menjelaskan rasa tiap kopi, jadi lebih mudah memilih menu yang pas.',
      rating: 5,
      sortOrder: 2,
    },
  ]

  for (const seed of testimonialSeeds) {
    const existing = await payload.find({
      collection: 'testimonials',
      limit: 1,
      where: { name: { equals: seed.name } },
    })

    if (existing.docs[0]) {
      await payload.update({ collection: 'testimonials', id: existing.docs[0].id, data: seed })
    } else {
      await payload.create({ collection: 'testimonials', data: seed })
    }
  }

  const articleSeeds = [
    {
      author: 'Sasha Blouse',
      image: media.blogBrewing,
      publishedDate: '01 Jan2026',
      title: 'Cara Menyeduh Kopi yang Lebih Nikmat di Rumah',
    },
    {
      author: 'Hanji Zoe',
      image: media.blogCafe,
      publishedDate: '01 Jan2026',
      title: 'Mengapa Suasana Kafe Membuat Kopi Terasa Lebih Hangat',
    },
    {
      author: 'Falco Grice',
      image: media.blogBarista,
      publishedDate: '01 Jan2026',
      title: 'Tips Memilih Menu Kopi Sesuai Selera',
    },
  ]

  for (const seed of articleSeeds) {
    const existing = await payload.find({
      collection: 'articles',
      limit: 1,
      where: { title: { equals: seed.title }, author: { equals: seed.author } },
    })

    if (existing.docs[0]) {
      await payload.update({ collection: 'articles', id: existing.docs[0].id, data: seed })
    } else {
      await payload.create({ collection: 'articles', data: seed })
    }
  }

  await payload.updateGlobal({
    slug: 'landing-page',
    data: {
      about: {
        ctaLabel: 'Baca Selengkapnya',
        heading: 'Mengapa Kami yang Terbaik',
        label: 'Tentang Kami',
        paragraphs: [
          {
            text: 'Kami menyajikan kopi dengan biji pilihan, racikan yang konsisten, dan suasana yang hangat untuk setiap kunjungan.',
          },
          {
            text: 'Setiap menu dirancang agar mudah dinikmati, dari espresso klasik hingga latte manis yang menjadi favorit pelanggan.',
          },
          {
            text: 'Kami percaya secangkir kopi yang baik bisa membuat hari terasa lebih dekat dan menyenangkan.',
          },
        ],
        primaryImage: media.coffeeTools,
        secondaryImage: media.aboutShop,
      },
      blogSection: {
        ctaLabel: 'Baca Selengkapnya',
        heading: 'Baca Artikel Kami',
        label: 'Blog',
      },
      footer: {
        brandName: 'El Koffee',
        description:
          'El Koffee menghadirkan kopi hangat, menu favorit, dan tempat yang nyaman untuk menikmati waktu bersama.',
        email: 'elkoffee@gmail.com',
        phone: '+62821341325',
      },
      hero: {
        ctaLabel: 'Pesan Sekarang',
        description: 'El Koffe menyediakan berbagai jenis kopi terbaik yang ada di dunia!',
        gallery: [
          { alt: 'Cangkir espresso di atas biji kopi', image: media.coffeeBeans },
          { alt: 'Peralatan kopi dengan latte art dan biji kopi', image: media.coffeeTools },
          { alt: 'Cangkir latte hangat di meja kayu kafe', image: media.cafeCup },
          { alt: 'Cangkir latte di samping tanaman kafe', image: media.latteTable },
          { alt: 'Tangan memegang cangkir latte art', image: media.latteHands },
        ],
        heading: 'Jangan Lupa Ngopi di El Koffee',
      },
      productsSection: {
        heading: 'Dari Bahan Berkualitas Terbaik',
        label: 'Produk Kami',
      },
      stats: [
        { label: 'Pelanggan Bahagia', value: '15K+' },
        { label: 'Menu Andalan', value: '30+' },
        { label: 'Penilaian Rata-rata', value: '4.9' },
      ],
      testimonialSection: {
        heading: 'Apa Kata Mereka Tentang Kami',
        label: 'Testimoni',
      },
      whatsapp: {
        message: 'Halo El Koffee, saya ingin memesan:',
        phoneNumber: '+62821341325',
      },
    },
  })

  payload.logger.info('Seed complete')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
