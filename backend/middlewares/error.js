//ippa error middeleware create pannuren 

const ErrorHandler = require("../utils/errorHandler");
                //err than important property  // object yai than err name la vanguren
module.exports=(err,req,res,next)=>{
    //intha error statusCode irukkathu ithu athanala err.statusCode--irukkathu value  || 500--athanala than 500 nu varuthu 
    err.statusCode=err.statusCode || 500; //-->err.statusCode onnu vachi iruppen --productcontroller set pannura statusCode,o\
       
       //1
    // res.status(err.statusCode).json({
    //     success:false,
    //     message:err.message,  
    //     stack:err.stack })


    
        //2

   //---|| development error ||-----------------------------------------

    if(process.env.NODE_ENV=='development'){
        res.status(err.statusCode).json({  //---|| 143 ||---
            success:false,
            message:err.message,  //--- || 02 || ----
            stack:err.stack,//22 
            error:err
            // stack:err.stack, -->2 illana error mattum than throw pannum
            // error:err

            
        })
//---|| production error ||-----------------------------------------
    }
    if(process.env.NODE_ENV == 'production'){
      
        // res.status(err.statusCode).json({
        //     success:false,
        //     message:err.message
        // })

       let message=err.message;
       let error=new ErrorHandler(message) //---2222 atahi error aga mathurathukku ,erganave irukkura error object yai kondu varum
   err.statusCode=400;//ipdi statusCode koduthal than work agum
//ValidationError ithu mongodb error

       if(err.name=='ValidationError'){
    //--------------------------------------------------------------------------------   
        //  message=Object.values(err.errors).map(value=>value.message) 
        // error = new ErrorHandler(message)
     //----------------------------------------------------------------------------
                //object kku ulla irukkura value edukkurathukku
        message=Object.values(err.errors).map(value=>value.message)//map panni message value vai edukkuren --1111 
        error = new ErrorHandler(message)
        err.statusCode=400;
       }                        //mela vanguna array variable yai inga kodukkuren

//--CastError in handle panna poren 
//--illa url vandhal error throw pannurathukku
       if(err.name == 'CastError'){
        //mongoose data vai db thedurathukku munnadi nama anuppuna value vai oru objectid convert pann parkkum , object id sariillana casterror throw pannum,db casterror entha field error vandhu irukku enkirathu path kkana value
        message=`Resourse not found: ${err.path}`;
        error = new ErrorHandler(message); //intha message error className kku ulla poyi object yai kondu varudhu athaithan parka mudithu
     err.statusCode=400;  
    }

       if(err.code==11000){
 let message=`Duplicate ${Object.keys(err.keyValue)} Error`;
    error =new ErrorHandler(message);
     err.statusCode=400;
    };
       if(err.name=='JSONWebTokenError'){
 let message=`json web token is invalid.try again `;
    error =new ErrorHandler(message);
     err.statusCode=400;    
    };
       if(err.name=='TokenExpiredError'){
 let message=`json web token expired.try again`;
    error =new ErrorHandler(message);
     err.statusCode=400;
    };

        res.status(err.statusCode).json({
        success:false,
        message:error.message || 'internal server error'
    })
    }
}
//ithai app.js la middleware aga payanpaducha poren...1 --validation handle panna poren mongodb ,catch pannurathukku middeleware uruvakkanum    


//--------------|| 3 ||---------------------------------------------------------------------------------------------

//package.json
//config.env --vandhu summa //package.json vandhu main //command run pannurathunala environment file value matha padukirathu
//start-dev-prod-seeder



//ippa promise la vara error handle pannuren