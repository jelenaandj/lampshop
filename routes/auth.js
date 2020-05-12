const express= require('express');
const router=express.Router();
const User=require('../models/User');

router.post('/register', async (req,res)=>{
    try {
        const{name,email,password}=req.body;
        const user=await User.create(req.body);
        return res.status(201).json({
            success:true,
            data:user
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports=router;