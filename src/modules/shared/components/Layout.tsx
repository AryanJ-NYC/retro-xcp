import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';

export const Layout: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <header className="bg-slate-200 flex items-center justify-between p-4">
        <Link href="/">
          <a>
            <Image
              alt="RetroXCP Logo. A SNES controller with the logo in the back"
              height={80}
              width={80}
              src="/logo.svg"
            />
          </a>
        </Link>
        <Link href="/submit">
          <a>Submit</a>
        </Link>
      </header>
      <div className={clsx('bg-cyan-50 flex flex-col flex-1 px-4 py-8', className)}>{children}</div>
      <footer className="bg-slate-200 flex justify-center p-4">
        <div className="flex text-2xl space-x-8">
          <a
            className="text-purple-500 hover:text-purple-700"
            href="https://t.me/retroid_xcp"
            rel="noreferrer"
            target="_blank"
          >
            <FaTelegramPlane />
          </a>
          <a
            className="text-purple-500 hover:text-purple-700"
            href="https://twitter.com/RetroXcp"
            rel="noreferrer"
            target="_blank"
          >
            <FaTwitter />
          </a>
        </div>
      </footer>
    </div>
  );
};
