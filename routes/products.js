const express= require('express');
const router=express.Router();
const Product=require('../models/Product');


//get all products
router.get('/',async (req,res)=>{
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    try {
        const products=await Product.find();
        return res.status(200).json({
            success:true,
            data:products
        });
    } catch (error) {
        return res.send(500).json({
            success:false,
            error:'Server error'
        });
    }
});

//////////////////////////

router.post('/', async(req,res)=>{
   try {
    const{name,description,picture,price}=req.body;
    const product=await Product.create(req.body);
    return res.status(201).json({
        success:true,
        data:product
    });
   } catch (error) {
       res.status(400).send(error);
   }
});


////////////////////////
router.get('/:id',async (req,res)=>{

    try {
        const product=await Product.findById(req.params.id);
        if(product){
        return res.status(200).json({
            success:true,
            data:product
        });}else{
            return res.status(404).json({
                success: false,
                error: 'No product found'
              });
        }
    } catch (error) {
        return res.send(500).json({
            success:false,
            error:'Server error'
        });
    }
});

module.exports=router;