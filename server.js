const express=require('express');
// const mongoose=require('mongoose');
const dotenv= require('dotenv');
const connectDB=require('./config/db')

dotenv.config({path:'./config/config.env'});

connectDB();


const app=express();

///MIDDLEWARE///

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//cors middleware
app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
next();
  });

///get about
app.get('/',(req,res)=>{
    res.send('5');
});


//use products API routes
app.use('/products', require('./routes/products'));


const PORT=process.env.PORT || 5000;

app.listen(PORT, console.log(`serv on ${PORT}`));