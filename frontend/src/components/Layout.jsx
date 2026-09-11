import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { pageVariants } from "../lib/animations";

export default function Layout() {
  const location = useLocation();
  const prevPath  = useRef(location.pathname);

  // Instant scroll-to-top on every route change — runs before paint
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-primary-50/40">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
