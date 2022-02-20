import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '../../modules/shared/components/Layout';
import { SanityClient } from '../../sanity/client';
import { Asset } from '../../sanity/types';

const SeriesPage: NextPage<Props> = ({ assets }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout>
        <p>Under Contstruction</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <NextSeo title={`Series ${router.query.number} | RetroXCP`} />
      <Head>
        <title>RetroXCP | Series {router.query.number}</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 items-baseline">
        {assets.map((a, i) => {
          const imageUrl =
            sanity.urlForImageSource(a.image).auto('format').height(255).quality(67).url() ??
            undefined;
          return (
            <div className="flex flex-col items-center space-y-0.5" key={a.name}>
              <a
                className="flex flex-col items-center text-center"
                href={`https://xchain.io/asset/${a.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt={`${a.name ?? 'unnamed'} asset`}
                  className="rounded-t-md"
                  height="255"
                  width="255"
                  src={imageUrl}
                />
                <p>{a.name}</p>
              </a>
              <p className="text-sm">by {a.artists.map((artist) => artist.name).join(', ')}</p>
              <p className="text-xs">Card {i + 1}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return { fallback: true, paths: [] };
};

const sanity = new SanityClient();
export const getStaticProps: GetStaticProps<Props, { number: string }> = async ({ params }) => {
  if (!params) throw new Error();
  const assets = await sanity.getAssetsBySeries(params.number);
  if (!assets?.length) {
    return { notFound: true };
  }

  return { props: { assets }, revalidate: 60 * 5 };
};
type Props = { assets: Asset[] };

export default SeriesPage;
