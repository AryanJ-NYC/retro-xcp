import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
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
      <Head>
        <title>RetroXCP | Series {router.query.number}</title>
      </Head>
      <div className="grid grid-cols-3 items-baseline">
        {assets.map((a) => {
          const imageUrl =
            sanity
              .urlForImageSource(a.image)
              .auto('format')
              .height(255)
              .width(255)
              .quality(67)
              .url() ?? undefined;
          return (
            <div className="flex flex-col items-center" key={a.name}>
              <a className="text-center" href={`https://xchain.io/asset/${a.name}`}>
                <img
                  alt={`${a.name ?? 'unnamed'} asset`}
                  className="rounded-t-md"
                  height="255"
                  width="255"
                  src={imageUrl}
                />
                <p>{a.name}</p>
              </a>
              <p>by {a.artists.map((artist) => artist.name).join(', ')}</p>
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
