export default function Section({ id, title, className = "", children }) {
  const sectionClassName = ["section", className].filter(Boolean).join(" ");

  return (
    <section id={id} className={sectionClassName}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
