import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryHeroProps { name: string; category: string; images: string[] }

export default function GalleryHero({ name, category, images }: GalleryHeroProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const photos = images.filter(Boolean);
  const change = (direction: number) => setActiveImage((current) => (current + direction + photos.length) % photos.length);

  return (
    <>
      <section className="relative h-[58vh] min-h-[420px] max-h-[760px] overflow-hidden bg-slate-200 dark:bg-slate-800 sm:h-[68vh]">
        {photos.length ? (
          <>
            <div className={`absolute inset-0 hidden gap-2 md:grid ${photos.length > 1 ? "grid-cols-[1.5fr_1fr]" : "grid-cols-1"}`}>
              <button type="button" onClick={() => { setActiveImage(0); setLightboxOpen(true); }} className="group relative h-full overflow-hidden text-left">
                <img src={photos[0]} alt={`${name} — featured view`} className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]" />
              </button>
              {photos.length > 1 && <div className={`grid gap-2 overflow-hidden ${photos.length === 2 ? "grid-cols-1 grid-rows-1" : photos.length === 3 ? "grid-cols-2 grid-rows-1" : "grid-cols-2 grid-rows-2"}`}>
                {photos.slice(1, 5).map((photo, offset) => {
                  const index = offset + 1;
                  return <button key={`${photo}-${index}`} type="button" onClick={() => { setActiveImage(index); setLightboxOpen(true); }} className="group relative min-h-0 overflow-hidden">
                    <img src={photo} alt={`${name} photo ${index + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    {offset === 3 && photos.length > 5 && <span className="absolute inset-0 grid place-items-center bg-slate-950/55 text-sm font-medium text-white">+{photos.length - 5} more</span>}
                  </button>;
                })}
              </div>}
            </div>
            <div className="absolute inset-0 md:hidden" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
              const endX = event.changedTouches[0]?.clientX;
              if (touchStart.current !== null && endX !== undefined && Math.abs(endX - touchStart.current) > 40) change(endX < touchStart.current ? 1 : -1);
              touchStart.current = null;
            }}>
              <AnimatePresence mode="wait"><motion.img key={activeImage} src={photos[activeImage]} alt={`${name} photo ${activeImage + 1}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="h-full w-full object-cover" /></AnimatePresence>
              {photos.length > 1 && <>
                <button type="button" aria-label="Previous photo" onClick={() => change(-1)} className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow"><ChevronLeft size={20} /></button>
                <button type="button" aria-label="Next photo" onClick={() => change(1)} className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow"><ChevronRight size={20} /></button>
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">{photos.map((_, index) => <button key={index} type="button" aria-label={`Show photo ${index + 1}`} onClick={() => setActiveImage(index)} className={`h-1.5 rounded-full transition-all ${index === activeImage ? "w-7 bg-white" : "w-1.5 bg-white/60"}`} />)}</div>
              </>}
            </div>
          </>
        ) : <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sky-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"><div className="text-center text-foreground-muted"><Camera size={32} className="mx-auto mb-3 opacity-60" /><span className="text-sm">No property photos have been added</span></div></div>}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/20" />
        <div className="absolute left-4 right-4 top-5 flex items-start justify-between sm:left-8 sm:right-8 sm:top-8">
          <span className="rounded-full bg-sky-600 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">HAN member</span>
          {photos.length > 0 && <button type="button" onClick={() => setLightboxOpen(true)} className="inline-flex items-center gap-2 bg-white/90 px-3.5 py-2.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur transition hover:bg-white"><Camera size={14} /> View all photos <span className="text-slate-500">{photos.length}</span></button>}
        </div>
        <div className="absolute bottom-8 left-4 right-4 mx-auto max-w-screen-2xl text-white sm:bottom-10 sm:left-8 sm:right-8 lg:left-12 lg:right-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/75">{category}</p>
          <h1 className="max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{name}</h1>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && photos.length > 0 && <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxOpen(false)}>
          <button type="button" aria-label="Close photos" onClick={() => setLightboxOpen(false)} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X size={21} /></button>
          {photos.length > 1 && <button type="button" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); change(-1); }} className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft size={22} /></button>}
          <motion.img key={`lightbox-${activeImage}`} src={photos[activeImage]} alt={`${name} photo ${activeImage + 1}`} className="max-h-[85vh] max-w-[90vw] object-contain" onClick={(event) => event.stopPropagation()} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} />
          {photos.length > 1 && <button type="button" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); change(1); }} className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight size={22} /></button>}
          <span className="absolute bottom-5 text-sm text-white/80">{activeImage + 1} / {photos.length}</span>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
