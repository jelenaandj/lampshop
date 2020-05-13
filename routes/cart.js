const express= require('express');
const router=express.Router();
const auth=require('./verifyToken');


router.get('/', auth, (req,res)=>{
    res.send(req.user);

});

module.exports=router;
