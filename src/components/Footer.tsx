import logo from "@/assets/logo.png";

const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Plans", href: "#plans" },
  { label: "Contact", href: "#contact" },
] as const;

export function Footer() {
  return (
    <footer className="px-8 pb-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 pt-10 md:flex-row md:justify-between">
        <img src={logo} alt="Talisman Technologies" className="h-6 w-auto opacity-80" />
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm text-foreground/60 transition-colors hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-foreground/40">© 2026 Talisman Technologies</p>
      </div>
    </footer>
  );
}
