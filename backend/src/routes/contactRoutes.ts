import { Router } from "express";
import { listContactSubmissions, submitContact, updateContactStatus } from "../controllers/contactController";
import { adminOnly, protect } from "../middleware/authMiddleware";
import { contactRateLimit } from "../middleware/contactRateLimit";

const router = Router();

router.post("/", contactRateLimit, submitContact);
router.get("/submissions", protect, adminOnly, listContactSubmissions);
router.patch("/submissions/:id", protect, adminOnly, updateContactStatus);

export default router;
