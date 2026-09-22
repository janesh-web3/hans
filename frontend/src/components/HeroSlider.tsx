import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface HeroSliderProps {
  images: string[];
  /** Milliseconds each slide stays on screen before crossfading to the next. */
  interval?: number;
  alt?: string;
}

/**
 * Full-bleed crossfading background slider for immersive heroes.
 * Auto-advances on a timer; pauses at a single frame when only one image is given.
 */
export default function HeroSlider({ images, interval = 6000, alt = "" }: HeroSliderProps) {
  const { dark } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: dark ? "brightness(0.32)" : "brightness(0.55)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
