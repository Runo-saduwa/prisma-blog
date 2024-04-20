import { Router } from "express";

import authRoutes from "./auth";
import usersRoutes from "./users";
import postsRoutes from "./posts";
import commentsRoutes from "./comments";

import { auth } from "../middlewares/auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", auth, usersRoutes);
router.use("/posts", auth, postsRoutes);
router.use("/comments", auth, commentsRoutes);


export default router;