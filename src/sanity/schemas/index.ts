// @ts-expect-error
import schemaTypes from 'all:part:@sanity/base/schema-type'; // eslint-disable-line
// @ts-expect-error
import createSchema from 'part:@sanity/base/schema-creator'; // eslint-disable-line

import artist from './types/artist';
import asset from './types/asset';
import series from './types/series';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([artist, asset, series]),
});
