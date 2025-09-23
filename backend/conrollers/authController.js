const User=require("../models/userModel");
const catchAsyncError=require("../middlewares/catchAsyncError");
const errorHandler=require('../utils/errorHandler');
const sendToken =require("../utils/jwt");
const ErrorHandler = require("../utils/errorHandler");

const crypto =require('crypto')
// const {getResetToken}=require('./../utils/');
const sendEmail = require("../utils/email");
exports.registerUser=catchAsyncError(async(req,res,next)=>{
const {name,email,password} = req.body //-->ithula irunthu daan data vanganum body la irunthu

let avatar;
if(req.file){
  avatar = `${process.env.BACKEND_URL}/uploads/users/${req.file.originalname}`
}

const user = await User.create({
    name,
    email,
    password,
    avatar
});//vangura data vai db anuppuren
       //mela create panna user //ithula document kkana irukkum and schem method voom irukkum
// const token=user.getjwtToken()

// res.status(201).json({  //-->response anuppurathukku
//     success:true,
//     user,
//     token
// })

sendToken(user,201,res) //--||143-1||

})

//creating login api 

exports.loginUser=catchAsyncError(async(req,res,next)=>{
   const {email,password}= req.body
  if(!email || !password){ //-->email & password kudukkama vitta intha error throw pannurathukku
  return next(new errorHandler('please enter email & password',401))

    }
    //finding the user database
    const user =await User.findOne({email}).select('+password')
    if(!user){//-->user illana  
      return next(new errorHandler('invalid email or password',401))
    }
    //mela irukkura step ellam thandi vanduduchuna, user oda data intha email kku kidaithuduchu endru artham
    //
    //ippa password and db password currect aga irukkanu parkklam
    
    //user enter panna password hai vanguren     
       //wait panni than output vangurathunala ingayum await pannuren
    if(!await  user.isValidPassword(password)){
      return next(new errorHandler('invalid email or password',401))
     //ithai thandiduchuna user oda password currect haaga irukkunu artham
    }
sendToken(user,201,res)//--||143-1|| 
})


//logout 

//----------------------------------------------------------------------------------------------------------------------
//--||    ||--authcontroller la puthusa oru req handler function eluthuren 
//-----------------------------------------------------------------------------------------------------------------------

exports.loggedOut=(req,res,next)=>{
    //logout pannurathukku user oda token yai mattum remove pannal pothum ithula
    //res anuppuren
       //method //key //null value vaithal token yai kaali panniduren
  res.cookie('token',null,{
    expires:new Date(Date.now()),//curent milli second kodukkiren
    httpOnly:true
  })//ippa vanthu token remove agidum
  .status(200).json({  //ippa res send pannuren
    success:true,
    message:"loggedOut"
  })
}
//-----------------------------------
//------|| ii ||----------------------
//-----------------------------------
exports.forgetPassword=catchAsyncError(async(req,res,next)=>{
 const user = await User.findOne({email:req.body.email})//findOne yai vachi ({email la vachi :req.body la irunthu vara email la vachi user oda data vai edukkuren})

 if(!user){//antha email la user illana error throw pannuren, return pannuren next kku ulla
 return next(new ErrorHandler('user not found with this email',404))
 }             //error yai ErrorHandler la set pannuren with statusCode oda

 //data irukkuthuna if kku kila varum or inga varum //inga varum pothu intha user kana reset token yai uruvakkiduren

 const resetToken=await user.getResetToken();//reset token la anga create panna original value irukum
 await user.save({validateBeforeSave:false})//resetPasswordToken,resetPasswordTokenExpire,create panni irukkurathai ippa save pannurem
                 //ipdi koduthal validate seyyathu //illana sila validation error vara arambikkalam

   //resetToken vachikkunu reset pannurathukkana url yai create pannuren
                 //create reset url
                                   //ithu host name edukkurathukku         //athu kudaiye resetToken yai intha link oda serthu viduren
  const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
                  //intha server oda prrotocol(http)  //INTHA LINK ANUPPUM POTHU EMAIL AGA THAN ANUPPA POREN
  const message=`Your password reset url is as follows \n\n  
  ${resetUrl} \n\n  if you have not requested thi email,then ignore it.`;//INGA MAIL KKU ANA MESSAGE ANUPPUREN \n --next line la irunthu start agum

  //een intha mathiri try catch poduren na, try kku ulla mail anuppurathukkana code ellam vara poguthu
  //ethavathu oru sulnilaiyila mail anuppa mudiyatha problem create agalam , appa athu server error than,
  //error haa eduthu vachikkittu etha mathiri user kku response anuppanum 
  try{

//-----------------------------------|
//------|| iv ||---------------------|
//-----------------------------------|


  await sendEmail({
    email:user.email, //reset panna pora user oda email yai anuppuren
    subject:"MrJawadhu Password Recovery",//subject kodukkuren
    message //message ithu vandhu message la poi sera poguthu //mela create pannathai inga kodukkuren
   })
   res.status(200).json({//response anuppuren
    success:true,
    message:`Mail send to ${user.email}`//
   })
  }
  catch(error){ //email anuppama error vanthuchuna inga varrum
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpire=undefined;//data or mail pogalana avarudaiya token yai db la irunthu eduthuduren
        await user.save({validateBeforeSave:false}) //mela edit pannathai save panniduren, intha error handling yai panni mudichathume return panniduren //error message return panna poguthu next middleware la
        return next(new ErrorHandler(error.message,500))//error message //500--internal server error
  }
//ithai use pannurathukku router onnu uruvaakkanum
//12345//
})//pass undefined varuthuna inga vanthu oru user hai email edukkuren athu kuda token yai mattum set pannuren
//anal password field yai set pannala athanala than undefined nu varuthu

