import express from "express";
import { add_review, get_restaurants } from "../controllers/restaurant";
const router = express.Router();

router.get("/", get_restaurants);

router.put("/:restaurant_id/add_review", add_review);

export default router;
