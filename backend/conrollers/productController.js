//controller file vandhu many controll pannurathukku -->  || 1 ||

const express=require('express');
const router=express.Router();
//inga than vandhu producModel yai import pannuren -->must be starting capital letter
const Product=require('../models/productModel');

//-----|| 2.1--errorhandler yai import pannikkiren ||----------------
const ErrorHandler = require('../utils/errorHandler');
      //----21.2
const catchAsyncError=require('../middlewares/catchAsyncError')

//all product -api/v1/products/
exports.getProducts= async(req,res,next)=>{
              //wait panna data kidaikkum --> adhai product laa store pannuren
const product=await Product.find();
              //status code important
    res.status(200).json({  //json data-vai response aaga anuppum
        success:true,
        Counts:product.length, //-->products ooda count ku
        product  //-->product:product =product --nu kodukkalam

    })
}   


//create product -api/v1/product/new

// async(req,res,next)=>{
// const product=await Product.create(req.body); -->then
//    res.status(201).json({               
//       product
//     })
// }
      //total ulla kodukkuren      //async -func --point pannum
exports.newProduct=catchAsyncError(async(req,res,next)=>{   //-->now
                      //Product - 2hour model capital first letter
   const product=await Product.create(req.body); //-->naama anuppura data body la kondu varum
                       //ippa promise la vara error handle pannuren**1111--required field illana handle pannuratukku    
   
   res.status(201).json({               //-->anuppura data vai json nu sonnal than data varun || 1 || body laakidaikkum
      success:true,
      product
    })
}
)

//get single product -api/v1/product



exports.getSingleProduct=async(req,res,next)=>{
    const product =await Product.findById(req.params.id) //-->id yai vachu than kurippitta parameter ayai db id yai thedum match agurathai eduthunu varum ,mongoose eduthu kodukum
                                                      //-->id la id value kedachu eduthidum data
    //-->thappa koducha id varama pogidum adhargu some error throw pannuren
    if(!product){                                    
    //    return res.status(404).json({
    //         success : false,
    //         message:"not get product"
        // });

//-----------------------|| 2 ||---------------------------------------
      //00    //callpannuren    //message 03   //statusCode
return next(new ErrorHandler('product not found',400)); //---->error object yai uruvakki koduthudum  //thisai thiruppi vidurathukku oru middleware urukkuren
//return pannalana else ku pogidum
    }
    res.status(201).json({
            success:true,
            product
        })
    
}

// update product -api/v1/product/:id

exports.updateProduct= async(req,res,next)=>{
    //update pannurathukku first data vanganum
    let update =await Product.findById(req.params.id) //1 --let update=
    if(!update){
        return res.status(404).json({
            success:false,
            message:"product not found"
            
        });
           }                           //2  --update=   // 1 - req.params.id laa kidacha parameter,-- 2 - update panna pora data
   update = await Product.findByIdAndUpdate(req.params.id,req.body,{                     //--> 2- req.body update panna pora data kdaikkum ,json data vai adhula than anuppunum
new:true, //-->update pannathukku appuran pudhu data varathukkuthan      //-->ithula sila options set pannuren
runValidators:true})//-->currect irukka ilaiya endru nu validate pannurathukku

  

        res.status(200).json({
            success:true,
            update
        })
    }

    //delete - api/v1/product/:id
    exports.deleteProduct=async(req,res,next)=>{
                                    //-->endha  oru velayum seyyirathukku munnadi data vai vangi vachukkiren
        const product = await Product.findById(req.params.id)
        if(!product){  //-->ipdi ellathukkum elutha mudiyathu ,adharku custom error  //res thanitnaniyaga anuppa mudiyadhu
          return  res.status(404).json({
                success:false,
                message:"product not found"

            })
        }            //remove()-not working
       await product.deleteOne(); //-->id match anale delete pannidum

       res.status(200).json({
            success:true,
            message:"product deleted!"
        })
       }

//--------------------------------------------------------------------------------------------------------------- 
//ippa error handle pannanum
//---------------------------------------------------------------------------------------------------------------
//db error ,
//promise error,many of error yai patri parkkalam,  ella vithamana error hai handle panna poren
//production kku oru error 
//development kku oru error-show pannurathukku

//inthula handle pannatha error hai handle panna poren
//---------------------------------------------------------------------------------------------------------------
//ORU CLASS HAI URUVAKITTU ADHAI -ERROR KKU ATHAI PAYANPADUTHIKKALAM  -->utils-->errorhandler-->1
//---------------------------------------------------------------------------------------------------------------