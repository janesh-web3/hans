import { Router } from "express";
import {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.route("/").get(getHotels).post(protect, adminOnly, createHotel);

router
  .route("/:id")
  .get(getHotelById)
  .put(protect, adminOnly, updateHotel)
  .delete(protect, adminOnly, deleteHotel);

export default router;
