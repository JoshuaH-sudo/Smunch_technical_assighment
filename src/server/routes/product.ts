import express from "express";
import { get_product } from "../controllers/product";
const router = express.Router();

router.get("/:product_id", get_product);

export default router;
