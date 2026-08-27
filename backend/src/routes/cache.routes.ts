import { Router } from "express";
import { getCacheStatus } from "../controllers/cache.controller";

const router = Router();

router.get("/status", getCacheStatus);

export default router;