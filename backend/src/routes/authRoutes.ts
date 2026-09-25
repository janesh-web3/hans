import { Router } from "express";
import { loginUser, logoutUser, getMe, changePassword } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";
import { loginRateLimit } from "../middleware/loginRateLimit";

const router = Router();

router.post("/login", loginRateLimit, loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
router.put("/password", protect, changePassword);

export default router;
