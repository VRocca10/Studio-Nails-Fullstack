export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <strong>Marcia Manicure Estudio</strong>
        <p>Atendimento com horario agendado.</p>
        <span>© {currentYear} Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
