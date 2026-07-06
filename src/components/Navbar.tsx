import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const NAV_ITEMS = [
  { label: "Services", href: "#services", hasChevron: true },
  { label: "Work", href: "#work", hasChevron: false },
  { label: "Process", href: "#process", hasChevron: false },
  { label: "Plans", href: "#plans", hasChevron: true },
] as const;

export function Navbar() {
  return (
    <header>
      <nav aria-label="Main navigation" className="flex w-full items-center justify-between px-8 py-5">
        <a href="/" className="flex items-center">
          <img src={logo} alt="Talisman Technologies" height={32} className="h-8 w-auto" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 rounded-md px-1 py-2 text-sm text-foreground/90 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
            >
              {item.label}
              {item.hasChevron && <ChevronDown className="h-4 w-4" aria-hidden="true" />}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className={cn(
            buttonVariants({ variant: "heroSecondary", size: "unset" }),
            "rounded-full px-4 py-2"
          )}
        >
          Get in Touch
        </a>
      </nav>
      <div className="mt-[3px] h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </header>
  );
}
