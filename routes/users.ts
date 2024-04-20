import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // const {} = req.body;
  res.status(200).json({
    message: "Hello",
  });
});

export default router;
