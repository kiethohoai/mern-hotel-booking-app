import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: 'Invalid credentials',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: 'Invalid credentials',
        });
      }

      // Create token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // Send token via cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      // Send response
      return res.status(200).json({
        status: true,
        message: 'User logged in successfully',
        userId: user._id,
      });
    } catch (error) {
      console.log('🚀Error at /login route', error);
      res.status(500).json({
        status: false,
        message: 'Something went wrong',
      });
    }
  },
);

router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  // req.userId come from verifyToken middleware
  res.status(200).send({ userId: req.userId });
});

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(0),
  });

  res.send();
});

export default router;
