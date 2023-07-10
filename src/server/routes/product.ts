import express from "express";
import { add_review, get_product } from "../controllers/product";
const router = express.Router();

router.get("/:product_id", get_product);

router.put("/:product_id/add_review", add_review);

export default router;
