import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import 'nes.css/css/nes.min.css';
import '../../styles/globals.css';
import seoImg from '../../public/SEO.png';

function MyApp({ Component, pageProps }: AppProps) {
  const origin = typeof window !== 'undefined' ? window.origin : '';

  return (
    <>
      <DefaultSeo
        title="RetroXCP"
        description="A Counterparty project devoted to everything retro. We make 'em like they used to!"
        openGraph={{ images: [{ url: `${origin}${seoImg.src}` }] }}
        twitter={{
          handle: '@RetroXcp',
          cardType: 'summary_large_image',
          site: 'https://www.retro-xcp.art',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
