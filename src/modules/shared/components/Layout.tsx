import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export const Layout: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div className="flex flex-col">
      <header className="bg-slate-200 flex justify-between py-4 px-4">
        <Link href="/">
          <a>RetroXCP</a>
        </Link>
        <Link href="/submit">
          <a>Submit</a>
        </Link>
      </header>
      <div className={clsx('bg-cyan-50 min-h-screen px-4 py-8', className)}>{children}</div>
    </div>
  );
};
