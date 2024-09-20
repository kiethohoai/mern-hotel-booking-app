import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// todo Register
router.post(
  '/register',
  [
    // Validate data
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: errors.array(),
      });
    }

    try {
      // Find user on Database
      let user = await User.findOne({
        email: req.body.email,
      });

      // Check if user exists
      if (user) {
        return res.status(400).json({
          status: false,
          message: 'User already exists',
        });
      }

      // Create user & prevent someone set Role to user (option)
      user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      // Save user
      await user.save();

      // Create token
      const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // Set cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      // Send response
      return res.status(200).json({
        status: true,
        message: 'User registered successfully',
      });
    } catch (error) {
      console.log('🚀Error on /register route:', error);

      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
);

export default router;
