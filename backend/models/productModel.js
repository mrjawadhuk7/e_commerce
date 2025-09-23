//productSchema -->idhu vandhu db and client connecting pannum

const mongoose=require('mongoose');
const User=require("../models/userModel");
                          //schema create pannittu model kku ulla kodukkunum
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter product name'],
        trim:true, //munnadi and pinnadi edhuvum irukka kudadhu adhargu htaan trim pannuren 
        maxLength:[100,'product name cannot 100 exceed characters'],
    },             //allowed charater
    price:{
        type:Number,
        required:true,
        default:0.0,  //default value kuda kodukkalam
    },
    description:{
        type:String,
        required:[true,'please enter product description']  //ithu vandhu array    
    },           //irukkanum  //illana message throw pannuren
    ratings:{
        type:String,
        default:0,
    },
images:[
    {
    image:{
        type:String,
        required:true,
    }
}

],
category:{
    type:String,
    required:[true,'please enter product category'],
    enum:{        //enum enirathu naama kudakkakudiya pattiyal  values --> field kkoduthuttu kodukkanum
        values:[  //ithu category ithula ethu venum naalum educhu use pannalam
            'Electronics',
            "mobile phones",   //-->and thenfollow the currect letter
            'Laptops',
            'accessories',
            'headphones',
            'books',
            'foods',
            'clothes/shoes',
            'Beauty/health',
            'sports',
            'outdoor',
            'home',
        ],
        message:'please select currect category' //match agadha ctegory kku error message throw pannuren
    }
},
seller:{
    type:String,
    required:[true,'please enter product seller']
},
stock:{  //rukkura stock ooda count edukkkurathuku
    type:Number,
    required:[true,'please enter product stock'],
    maxLength:[20,'product cannot exceed 20'],
},
numOfReviews:{    //reviews count kku
    type:Number,
    default:0,

},
reviews:[        //reviews kku
    {
        user:mongoose.Schema.Types.ObjectId,    
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    },


], 
//user enkira field
user : {   //type vandhu mongodb object id yai kondu iruka poguthu
    type :  mongoose.Schema.Types.ObjectId,
    
},
createdAt:{  //-->indha product eppa create achinu thagavalai kondu irukkum
    type:Date,
    default:Date.now(),  //->current date eduthukkum
}
    //create panna schema vai theriya vaikkurathukku
})      //->create pannadhai model kku kodukkuren 
let schema=mongoose.model('product',productSchema)
module.exports=schema;     //product -->collection --singular <>plural


// Host

// sandbox.smtp.mailtrap.io
// Port

// 25, 465, 587 or 2525
// Username

// c9708006c6d58c
// Password

// ****032a
// Auth

// PLAIN, LOGIN and CRAM-MD5
// TLS

// Optional (STARTTLS on all ports)

// // Looking to send emails in production? Check out our Email API/SMTP product!
// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "c9708006c6d58c",
//     pass: "3c9ccda285032a"
//   }
// });