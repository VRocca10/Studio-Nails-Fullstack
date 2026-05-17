import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import Section from "../../../shared/components/ui/Section";
import { SERVICES } from "../data/services";
import { getServices } from "../../../services/api";

export default function Services() {
  const [services, setServices] = useState(SERVICES);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        if (Array.isArray(data) && data.length) setServices(data);
      } catch {
        // fallback para dados estaticos
      }
    }

    loadServices();
  }, []);

  return (
    <Section id="services" title="Servicos">
      <div className="cards">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </Section>
  );
}
