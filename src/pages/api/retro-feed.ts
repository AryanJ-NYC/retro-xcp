import { NextApiHandler } from 'next';
import { SanityClient } from '../../sanity/client';

const handler: NextApiHandler = async (req, res) => {
  const sanity = new SanityClient();
  const assets = await sanity.getAssets();
  const massagedAssets = assets.reduce(
    (prev, asset) => ({
      ...prev,
      [asset.name]: {
        artists: asset.artists,
        asset: asset.name,
        img_url: sanity.urlForImageSource(asset.image).url(),
        series: asset.series,
      },
    }),
    {}
  );
  res.json(massagedAssets);
};

export default handler;
