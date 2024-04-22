import { Router, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

// CRUD

// Create Post
router.post("/", async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.create({ data: req.body });
    return res.status(201).json({ message: "Post created", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Read Posts by authorId
router.get("/:authorId", async (req: Request, res: Response) => {
  const authorId = Number(req.params.authorId);
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId,
      },
      include: {
        likes: true,
        author: true,
      },
    });
    return res.status(201).json({ message: "success", posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Read all Posts in db
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        likes: {
          include: {
            user: true, // This includes the User details for each Like
          },
        },
        author: true,
      },
    });
    return res.status(201).json({ message: "success", posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Post

router.put("/:postId", async (req: Request, res: Response) => {
  const id = parseInt(req.params.postId);

  const validProps: any = {};

  if (req.body.hasOwnProperty("content")) {
    validProps.content = req.body.content;
  }
  if (req.body.hasOwnProperty("title")) {
    validProps.title = req.body.title;
  }
  if (req.body.hasOwnProperty("published")) {
    validProps.published = req.body.published;
  }

  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...validProps,
      },
    });

    return res.status(201).json({ message: "success", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Post

router.delete("/:postId", async (req: Request, res: Response) => {
  const id = parseInt(req.params.postId);
  try {
    const post = await prisma.post.delete({ where: { id } });
    return res.status(201).json({ message: "success", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
