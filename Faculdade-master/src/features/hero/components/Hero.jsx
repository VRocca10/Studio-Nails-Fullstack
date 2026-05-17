import HeroCarousel from "./HeroCarousel";
import { HERO_SLIDES } from "../data/slides";
import WhatsAppLink from "../../../shared/components/ui/WhatsAppLink";

export default function Hero() {
  return (
    <section className="hero">
      <HeroCarousel slides={HERO_SLIDES} />
      <WhatsAppLink>Agendar pelo WhatsApp</WhatsAppLink>
    </section>
  );
}
