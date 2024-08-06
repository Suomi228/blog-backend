import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {registerValidation,loginValidation,articleCreateValidation,} from "./validations.js";
import { validationResult } from "express-validator";
import handleErrors from "./utils/handleErrors.js";
import dotenv from "dotenv";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as ArticleController from "./controllers/ArticleController.js";
import multer from "multer";
dotenv.config();

const app = express();
app.use(express.json());
app.use(('/uploads'),express.static('uploads'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


const PORT = process.env.PORT || 8001;
app.get("/", (req, res) => {
  res.send("22321322 Hello, World!");
});

app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/auth/login", loginValidation, handleErrors, UserController.login);
app.post("/auth/register", registerValidation, handleErrors, UserController.register);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.send(`File uploaded: ${req.file.originalname}`);
});

app.post("/articles",checkAuth,articleCreateValidation,handleErrors, ArticleController.create);
app.get("/articles", ArticleController.getAll);
app.get("/articles/:id", ArticleController.getOne);
app.delete("/articles/:id", checkAuth, ArticleController.remove);
app.patch("/articles/:id", checkAuth, articleCreateValidation, handleErrors, ArticleController.update);

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
