const express = require('express');
const db = require('./config/db');
const userRouter = require('./routers/User');
const productRouter = require('./routers/Product');
const app = express();
require('dotenv').config();


const path = require('path');// for ejs files path
app.set('view engine',"ejs"); // Set the view engine to EJS
app.set('views',path.join(__dirname,'views')); // Set the views directory to 'views' folder

// only this 2 lines needed in ejs file for server side rendering


app.use(express.json());
app.use(express.urlencoded({extended:true})); // To parse URL-encoded bodies



//for multer image
app.use('/uploads',express.static('uploads')); // Serve static files from the 'uploads' directory

app.use("/user",userRouter)
app.use('/product',productRouter)

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(8090,()=>{
    console.log("Server is running on port 8090");
    db(); // Initialize the database connection
})