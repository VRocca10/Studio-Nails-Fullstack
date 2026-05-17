export const WHATSAPP_NUMBER = "5511995586304";

export function createWhatsAppLink(message) {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
