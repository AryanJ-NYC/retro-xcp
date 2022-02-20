import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import 'nes.css/css/nes.min.css';
import '../../styles/globals.css';
import Head from 'next/head';
import logo from '../../public/logo.svg';

function MyApp({ Component, pageProps }: AppProps) {
  const cardImageSrc = `https://drooling-ape-bus-club.s3.amazonaws.com/Asset+1.png`;

  return (
    <>
      <DefaultSeo
        title="RetroXCP"
        description="A Counterparty project devoted to everything retro. We make 'em like they used to!"
        openGraph={{
          description:
            "A Counterparty project devoted to everything retro. We make 'em like they used to!",
          images: [{ height: 800, url: cardImageSrc, width: 800 }],
          site_name: 'RetroXCP',
          title: 'RetroXCP',
          url: 'https://www.retro-xcp.art',
        }}
        twitter={{
          handle: '@RetroXcp',
          cardType: 'summary',
          site: 'https://www.retro-xcp.art',
        }}
      />
      <Head>
        <link rel="shortcut icon" href={logo.src} type="image/x-icon" />
        <meta name="twitter:image" content={cardImageSrc} />
        <title>RetroXCP</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
