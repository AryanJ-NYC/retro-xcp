import type { AppProps } from 'next/app';
import 'nes.css/css/nes.min.css';
import '../../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
