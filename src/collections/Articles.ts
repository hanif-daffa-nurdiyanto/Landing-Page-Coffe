import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'author', 'publishedDate', 'createdAt'],
    group: 'Konten Kopi',
    useAsTitle: 'title',
  },
  defaultSort: '-createdAt',
  labels: {
    plural: 'Artikel',
    singular: 'Artikel',
  },
  fields: [
    {
      label: 'Judul',
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: 'Penulis',
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      label: 'Tanggal Terbit',
      name: 'publishedDate',
      type: 'text',
      defaultValue: '01 Jan2026',
      required: true,
    },
    {
      label: 'Gambar',
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
