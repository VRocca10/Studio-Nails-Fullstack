export const WHATSAPP_NUMBER = "5511999999999";

export function createWhatsAppLink(message) {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
