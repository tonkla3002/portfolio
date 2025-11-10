import Link from "next/link";
import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
    const isDark = stored ? stored === "dark" : prefersDark;
    setEnabled(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle("dark", next);
    document.body.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={enabled}
      aria-label="Toggle theme"
      title={enabled ? "Switch to light" : "Switch to dark"}
      className="group relative inline-flex cursor-pointer items-center tap-press focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <span
        className={
          "inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-[var(--duration-medium)] ease-[var(--ease-standard)] motion-reduce:transition-none " +
          (enabled
            ? "bg-indigo-500 border-indigo-500 hover:brightness-110"
            : "bg-zinc-200 border-zinc-300 hover:bg-black/5 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:bg-white/10")
        }
      >
        <span
          className={
            "ml-1 inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-[var(--duration-medium)] ease-[var(--ease-standard)] motion-reduce:transition-none group-active:scale-95 dark:bg-black " +
            (enabled ? "translate-x-5" : "translate-x-0")
          }
        />
      </span>
      <span className="sr-only">{enabled ? "Dark mode enabled" : "Light mode enabled"}</span>
    </button>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 dark:bg-black dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold nav-item">Tonkla</Link>
          <nav className="flex items-center gap-4">
            <Link href="/#about" className="nav-item text-sm">About</Link>
            <Link href="/#skills" className="nav-item text-sm">Skills</Link>
            <Link href="/#experience" className="nav-item text-sm">Experience</Link>
            <Link href="/#education" className="nav-item text-sm">Education</Link>
            <Link href="/#projects" className="nav-item text-sm">Projects</Link>
            <Link href="/#contact" className="nav-item text-sm">Contact</Link>
            <Link href="/Resume-Thanakorn-Wannatong.pdf" className="nav-item text-sm" target="_blank">Resume</Link>
            <DarkModeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      <footer className="mt-16 border-t px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="mx-auto max-w-5xl">© {new Date().getFullYear()} Thanakorn Wannatong</div>
      </footer>
    </div>
  );
}