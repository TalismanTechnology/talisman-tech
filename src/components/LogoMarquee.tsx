const BRANDS = ["Vortex", "Nimbus", "Prysma", "Cirrus", "Kynder", "Halcyn"] as const;

function BrandLogo({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <span className="liquid-glass flex h-6 w-6 items-center justify-center rounded-lg text-xs font-semibold text-foreground">
        {name[0]}
      </span>
      <span className="text-base font-semibold text-foreground">{name}</span>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="mx-auto flex w-full max-w-5xl items-center gap-12 px-8 pb-10 xl:px-0">
      <p className="shrink-0 text-sm text-foreground/50">
        Relied on by brands
        <br />
        across the globe
      </p>

      <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-16 pr-16">
          {BRANDS.map((name) => (
            <BrandLogo key={name} name={name} />
          ))}
          <div aria-hidden="true" className="contents">
            {BRANDS.map((name) => (
              <BrandLogo key={`${name}-dup`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
