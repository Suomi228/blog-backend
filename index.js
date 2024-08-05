import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8001;
app.get("/", (req, res) => {
  res.send("22321322 Hello, World!");
});

app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/auth/login", UserController.login);


app.post("/auth/register", registerValidation, UserController.register);
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose
  .connect(process.env.MONG_DB)
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log(err);
  });
