import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.route("/").get(getEvents).post(protect, adminOnly, createEvent);

router
  .route("/:id")
  .get(getEventById)
  .put(protect, adminOnly, updateEvent)
  .delete(protect, adminOnly, deleteEvent);

export default router;
