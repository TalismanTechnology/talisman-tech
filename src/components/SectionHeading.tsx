type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  gradientWord?: string;
  description?: string;
  id?: string;
};

const GRADIENT = "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)";

export function SectionHeading({ eyebrow, title, gradientWord, description, id }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/50">{eyebrow}</p>
      <h2
        id={id}
        className="mt-4 font-headline text-5xl font-normal leading-[1.05] tracking-[-0.02em] md:text-6xl"
      >
        <span className="text-foreground">{title}</span>
        {gradientWord && (
          <>
            {" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
              {gradientWord}
            </span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-8 text-hero-sub opacity-80">{description}</p>
      )}
    </div>
  );
}
