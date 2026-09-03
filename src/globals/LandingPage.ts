import type { GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Konten Kopi',
  },
  label: 'Halaman Beranda',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Utama',
          fields: [
            {
              label: 'Bagian Utama',
              name: 'hero',
              type: 'group',
              fields: [
                {
                  label: 'Judul',
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Jangan Lupa Ngopi di El Koffee',
                  required: true,
                },
                {
                  label: 'Deskripsi',
                  name: 'description',
                  type: 'textarea',
                  defaultValue: 'El Koffe menyediakan berbagai jenis kopi terbaik yang ada di dunia!',
                  required: true,
                },
                { label: 'Teks Tombol', name: 'ctaLabel', type: 'text', defaultValue: 'Pesan Sekarang', required: true },
                {
                  label: 'Galeri',
                  name: 'gallery',
                  type: 'array',
                  labels: {
                    plural: 'Gambar Galeri',
                    singular: 'Gambar Galeri',
                  },
                  fields: [
                    { label: 'Gambar', name: 'image', type: 'upload', relationTo: 'media', required: true },
                    { label: 'Teks Alternatif', name: 'alt', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              label: 'Statistik',
              name: 'stats',
              type: 'array',
              defaultValue: [
                { label: 'Pelanggan Bahagia', value: '15K+' },
                { label: 'Menu Andalan', value: '30+' },
                { label: 'Penilaian Rata-rata', value: '4.9' },
              ],
              labels: {
                plural: 'Statistik',
                singular: 'Statistik',
              },
              fields: [
                { label: 'Nilai', name: 'value', type: 'text', required: true },
                { label: 'Label', name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Produk',
          fields: [
            {
              label: 'Bagian Produk',
              name: 'productsSection',
              type: 'group',
              fields: [
                { label: 'Label', name: 'label', type: 'text', defaultValue: 'Produk Kami', required: true },
                {
                  label: 'Judul',
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Dari Bahan Berkualitas Terbaik',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Tentang Kami',
          fields: [
            {
              label: 'Tentang Kami',
              name: 'about',
              type: 'group',
              fields: [
                { label: 'Label', name: 'label', type: 'text', defaultValue: 'Tentang Kami', required: true },
                { label: 'Judul', name: 'heading', type: 'text', defaultValue: 'Mengapa Kami yang Terbaik', required: true },
                {
                  label: 'Paragraf',
                  name: 'paragraphs',
                  type: 'array',
                  defaultValue: [
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
                  labels: {
                    plural: 'Paragraf',
                    singular: 'Paragraf',
                  },
                  fields: [{ label: 'Teks', name: 'text', type: 'textarea', required: true }],
                },
                { label: 'Teks Tombol', name: 'ctaLabel', type: 'text', defaultValue: 'Baca Selengkapnya', required: true },
                { label: 'Gambar Utama', name: 'primaryImage', type: 'upload', relationTo: 'media' },
                { label: 'Gambar Kedua', name: 'secondaryImage', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Testimoni',
          fields: [
            {
              label: 'Bagian Testimoni',
              name: 'testimonialSection',
              type: 'group',
              fields: [
                { label: 'Label', name: 'label', type: 'text', defaultValue: 'Testimoni', required: true },
                {
                  label: 'Judul',
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Apa Kata Mereka Tentang Kami',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Blog',
          fields: [
            {
              label: 'Bagian Blog',
              name: 'blogSection',
              type: 'group',
              fields: [
                { label: 'Label', name: 'label', type: 'text', defaultValue: 'Blog', required: true },
                { label: 'Judul', name: 'heading', type: 'text', defaultValue: 'Baca Artikel Kami', required: true },
                { label: 'Teks Tombol', name: 'ctaLabel', type: 'text', defaultValue: 'Baca Selengkapnya', required: true },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              label: 'Footer',
              name: 'footer',
              type: 'group',
              fields: [
                { label: 'Nama Merek', name: 'brandName', type: 'text', defaultValue: 'El Koffee', required: true },
                {
                  label: 'Deskripsi',
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'El Koffee menghadirkan kopi hangat, menu favorit, dan tempat yang nyaman untuk menikmati waktu bersama.',
                  required: true,
                },
                { label: 'Email', name: 'email', type: 'text', defaultValue: 'elkoffee@gmail.com', required: true },
                { label: 'Telepon', name: 'phone', type: 'text', defaultValue: '+62821341325', required: true },
              ],
            },
          ],
        },
        {
          label: 'WhatsApp',
          fields: [
            {
              label: 'Tombol WhatsApp',
              name: 'whatsapp',
              type: 'group',
              fields: [
                {
                  label: 'Nomor WhatsApp',
                  name: 'phoneNumber',
                  type: 'text',
                  admin: {
                    description: 'Contoh: +6281234567890, 6281234567890, atau 081234567890.',
                  },
                  defaultValue: '+62821341325',
                  required: true,
                },
                {
                  label: 'Pesan Otomatis',
                  name: 'message',
                  type: 'textarea',
                  admin: {
                    description: 'Pesan ini menjadi pembuka. Daftar pesanan dari keranjang akan ditambahkan otomatis.',
                  },
                  defaultValue: 'Halo El Koffee, saya ingin memesan:',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
