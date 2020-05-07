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
// router.get('/',(req,res)=>{
//     const products=Product.find();
//     if(products){
//         res.status(200).json({
//                 success:true,
//                 data:products
//         });
//     }else{
//         return res.send(500).json({
//                         success:false,
//                         error:'Server error'
//     })}
// });

router.post('/', async(req,res)=>{
   try {
    const{name,description,picture,price}=req.body;
    const product=await Product.create(req.body);
    return res.status(201).json({
        success:true,
        data:product
    })
   } catch (error) {
       console.log(error);
   }
});
////res.send(res.json(products));
//get one product 
// router.get('/:id', (req,res)=>{
//     // res.send(req.params.id)
//     const foundProduct=products.find(product=>product.id===parseInt(req.params.id));
//     if(foundProduct){
//     res.json(products.filter(product=>product.id===parseInt(req.params.id)));
//     }else{
//         res.status(400).json({ message: `Proudct with id ${req.params.id} not found`});
//     }
// });
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