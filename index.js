import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());
const jwtSecretKey = "secret";
const PORT = process.env.PORT || 8001;
app.get("/", (req, res) => {
  res.send("22321322 Hello, World!");
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();
    const token = jwt.sign({ _id: user._id }, jwtSecretKey, {
      expiresIn: "30d",
    });
    const {passwordHash, ...userData} = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
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
