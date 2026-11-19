import Link from "next/link";
import { identity } from "@/content";

const navItems = [
  { href: "#selected-work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#research", label: "Research" },
] as const;

export function SiteHeader() {
  return (
    <header className="mx-auto w-full max-w-[1440px] px-5 py-5 md:px-12 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.14em] text-amber"
        >
          {identity.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-2 md:gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-transparent px-3 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:border-border hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={identity.github}
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-sm border border-border px-3 font-mono text-xs text-blue"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}