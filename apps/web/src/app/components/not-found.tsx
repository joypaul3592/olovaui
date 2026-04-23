export default function ComponentsNotFound() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
        Page Not Found
      </h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 text-center">
        The component you&apos;re looking for doesn&apos;t exist.
      </p>
      <a
        href="/components"
        className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
      >
        Back to Components
      </a>
    </div>
  );
}
