import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "mercury";

type ButtonOwnProps = {
  variant?: Variant;
  children: React.ReactNode;
};

type AsAnchor = ButtonOwnProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    keyof ButtonOwnProps
  >;

type AsButton = ButtonOwnProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof ButtonOwnProps
  >;

type ButtonProps = AsAnchor | AsButton;

const base: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: 3,
  textTransform: "uppercase",
  textDecoration: "none",
  borderRadius: 0,
  padding: "14px 32px",
  cursor: "pointer",
  transition: "background .25s var(--ease), color .25s var(--ease), border-color .25s var(--ease)",
};

const variants: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "var(--ink)",
    color: "var(--mercury)",
    border: "1px solid var(--ink)",
  },
  secondary: {
    background: "transparent",
    color: "var(--ink)",
    border: "1px solid var(--ink)",
  },
  mercury: {
    background: "var(--mercury)",
    color: "var(--ink)",
    border: "1px solid var(--mercury)",
  },
};

export default function Button({
  variant = "primary",
  children,
  ...rest
}: ButtonProps) {
  const style = { ...base, ...variants[variant] };

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as AsAnchor;
    return (
      <a href={href} style={style} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button style={style} {...(rest as Omit<AsButton, "variant" | "children">)}>
      {children}
    </button>
  );
}
