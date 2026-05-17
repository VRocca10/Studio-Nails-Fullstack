import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { user, signUpWithEmailPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    const { error: signUpError } = await signUpWithEmailPassword(email, password);
    if (signUpError) {
      setError(signUpError.message || "Nao foi possivel cadastrar.");
      setIsLoading(false);
      return;
    }

    setMessage("Cadastro realizado. Verifique seu email para confirmar a conta.");
    setIsLoading(false);
  }

  return (
    <div className="app">
      <main style={{ width: "min(520px, 100%)", margin: "2rem auto", padding: "0 1rem" }}>
        <section className="section">
          <h2>Criar Conta</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.8rem", textAlign: "left" }}>
            <label>
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", marginTop: "0.25rem" }}
              />
            </label>

            <label>
              Senha
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", marginTop: "0.25rem" }}
              />
            </label>

            {error && <p style={{ color: "#b42318", margin: 0 }}>{error}</p>}
            {message && <p style={{ color: "#0f5132", margin: 0 }}>{message}</p>}

            <button className="btn" type="submit" disabled={isLoading} style={{ border: 0, cursor: "pointer" }}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p style={{ marginTop: "1rem" }}>
            Ja tem conta? <Link to="/login">Entrar</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
