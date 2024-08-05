import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
const jwtSecretKey = "secret";
export const register = async (req, res) => {
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
      const { passwordHash, ...userData } = user._doc;
  
      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }

export const login = async (req, res) => {
    try {
      const user = await UserModel.findOne({email: req.body.email});
      if (!user) {
        return res.status(404).json({ message: "Пользователя нет" });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }
      const token = jwt.sign({ _id: user._id }, jwtSecretKey, {
        expiresIn: "30d",
      });
      const { passwordHash, ...userData } = user._doc;
  
      res.json({
        ...userData,
        token,
        message: "Authentication completed successfully"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }

export const getMe = async(req, res) => {
    try {
      const user = await UserModel.findById(req.userId);
      const { passwordHash,...userData } = user._doc;
      res.json({
        ...userData,
        message: "Success from controller"
      });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
  }  