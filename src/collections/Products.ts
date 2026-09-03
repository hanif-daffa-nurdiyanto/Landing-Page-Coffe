import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['name', 'category', 'price', 'rating', 'sortOrder'],
    group: 'Konten Kopi',
    useAsTitle: 'name',
  },
  labels: {
    plural: 'Produk',
    singular: 'Produk',
  },
  orderable: true,
  fields: [
    {
      label: 'Nama',
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: 'Kategori',
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
    },
    {
      label: 'Gambar',
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      label: 'Penilaian',
      name: 'rating',
      type: 'number',
      defaultValue: 4.9,
      min: 0,
      max: 5,
      required: true,
    },
    {
      label: 'Jumlah Ulasan',
      name: 'reviewCount',
      type: 'number',
      defaultValue: 360,
      min: 0,
      required: true,
    },
    {
      label: 'Deskripsi',
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      label: 'Harga',
      name: 'price',
      type: 'text',
      defaultValue: 'Rp 15.000',
      required: true,
    },
    {
      label: 'Urutan',
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
