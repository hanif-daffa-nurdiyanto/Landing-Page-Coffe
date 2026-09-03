import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'sortOrder'],
    group: 'Konten Kopi',
    useAsTitle: 'name',
  },
  labels: {
    plural: 'Kategori Produk',
    singular: 'Kategori Produk',
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
      label: 'Slug',
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
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
