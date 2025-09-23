const mongoose = require('mongoose');
const User = require('../models/userModel');
const Product=require('../models/productModel');
const orderSchema= mongoose.Schema({
    shippingInfo:{
        address:{type:String,required:true},
        country:{type:String,required:true},
        city:{type:String,required:true},
        phoneNo:{type:String,required:true},
        postalCode:{type:String,required:true},
    },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'

    },

    orderItems:[
        {
            name:{type:String,required:true},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true},
            product:{type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'},
            
        },
    ],
    itemsPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    taxprice:{
        type:Number,
        required:true,
        default:0.0,
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    paidAt:{
        type:Date
    },
    deliveriedAt:{
        type:Date
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Proccessing"
    },
    createdAt:{
      type:Date,
      default:Date.now

    }
 
})

let orderModel=mongoose.model('order',orderSchema);
module.exports =orderModel