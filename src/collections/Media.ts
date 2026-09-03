import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  labels: {
    plural: 'Media',
    singular: 'Media',
  },
  fields: [
    {
      label: 'Teks Alternatif',
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
