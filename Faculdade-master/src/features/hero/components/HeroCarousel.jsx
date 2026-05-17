import { useEffect, useState } from "react";

export default function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="hero-carousel" aria-label="Carrossel principal">
      <img
        className="hero-carousel-image"
        src={currentSlide.image}
        alt={currentSlide.alt}
      />

      <div className="hero-carousel-overlay">
        <h1>{currentSlide.title}</h1>
        <p>{currentSlide.subtitle}</p>
      </div>

      <button
        type="button"
        className="hero-carousel-control hero-carousel-control-prev"
        onClick={goToPrevious}
        aria-label="Slide anterior"
      >
        &#10094;
      </button>

      <button
        type="button"
        className="hero-carousel-control hero-carousel-control-next"
        onClick={goToNext}
        aria-label="Proximo slide"
      >
        &#10095;
      </button>

      <div className="hero-carousel-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero-carousel-dot ${
              index === currentIndex ? "is-active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
