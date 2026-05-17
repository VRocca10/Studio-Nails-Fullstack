import { useEffect, useState } from "react";
import Section from "../../../shared/components/ui/Section";
import { GALLERY_IMAGES } from "../data/gallery";
import { getGallery } from "../../../services/api";

export default function Gallery() {
  const [images, setImages] = useState(GALLERY_IMAGES);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getGallery();
        if (Array.isArray(data) && data.length) setImages(data);
      } catch {
        // fallback para dados estaticos
      }
    }

    loadGallery();
  }, []);

  return (
    <Section id="gallery" title="Galeria">
      <div className="gallery">
        {images.map((image) => (
          <img key={image.id} src={image.src} alt={image.alt} />
        ))}
      </div>
    </Section>
  );
}
