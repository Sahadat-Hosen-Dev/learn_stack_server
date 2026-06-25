import { Router } from "express";
const router = Router();
import authRoutes from "./auth";

router.use("/api/v1/auth", authRoutes);

export default router;
