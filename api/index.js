const express=require('express');
// const mongoose=require('mongoose');
const dotenv= require('dotenv');
const connectDB=require('./config/db')

var cors=require('cors');

dotenv.config({path:'./config/config.env'});
//import auth token middleware

connectDB();


const app=express();

///MIDDLEWARE///
app.use(cors());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//cors middleware
// app.use(function (req, res, next) {
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// next();
//   });
////content-type cors
/// proxy



///get about
app.get('/',(req,res)=>{
    res.send('hi');
});


//use products API route
app.use('/api/products', require('./routes/products'));

//register API route
app.use('/api/user', require('./routes/auth'));

//orders route
app.use('/api/orders', require('./routes/orders'));



// const PORT=5000;
const PORT=process.env.PORT || 5000;

app.listen(PORT, console.log(`serv on ${PORT}`));