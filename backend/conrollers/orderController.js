const User=require('../models/userModel');
const catchAsyncError =require('../middlewares/catchAsyncError');
const ErrorHandler=require('../utils/errorHandler');
const Order = require('../models/orderModel');
const Product=require('../models/productModel');

//--------------------------------------------------------------------------------------------------------------- 
//NEW ORDER  
//---------------------------------------------------------------------------------------------------------------

exports.newOrder=catchAsyncError(async(req,res,next)=>{
  //order kku thevaiyaana sila fields kalai anuppuvoom
  //athai inga vangi vachikkiren const la
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,//enne field venumoo athu than ithu
        shippingPrice,
        totalPrice,
        paymentInfo  //ithu ellama order create pannum pothu anuppurathu
         } = req.body;//(object))ithula irunthu kidaikkum 

         const order = await Order.create({ //req la irunthu vantha value ellame koduthiduvoom
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),//now time
        user:req.user.id //login panna user oda id //order create pannum pothu user oda id yai create pannuren athai kodukkuren  
         })
         res.json({//response anuppuren
            success:true,
            order
         })
})


//Get Single Order- k7/order/:id
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
  //order kkana id yai vachi antha order yai vankikkanum //ithula user oda collection kku ulla poyi user oda name and email eduthunu varen
  const order = await Order.findById(req.params.id).populate('user', 'name email');
                                                             //collection,'name,email'field value vai edukkuren
                                                   //join panni data edukkurathukku
  if(!order){ //order kidaikkilana intha error yai return pannuren
    return next(new ErrorHandler(`order not found with this email ${req.params.id}`,400));
  }
  res.json({//suppose data kidaichiduchina inga varum
    success:true,
    order
  })
})



//get loggedin user orders -myorders


//oru user oda ella order yaiyum kondu vandhu pakkurathukku
exports.myOrders=catchAsyncError(async(req,res,next)=>{
  //find method la query parameter yai anuppuren
                                   //user enkira field la irunthu
                                       //user oda id yai koduthu user id yai edukkuren //login panna user oda id yai koduthu avarudaiya order yai edukkuren 
  const orders = await Order.find({user:req.user.id});//req.user.id id enkira field irukkum

  res.status(200).json({//athukku response anuppuren
    success:true,
    orders
  })
})

//Admin:get all orders

//admin vanthu ella order yaiyum pakkurathukku
exports.orders=catchAsyncError(async(req,res,next)=>{//1
  const orders=await Order.find();//total order edukkuren //{user:req.user.id} - ipdi kudutha oru user oda orders than varum

  let totalAmount=0; //total order kkana amount ennanu therinchikkurathukku //3
//order la irunthu forEach mulaiyamaga ovvoru data vum loop panni kondu varen
orders.forEach(order=>{
  //totalAmount kuda ..order.totalPrice + pannuren
  totalAmount +=order.totalPrice//4
})

  res.status(200).json({
    success:true,//2
    totalAmount,//5
   orders
  })
})

//update order /update status -k7/:id

//order create pannathukku appuram delivery pannuthakku appuram order status yai process la irukkurathai delivered mathura mathiri pannuren
//oru product vankittanga na quantity onnu kuraikkanum atharku 
//orderstatus,deliveryAt,stock
exports.updateOrder=catchAsyncError(async(req,res,next)=>{//1
 const order = await Order.findById(req.params.id)//parameter la id vankurathukku
 if(order.orderStatus=="Delivered"){//order status mathurathukku munnadi delivered irukkanu pakkanum
  return next(new ErrorHandler('ORDER HAS BEEN ALREADY DELIVERID!',400))
 }
 //updating the product stock of each order item 
 //  //atharku than orderItem kku ulla product id yai vanki vachi irukken stock update pannurathukku
 order.orderItems.forEach(async orderItem=>{//2 //inthorder ovvoru orderitem yai eduthu 
 // //antha order item kku ulla irunthu (orderItem.product) //product enkira name irukkura productId yai kodukkuren 
   await updateStock(orderItem.product,orderItem.quantity)//4 //athoda quantity kudukkuren
 }) ////5 athu mudichathume order status yaiyum update pannuren
 order.orderStatus=req.body.orderStatus; //intha name anuppuvoom athai vanki assign pannikkiren
 order.deliveredAt=Date.now()//intha order delivery ana time kudukkuren 
 await order.save();//save pannuren
 res.status(200).json({
  success:true,
  orderStatus//order Status yum kodukkuren  
 })       
})
                          //productId,quantity anuppuren //anippitta anuppuram productId yai vachi  intha id yai vachi antha product yai vankiduvoom
async function updateStock(productId,quantity){//3
   const product = await Product.findById(productId)//Product model eduthukkuren//productId ya kuduthu antha data vai vangiduren
   //product data layirunthu stock vanthu update panna poren

   //stock filed eduthukkuren
   product.stock=product.stock - quantity;
                 //inga irunthu-quantity yai - pannidum
   product.save({validateBeforeSave:false})//save pannum pothu , validate panna kudathu enkirathukku false kodukkuren
}


//delete order

exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
  const order =  await Order.findById(req.params.id); //order yai kandu pidikkiren
  if(!order){//order else aga iruntha
    return next(new ErrorHandler(`order not found with this id : ${req.params.id}`))
  }
  await order.deleteOne(); //kandu pidichathai delete pannuren
  res.status(200).json({
    success:true,
  })
})