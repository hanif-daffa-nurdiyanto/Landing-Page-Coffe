import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['name', 'rating', 'sortOrder'],
    group: 'Konten Kopi',
    useAsTitle: 'name',
  },
  labels: {
    plural: 'Testimoni',
    singular: 'Testimoni',
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
      label: 'Foto Profil',
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      label: 'Penilaian',
      name: 'rating',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 5,
      required: true,
    },
    {
      label: 'Kutipan',
      name: 'quote',
      type: 'textarea',
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
