const catchAsyncError=require("../middlewares/catchAsyncError"); 
const ErrorHandler = require("../utils/errorHandler");
const jwt=require("jsonwebtoken");
const User=require('../models/userModel')
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
   const {token}=req.cookies
   if(!token){
      return next(new ErrorHandler('login first to handle this resource',401))
   }                      //vankunathu     //set panna secret key
   const decoded=jwt.verify(token,process.env.JWT_SECRET) //-->indha decoded kku ulla user da id than irukku //id yai vachu user oda data vai edukkuren
   //-->ithai thandi vanduduchuna token vandidum athu vanduduchuna value vai decord panni edukkanum 
   req.user =await User.findById(decoded.id)
   next();
  //vanguna data vai req,kku ulla oru property aga assign panniduren ,user enkira field la 
})
//ready agiduchi athai next middleware la use pannuren products.js la   req.user =data kidaikkum 
//------------------------------------------------------------------------------------------------------------------------------------------
//admin permission kkanathu 
                        //middleware call pannumpothu roles anuppuven
exports.authorizeRoles=(...roles)=>{//rest operator yai vachi vangiduren different types od roles
     //ithargu ulla irukkurathu arrow function //intha function,   oru user login pannalama venama thirmanikkum
   return (req,res,next)=>{
       //-->ro vachi vanki irukurathu oru array values ithula includes function payanpadutha mudiyum
                        //ulla login panni vandha user ,isAuthenticatedUser la cookie la irunthu token vangi req.user store pnni irukkurathai vangi athala role yai edukkuren athai inga access pannikkalaam
      if(!roles.includes(req.user.role)){
               //error midleware kku anuppuren
         return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
      }
      next()//next middleware kku anuppuren true aga irunthaa--->ithai new product la products.js kku anuppurn-- ||1.1||
   }
}