const series = {
  title: 'Series',
  name: 'series',
  type: 'document',
  fields: [
    { title: 'Series Number', name: 'series', type: 'number' },
    {
      title: 'Assets',
      name: 'assets',
      type: 'array',
      of: [{ type: 'reference', name: 'asset', to: [{ type: 'asset' }] }],
    },
  ],
};

export default series;
