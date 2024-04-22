import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = Router();

// Fetch all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        likes: true,
      },
    });
    res.status(200).json({ message: "success", users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get user
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
        likes: true,
      },
    });
    res.status(200).json({ message: "success", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:userId", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const validProps: any = {};

    if (req.body.hasOwnProperty("email")) {
      validProps.email = req.body.email;
    }

    if (req.body.hasOwnProperty("firstName")) {
      validProps.firstName = req.body.firstName;
    }

    if (req.body.hasOwnProperty("lastName")) {
      validProps.lastName = req.body.lastName;
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: validProps,
    });
    res.status(200).json({ message: "success", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "success", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
