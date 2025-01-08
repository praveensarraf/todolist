import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({});

import connectDB from "./db/connect.js";

import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";

import path from 'path';

const app = express();

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/todos", todoRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Server Listening
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(); // Wait for the database to connect
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  } catch (error) {
    console.error(error);
  }
};

start();
