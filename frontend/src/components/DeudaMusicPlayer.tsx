import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Headphones, Music2, Play, X } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface DeudaVideo { id: string; title: string; artists: string }

const DEUDA_VIDEOS: DeudaVideo[] = [
  {
    id: "oVr-Gh7o4WI",
    title: "Chamkeli Bauju",
    artists: "Prakash Thapa · Gauri Bhatta",
  },
  {
    id: "CpPoSszZCJM",
    title: "Raibar Laijha Udanya Kag",
    artists: "Bisal Bhatta · Gauri Bhatta",
  },
  {
    id: "fTETVZTTEP0",
    title: "Jantya Bhaat Khaaihelau",
    artists: "Rekha Joshi · Megh Jan Kadayat",
  },
  {
    id: "gFvfb6BlOJg",
    title: "Ka Dhadkinchhai Mutu",
    artists: "Gauri Bhatta · Chandra Saud",
  },
  {
    id: "vDJybiV_w10",
    title: "Mera Gau Rahadi Bhuwa",
    artists: "Gauri Bhatta · Jaganath Nepali Bairagi",
  },
];

export default function DeudaMusicPlayer() {
  const [open, setOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<DeudaVideo | null>(null);
  const { data: settings } = useSiteSettings();
  const videos = settings?.musicVideos?.length ? settings.musicVideos : DEUDA_VIDEOS;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="fixed bottom-24 right-4 z-[70] sm:right-6 lg:bottom-6">
      <AnimatePresence>
        {open && <motion.section
          role="dialog"
          aria-label="Sudurpashchim Deuda music player"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-[4.5rem] right-0 flex max-h-[min(70vh,560px)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-background-card shadow-2xl sm:w-[360px]"
        >
          <div className="flex items-center justify-between bg-slate-950 px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-500/20 text-sky-300"><Music2 size={18} /></span>
              <div><h2 className="text-sm font-semibold">Deuda Music</h2><p className="mt-0.5 text-[10px] tracking-wide text-white/60">Sounds of Sudurpashchim</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close music player" className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"><X size={17} /></button>
          </div>

          {activeVideo ? <div className="relative aspect-video w-full shrink-0 bg-black">
            <iframe
              key={activeVideo.id}
              title={`${activeVideo.title} — Deuda music video`}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div> : <div className="flex items-center gap-3 border-b border-border bg-background-secondary p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"><Headphones size={19} /></span>
            <div><p className="text-sm font-medium text-foreground">A little music from home</p><p className="mt-1 text-xs text-foreground-muted">Choose a Deuda video to start listening.</p></div>
          </div>}

          {activeVideo && <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0"><p className="truncate text-xs font-semibold text-foreground">{activeVideo.title}</p><p className="mt-1 truncate text-[10px] text-foreground-muted">{activeVideo.artists}</p></div>
            <a href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noreferrer" aria-label="Open video on YouTube" className="grid h-8 w-8 shrink-0 place-items-center text-foreground-muted hover:text-accent"><ExternalLink size={15} /></a>
          </div>}

          <div className="min-h-0 overflow-y-auto p-2">
            <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">Deuda videos</p>
            {videos.map((video) => <button key={video.id} type="button" onClick={() => setActiveVideo(video)} className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition ${activeVideo?.id === video.id ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-background-secondary"}`}>
              <span className="relative h-12 w-[68px] shrink-0 overflow-hidden rounded bg-slate-200 dark:bg-slate-800"><img src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" /><span className="absolute inset-0 grid place-items-center bg-black/20 text-white"><Play size={15} fill="currentColor" /></span></span>
              <span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-foreground">{video.title}</span><span className="mt-1 block truncate text-[10px] text-foreground-muted">{video.artists}</span></span>
              {activeVideo?.id === video.id && <span className="mr-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-sky-500" aria-label="Now playing" />}
            </button>)}
          </div>
          <div className="border-t border-border px-4 py-2.5"><p className="text-center text-[10px] text-foreground-muted">Video playback is provided by YouTube.</p></div>
        </motion.section>}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close Deuda music player" : "Open Deuda music player"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-sky-600 text-white shadow-xl shadow-sky-950/20 transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/40"
      >
        {open ? <X size={21} /> : <Music2 size={22} />}
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-400" />}
      </motion.button>
      <span className="sr-only" aria-live="polite">{activeVideo ? `Selected ${activeVideo.title}` : ""}</span>
    </div>
  );
}
