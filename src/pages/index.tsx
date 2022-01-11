import type { NextPage } from 'next';
import { Layout } from '../modules/shared/components/Layout';

const Home: NextPage = () => {
  return (
    <Layout className="space-y-8">
      <p>Welcome to RetroXCP. We&apos;re just getting started!</p>
      <p>We&apos;re all about adding a retro flavor to Counterparty mascots, memes and more!</p>
      <p>
        Care to join us? Find us on{' '}
        <a
          className="cursor-pointer text-blue-400 hover:text-blue-600"
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

export default Home;
