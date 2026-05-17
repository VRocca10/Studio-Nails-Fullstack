import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { user, signInWithEmailPassword } = useAuth();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (user) return <Navigate to={redirectTo} replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const { error: signInError } = await signInWithEmailPassword(email, password);
    if (signInError) {
      setError(signInError.message || "Credenciais invalidas.");
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className="app">
      <main style={{ width: "min(520px, 100%)", margin: "2rem auto", padding: "0 1rem" }}>
        <section className="section">
          <h2>Entrar no Studio Nails</h2>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", marginTop: "0.25rem" }}
              />
            </label>

            {error && <p style={{ color: "#b42318", margin: 0 }}>{error}</p>}

            <button className="btn" type="submit" disabled={isLoading} style={{ border: 0, cursor: "pointer" }}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p style={{ marginTop: "1rem" }}>
            Nao tem conta? <Link to="/register">Cadastrar</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
