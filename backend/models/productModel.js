//productSchema -->idhu vandhu db and client connecting pannum

const mongoose=require('mongoose');
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
        name:{
        type:String,
        required:true,
        },
        rating:{
            type:String,
            required:true
        },
        command:{
            type:String,
            required:true
        }
    },


],
createdAt:{  //-->indha product eppa create achinu thagavalai kondu irukkum
    type:Date,
    default:Date.now(),  //->current date eduthukkum
}
    //create panna schema vai theriya vaikkurathukku
})      //->create pannadhai model kku kodukkuren 
let schema=mongoose.model('product',productSchema)
module.exports=schema;     //product -->collection --singular <>plural