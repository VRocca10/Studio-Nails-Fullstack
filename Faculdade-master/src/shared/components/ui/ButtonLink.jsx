export default function ButtonLink({
  href,
  children,
  className = "",
  target = "_blank",
  rel = "noreferrer",
}) {
  const buttonClassName = ["btn", className].filter(Boolean).join(" ");

  return (
    <a href={href} target={target} rel={rel} className={buttonClassName}>
      {children}
    </a>
  );
}
