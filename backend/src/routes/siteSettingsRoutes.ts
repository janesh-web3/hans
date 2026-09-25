import { Router } from "express";
import { getSiteSettings, updateSiteSettings } from "../controllers/siteSettingsController";
import { adminOnly, protect } from "../middleware/authMiddleware";

const router = Router();
router.get("/", getSiteSettings);
router.put("/", protect, adminOnly, updateSiteSettings);
export default router;
