const asset = {
  title: 'Assets',
  name: 'asset',
  type: 'document',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    },
    { title: 'Name', name: 'name', type: 'string' },
    {
      title: 'Artists',
      name: 'artists',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'artist' } }],
    },
  ],
};

export default asset;
