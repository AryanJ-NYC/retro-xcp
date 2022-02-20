import sample from 'lodash/sample';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '../modules/shared/components/Layout';
import { SanityClient } from '../sanity/client';
import { Asset } from '../sanity/types';

const sanityClient = new SanityClient();
const Home: NextPage<Props> = ({ seriesToAsset }) => {
  return (
    <Layout className="space-y-8">
      {Object.entries(seriesToAsset).map(([seriesNo, asset]) => {
        const imageUrl =
          sanityClient
            .urlForImageSource(asset.image)
            .auto('format')
            .height(255)
            .quality(67)
            .url() ?? undefined;

        return (
          <Link key={seriesNo} href={`/series/${seriesNo}`}>
            <a>
              <div className="flex flex-col items-center">
                <img
                  alt={`${asset.name ?? 'unnamed'} asset`}
                  className="rounded-t-md"
                  height="255"
                  width="255"
                  src={imageUrl}
                />
                <p>Series {seriesNo}</p>
              </div>
            </a>
          </Link>
        );
      })}
      <p>Welcome to RetroXCP. We&apos;re just getting started!</p>
      <p>We&apos;re all about adding a retro flavor to Counterparty mascots, memes and more!</p>
      <p>
        Care to join us? Find us on{' '}
        <a
          className="text-blue-400 hover:text-blue-600"
          href="https://t.me/retroid_xcp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </a>
        .
      </p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const apes = await sanityClient.getAllAssetsGroupedBySeries();
  const seriesToAsset = apes.reduce((prev, curr, currI) => {
    return { [currI + 1]: sample(curr.assets), ...prev };
  }, {});
  return { props: { seriesToAsset }, revalidate: 60 * 5 };
};
type Props = {
  seriesToAsset: Record<string, Asset>;
};

export default Home;
