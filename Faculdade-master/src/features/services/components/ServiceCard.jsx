import WhatsAppLink from "../../../shared/components/ui/WhatsAppLink";

export default function ServiceCard({ service }) {
  return (
    <article className="card">
      <h3>{service.name}</h3>
      <p>{service.price}</p>

      <WhatsAppLink message={`Ola! Tenho interesse em ${service.name}`}>
        Agendar
      </WhatsAppLink>
    </article>
  );
}
