const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const crypto = require('crypto');//token generate pannurathukkana package 
const ErrorHandler = require('../utils/errorHandler');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name']

    },
    email:{
        type:String,
        unique:true,
        validate:[validator.isEmail,'please enter valid email address'],
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        maxLength:[6,'password cannot exceed 6 chractrt'],
        select:false, //-->data vai normal aga edukkum pothu password data varathu

    },
    avatar:{    
        type:String
        // required:true,  
    },
    role:{
        type:String,
        default:'user',
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    
});
//-----------------------------------------------------------------------------------------------------------------
//ippa middleware function yai call panna poren
//password hash pannurathuku 
        //pre munkuttiye //save user data create update pannumpothu save than use pannuvoom athanala save use pannuren    
                                        //next vandhu next middleware
        //userSchema.pre("save",async function(next){//-->next vandhu normal function ,nxt vandhu move pannurathukku
      //console.log('onsave',this.password)
     //this.password=await bcrypt.hash(this.password,10)
     
   
            //kidacha password yai eduthu hash panni thirumba adhulaye vaiuren
                                //password oda value vai hash pannuren ,complexcity 10

//})  //this vachu password yai access pannuren=reassign panna poren
//--------------------------------------------------------------------------------------------------------------------
//({DATA AND SALT ARQUIMENS REQUIRED})--ERROR YAI HANDLE PANNURETHUKKU

//12345//
//pre enkira middlewaere eppa namma data save pannalum call panna kudiya function 
//password matha appa undefined nu than varum,value illatha field hai encrypt panna undefined than varum


userSchema.pre("save",async function(next){//-->next vandhu normal function ,nxt vandhu move pannurathukku
    //before la vandhu hash pannum pothu password varala
    //password hash pannum pothu work agurathukku intha mathiri modify panni irukken
    
    //VALUE IRUNTHA THAN ENCRYPT PANNANUM NU SOLLUREN

    //IPPADI THAN VALUE MODIFY AGI IRUKKANU THERINCHIKKALAM & MODIFY PANNI IRUNTHA TRUE NU KIDAIKKUM OR RETURN PANNUM
                           //password enkira path kodukkanum
       if(!this.isModified("password")){
          //password hash function kku ulla pogalana undefined nu varum--just info
       return next();
       }
       
       this.password=await bcrypt.hash(this.password,10)
      return next();
    })
//--------------------------------------------------------------|
//----------|| ippa vanthu mail send aguthu ||------------------|
//--------------------------------------------------------------|

       
                //intha fun call pannathan token genereate pannanum
userSchema.methods.getjwtToken=function(){
//uruvakkkurathukku-sign  //id 1          //secretkey 2
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
//generate panni return pannuren 
        expiresIn:process.env.JWT_EXPIRE_TIME//-->expires aguratha time 3
    })

}
userSchema.methods.isValidPassword=async function(enteredPassword){
  return bcrypt.compare(enteredPassword,this.password);
  //return panna than currect haaga work agum
}

//-----------------------------------
//------|| i ||----------------------
//-----------------------------------

userSchema.methods.getResetToken=async function(){
    //generate token   //random buffer data vai kondu varum
                                            //encoding
const token = crypto.randomBytes(20).toString('hex');
//intha token yai hash panni vachikkanum
   //GENERATE HASH AND SET TO resetPasswordToken
                                //hash pannrathukkana algorithm //
                                                //update la original value vai kodukkanum
//ithai reset password token la vachikkiren                                                                 //digest string ha generatu pannurathukkana method
this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');
   //set token expire time    //curent milli second kondu varum
this.resetPasswordTokenExpire=Date.now()+ 30 * 60 * 1000; //30 minitus la expires agunum nu solli irukken

//two field yum fill pannittu intha token yai return panniduren
return token
}

let model=mongoose.model('user',userSchema);
module.exports=model;