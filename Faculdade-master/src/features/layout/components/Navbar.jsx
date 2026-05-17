import { NAV_LINKS } from "../../navigation/data/navigation";
import logoMark from "../../../shared/assets/logo-mark.svg";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="brand">
        <img src={logoMark} alt="Logo Marcia Manicure" className="brand-logo" />
        <div className="brand-text">
          <strong>Marcia Manicure</strong>
          <span>Estudio</span>
        </div>
      </div>
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        <li>
          <button type="button" className="nav-logout" onClick={handleLogout}>
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}
