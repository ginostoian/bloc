import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "ink" | "yellow";
  size?: "default" | "lg";
  className?: string;
  type?: "button" | "submit";
};

export function NbButton({ href, children, variant = "default", size = "default", className, type = "button" }: ButtonProps) {
  const classes = cn(
    "nb-btn",
    variant === "primary" && "nb-btn-primary",
    variant === "ink" && "nb-btn-ink",
    variant === "yellow" && "nb-btn-yellow",
    size === "lg" && "nb-btn-lg",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("nb-chip", className)}>{children}</span>;
}

export function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("placeholder", className)}>
      <span className="placeholder-label">{label}</span>
    </div>
  );
}

export function PageHeader({ chip, title, text }: { chip: string; title: string; text: string }) {
  return (
    <section className="page-grid border-b-3 border-ink py-16 md:py-20">
      <div className="wrap">
        <Chip>{chip}</Chip>
        <h1 className="display mt-6 whitespace-pre-line text-[clamp(48px,9vw,116px)]">
          {highlightOrange(title)}
        </h1>
        <p className="mt-6 max-w-[580px] text-xl leading-normal text-[#3a352f]">{text}</p>
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  dark = false,
  centered = false
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={cn(centered && "text-center")}>
      <span className={cn("eyebrow", dark ? "text-orange" : "text-orange")}>{eyebrow}</span>
      <h2 className={cn("display mt-3 whitespace-pre-line text-[clamp(40px,6vw,72px)]", dark && "text-cream")}>{title}</h2>
    </div>
  );
}

export function FeatureList({ items, light = false }: { items: readonly string[]; light?: boolean }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <span key={item} className={cn("flex items-start gap-2.5 text-[15px]", light ? "text-white" : "text-[#3a352f]")}>
          <span className="font-display text-orange">→</span>
          {item}
        </span>
      ))}
    </div>
  );
}

function highlightOrange(text: string) {
  const markers = ["promitem.", "crești online", "care livrează", "construim", "aduc clienți", "promise.", "grow online", "delivers", "build", "bring customers"];
  let output: React.ReactNode[] = [text];

  markers.forEach((marker) => {
    output = output.flatMap((part) => {
      if (typeof part !== "string" || !part.includes(marker)) return [part];
      const [before, ...rest] = part.split(marker);
      return [before, <span key={marker} className="text-orange">{marker}</span>, rest.join(marker)];
    });
  });

  return output;
}
