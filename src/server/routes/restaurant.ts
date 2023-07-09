import express from "express";
import { get_restaurants } from "../controllers/restaurant";
const router = express.Router()

router.get("/", get_restaurants)

export default router