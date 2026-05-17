import { useState } from "react";
import Section from "../../../shared/components/ui/Section";
import WhatsAppLink from "../../../shared/components/ui/WhatsAppLink";
import { createContact } from "../../../services/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    try {
      await createContact({ name, email, message });
      setStatus("Mensagem enviada com sucesso.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("Nao foi possivel enviar agora. Tente novamente.");
    }
  }

  return (
    <Section id="contact" title="Contato">
      <p>Entre em contato para agendar seu horario.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.8rem", maxWidth: "520px", margin: "0 auto 1rem" }}>
        <input
          required
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "0.7rem" }}
        />
        <input
          required
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.7rem" }}
        />
        <textarea
          required
          placeholder="Sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "0.7rem", minHeight: "110px" }}
        />
        <button className="btn" type="submit" style={{ border: 0, cursor: "pointer" }}>
          Enviar
        </button>
      </form>

      {status && <p>{status}</p>}

      <WhatsAppLink>Falar no WhatsApp</WhatsAppLink>
    </Section>
  );
}
