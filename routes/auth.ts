import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const SECREY_KEY = process.env.SECRET_KEY as string;

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ message: "User created successfully", ...user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials: Incorrect email or password" });
    }

    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, SECREY_KEY, {
      expiresIn: 10600,
    });

    return res.status(200).json({ token: `Bearer ${accessToken}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
