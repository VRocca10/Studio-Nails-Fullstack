import ButtonLink from "./ButtonLink";
import { createWhatsAppLink } from "../../config/site";

export default function WhatsAppLink({ message, children, className = "" }) {
  return (
    <ButtonLink href={createWhatsAppLink(message)} className={className}>
      {children}
    </ButtonLink>
  );
}