//-----------------------------------|
//------|| reset password API ||-----|
//-----------------------------------|

//password reset pannurathu kkana api yai elutha poren //user data vai edukkurathunala async function aga irukkum
                     //async error yai catch pannurathukku than (catchAsyncError)
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
  //user anuppura link la token irukkum athai edukkuren//atahavathu antha hash string yai vachu than original value vai edukk poren//post la anupurathunala athu parameter aga than eduthukkum
  
  //intha token yai than hash panni resetPasswordToken endru db vachi iruken//antha value voom intha value voom onnanu parkaporen//athargu crypto//itarku munnadi panna mathiri
  const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
       //ithu and db la resetPasswordToken val iruthuchina itha vachi user oda data eduthukkalam                                                   //update la than original value vai kodukkanum
   const user = await User.findOne({
    resetPasswordToken,
   resetPasswordTokenExpire : {//expire agama iruntha mattum than value ha edukka poren atharku
     $gt:Date.now()//$gt ithu query operator  //expire agalana curent time yai vida greaterthan aga than irukum
   }//two field layum data iruthuchina user la data kidaikkum
   })  
   if(!user){//user oda data kidaikkulana//error kodukkuren
    return next(new ErrorHandler('password reset token is invalid or expired'))
   }//error illana if statement i thandi vanthidum // thandi vanthiduchina post la new password yai anuppa solluren//athu kudaiye confirm password anuppa solluren

   //onnu password anuppu innonnu confirm password //password confirm pannurathukku innore field
   if(req.body.password !== req.body.confirmPassword){//two field yum match agi irukkanu check pannurem
    return next(new ErrorHandler('password does not match'))//match agalana error kodukkuren
   }//ithai thandiduchina p & cp currect nu artham
   user.password=req.body.password;//password yai user model set pannuren
                //body la irunthu kidacha password

  //resetPasswordToken,resetPasswordTokenExpire two feild s yayun undefined panni vittuduren//intha field vanthu db la irukkathu
  //valu iruntha than db irukkanum , value illana db la irukka kudathu
   user.resetPasswordToken=undefined;
   user.resetPasswordTokenExpire=undefined;
//ippa intha user oda data vai save panna poren
                  //intha idathula entha validayte anna kudathunu solluren
   await user.save({validateBeforeSave:false});
 //response la data anuppuren
   sendToken(user,201,res)

})
//INTHA ROUTES YAI INAIKKA POREN--auth.js la 

