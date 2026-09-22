import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("home.testimonials.items", { returnObjects: true }) as Testimonial[];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Autoplay, pausing while the pointer is over the carousel.
  useEffect(() => {
    if (!emblaApi) return;
    let paused = false;
    const node = emblaApi.rootNode();
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    node.addEventListener("mouseenter", pause);
    node.addEventListener("mouseleave", resume);
    const id = setInterval(() => {
      if (!paused) emblaApi.scrollNext();
    }, 5000);
    return () => {
      clearInterval(id);
      node.removeEventListener("mouseenter", pause);
      node.removeEventListener("mouseleave", resume);
    };
  }, [emblaApi]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <span className="quote-mark absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none">
        &ldquo;
      </span>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div key={item.name} className="flex-[0_0_100%] px-4 sm:px-10 text-center">
              <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-foreground mb-8">
                {item.quote}
              </p>
              <p className="font-bold text-foreground text-sm">{item.name}</p>
              <p className="text-primary-700 dark:text-primary-400 text-xs uppercase tracking-luxury mt-1">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={scrollPrev}
          aria-label="Previous testimonial"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-border-strong
            text-foreground-muted hover:border-primary-700 hover:text-primary-700
            dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors"
        >
          <FiChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selected === i ? "w-6 bg-primary-700 dark:bg-primary-400" : "w-1.5 bg-border-strong"
              }`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Next testimonial"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-border-strong
            text-foreground-muted hover:border-primary-700 hover:text-primary-700
            dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
