const express= require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const {registerValidation, loginValidation}=require('../validation');
const jwt=require('jsonwebtoken');

//register

router.post('/register', async (req,res)=>{
    //validate first send(error.details[0].message);
    //const {error}=schema.validate(req.body);
const {error}=registerValidation(req.body);
if(error) return res.status(400).json({
       success:false,
       message:error.details[0].message
   });
   ///is users email in database
const emailExists= await User.findOne({email:req.body.email});
if(emailExists) return res.status(400).json({
    success:false,
    message:'Email already exists'
});
    ///hash hash
    const salt=await bcrypt.genSalt();
    const hashPassword=await bcrypt.hash(req.body.password,salt);

    try {
        const{name,email}=req.body;
        const user=await User.create({
            name:name,
            email:email,
            password:hashPassword
        });

        /////CREATE JWT//////
// const token=jwt.sign({_id:user._id,email:user.email}, process.env.SECRET_TOKEN );

//     ///if email and pass ok then log in 
    // res.header('auth-token',token).send(token);

    res.status(200).json({
        success:true,
        message:'logged in'
    });
        // return res.status(201).json({
        //     success:true,
        //     data:user
        // });
    } catch (error) {
        res.status(400).send(error);
    }
});

///login
router.post('/login', async(req,res)=>{
    console.log('aaa');
        //validate first send(error.details[0].message);
    //const {error}=schema.validate(req.body);
const {error}=loginValidation(req.body);
if(error) return res.status(400).json({
       success:false,
       message:error.details[0].message
   });

//    ///search database for a specific email
   const user= await User.findOne({email:req.body.email});
//    const user2=await User.findOne({name:req.body.name})
   if(!user) return res.status(400).json({
       success:false,
       message:'Email does not exist'
   });
//    //is pass corect
   const validPassword=await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) return res.status(400).json({
    success:false,
    message:'Password not valid'
    });
/////CREATE JWT//////
const token=jwt.sign({_id:user._id,email:user.email}, process.env.SECRET_TOKEN );

//     ///if email and pass ok then log in 
    // res.header('auth-token',token).send(token);
    
    res.status(200).json({
        success:true,
        message:'logged in',
        token
    });
    
});


module.exports=router;