//-----------------------------------|
//------|| get user profile ||-------|
//-----------------------------------|
exports.getUserProfile=catchAsyncError(async(req,res,next)=>{
  //login panna user oda data vai edukka poren
                      //user oda data va eduthu kodukkum
  const user =  await User.findById(req.user.id)//user yai authenticate la set panni vittu irukken athai thirumba edukkuren , login panna na req.user nu set panni viduren
res.status(200).json({         //(req.user.id) login panna user id yai kodukkuren  //login panni iruntha (req.user) user data kidaikkum //user property yai access pannale id kidaichidum
  success:true,
  user
}) //kidacha data vai response la anuppuren   
})
//-----------------------------------|
//------|| change password ||--------|
//-----------------------------------|
// login panna user avarudaiya password yai change pannurathukkana code ezhutha poren [change password] 
//first request handler function yai ezhuthuren                         
exports.changePassword=catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user.id).select('+password');
                                                //select panni password yai edukuren // password data user la kidaichidum
  
  //ippa user oda password yai change pannuren
  //check old password 
  
  //curent password yai change pannurathukku first old password yai sothikka poren //old password match agutha apdinu

  //old password yai check  pannurathukku [isValidPasswor] userModel.js la eluthi vachi irukken athai eduthukkuren//athavathu schema vukku ulla irukkurathai edukkuren[isValidPasswor]check panni boolean yai return pannum
  if(!await user.isValidPassword(req.body.oldPassword)){//intha method la anuppurathu user oda old password
        //  user model irukkura isValidPassword edukkuren or athai call pannuren true or false enira boolean value vai return pannum
    return next(new ErrorHandler('old password is incorrect',401))//password match agalana error yai return pannnuren
  }//intha if kkku ulla varalana password currect nu artham
  //assigning new password
  //ippa user current password ennavaga vachikkka poraroo athai req.body anuppuvaru password enkira namela[req.body.password]
  user.password = req.body.password;
 //erganave irukura password la new password yai assign pannuren

  await user.save(); //password yai vanki save panniduren
  res.status(200).json({
    success:true
  })
})


//-----------------------------------|
//------||  update profile  ||-------|
//-----------------------------------|
//update profile
//password yai change panna mathiri profile yum change ppannuren
//athargana [--API--] Service yai uruvaakka poren
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
  const newUserData={   //matha pora data vai inga kodukkuren
    name:req.body.name, //user matha pora data enna entha field la irunthu varuthunu solluren
  //name :body la name field yai avaru update pannuvaru
    email:req.body.email,//requset la body la irunthu varuthunu assign pannikkiren 
   //email : property la email yai mathuvaru
  }  //ithu than vanthu matha kudiya data ,user oda profile la 

            //usermodel   //find & update   //login panna user oda id yai eduthu set panniduren--[newUserData]
const user=await User.findByIdAndUpdate(req.user.id,newUserData,{//req.user.id kandu pidikkurathu,newUserData update pannurathukku ,third vanthu options
  new:true,//ithu vanthu update ana data la new data vai return pannum
  runValidators:true//schema la sila validation panni irukkurathai appadiye validate pannaratukku//validatation run agum
})    //validate la error vanthal catchAsyncError kku poyidum
res.status(200).json({  //response anuppurathukku
  success:true,
  user
})

})

//admin: get all users

exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
  const users = await User.find(); //ella data voom edukkuren
  
  res.status(200).json({//eduthathai response la anuppuren
    success:true,
    users
  })
})
//admin : get specific user
exports.getUser=catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id);//req la anuppuna id yai edukkuren findbyid la koduthu user la edukkuren
  if(!user){//user illana
    return next(new ErrorHandler(`user not found with this id ${req.params.id} `))
  }
  res.status(200).json({//response anuppuren
    success:true,
    user
  })
});
//admin : update user  //role incase mathurathukku intha service thevaiopadum
exports.updateUser=catchAsyncError(async(req,res,next)=>{
  const newUserData={
    name : req.body.name,//ipdi valu vai anuppuren
    email:req.body.email,
    role:req.body.role
  }                                        //findbyid   //update pannura value
  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success:true,
    user
  })
});
//admin:delete user
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id);//findById(req.params.id) data vangi
  if(!user){
    return next(new errorHandler(`user not found with this id ${req.params.id}`))
  }
  await user.deleteOne();//delete pannuren
  res.status(200).json({
    success:true
  })
})