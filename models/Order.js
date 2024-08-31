const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    address:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    countryCity:{
        type:String,
        required: true
    },
    zip:{
        type:Number,
        required: true
    },
    newsletter:{
        type:Boolean
    },
    cart:{
        type:Array
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Order', OrderSchema);
