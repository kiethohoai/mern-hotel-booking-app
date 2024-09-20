import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user';
import authRoutes from './routes/auth';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log('🚀DB connection successful!');
});

const PORT = process.env.PORT || 7000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan('dev'));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀Server started on port ${PORT}`);
  console.log(`🚀ENV: `, process.env.NODE_ENV);
});
