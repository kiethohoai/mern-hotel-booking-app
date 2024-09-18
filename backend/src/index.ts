import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("🚀DB connection successful!");
});

const PORT = process.env.PORT || 7000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀Server started on port ${PORT}`);
  console.log(`🚀ENV: `, process.env.NODE_ENV);
});
