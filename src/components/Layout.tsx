export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain min-h-screen bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      {children}
    </div>
  );
}
