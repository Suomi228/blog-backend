import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import {validationResult} from 'express-validator'
mongoose
.connect('mongodb+srv://Suomi228:12345@cluster0.2vrlf2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{console.log('DB OK')})
.catch(err=>{console.log(err)});



const app = express();
app.use(express.json());
const jwtSecretKey = 'secret'
const PORT = process.env.PORT || 8001
app.get('/', (req, res) => {
    res.send('22321322 Hello, World!');

 });


 app.post('/auth/register',registerValidation, (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    res.json('User created');
    
 });
 app.listen(PORT, (req, res) =>{
     console.log(`Server is running on port ${PORT}`);
 });