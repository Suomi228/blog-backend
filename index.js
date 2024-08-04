import express from "express";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('22321322 Hello, World!');

 });

 app.post('/auth/login', (req, res) => {
     console.log(req.body);
     res.send('Data Received');
 });
 app.listen(8001, (req, res) =>{
     console.log('Server is running on port 8001');
 });