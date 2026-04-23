import React from 'react';

interface ChangelogLayoutProps {
  children: React.ReactNode;
}

export default function ChangelogLayout({ children }: ChangelogLayoutProps) {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Changelog</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Track the latest updates and changes</p>
      </header>
      <div className="prose prose-lg dark:prose-invert mx-auto">
        {children}
      </div>
    </div>
  );
}