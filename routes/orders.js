const express= require('express');
const router=express.Router();
const auth=require('./verifyToken');
const Order=require('../models/Order');
const {orderValidation}=require('../validation');

router.post('/', auth, async(req,res)=>{
    // res.send(req.user);
const {error}=orderValidation(req.body);
if(error) return res.status(400).json({
    success:false,
    message:error.details[0].message
});
try {
    const{name,address,countryCity,zip,newsletter,cart}=req.body;
    // console.log(req.user._id+" id");

    const order=await Order.create({
        name:name,
        address:address,
        countryCity:countryCity,
        zip:zip,
        newsletter:newsletter,
        cart:cart
    });
    res.status(200).json({
        success:true,
        message:`OrderID is ${order._id}`
    });
} catch (error) {
    res.status(400).send(error);
}

});

module.exports=router;
