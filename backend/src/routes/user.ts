import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    await user.save();
  } catch (error) {
    console.log("🚀Error on /register route:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;
