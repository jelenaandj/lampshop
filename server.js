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
    res.send('hello everyone');
});


//use products API routes
app.use('/api/products', require('./routes/products'));

//register API route
app.use('/api/user', require('./routes/auth'));


const PORT=process.env.PORT || 5000;

app.listen(PORT, console.log(`serv on ${PORT}`));