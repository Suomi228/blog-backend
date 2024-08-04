import express from "express";
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());
const jwtSecretKey = 'secret'
const PORT = process.env.PORT || 8001
app.get('/', (req, res) => {
    res.send('22321322 Hello, World!');

 });

 app.post('/auth/login', (req, res) => {
    let data = {
        email: req.body.email,
        password: req.body.password
    }
    const token = jwt.sign(data, jwtSecretKey);
    res.json(token);
    
 });
 app.listen(PORT, (req, res) =>{
     console.log(`Server is running on port ${PORT}`);
 });