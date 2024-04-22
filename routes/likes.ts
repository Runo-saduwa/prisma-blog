import { Router, Request, Response } from "express";

const router: Router = Router();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a like
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, postId } = req.body;
    const like = await prisma.like.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({ message: "success", like });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// delete a like
router.delete("/:likeId", async (req: Request, res: Response) => {
  try {
    const { likeId } = req.params;
    const like = await prisma.like.delete({
      where: {
        id: parseInt(likeId),
      },
    });

    res.status(200).json({ message: "success", like });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
