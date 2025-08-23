 //--> seeder enkirathu data's vai edudhunu poi sekkurathukku than intha seeder use agum db kku ulla
//--.irukkurathai delete pannittu ulla insert pannura mathiri code ezhuthalam

const products =require('../data/product.json') //data's inga vanthidum products const kku ulla

//db kku ulla kondu vandhu sekkurathukku productModel thevaipadukirathu

const Product=require('../models/productModel')
const connectDB=require('../config/connectDb')

//seeder products yai vangi model yai payanpaduthi db kku ulla insert panna poguthu

//--> ITHU VANDHU THANIPATTA FILE ADHANALA MARUPADIYUM INAIKKKUNUM --CONFIG.ENV OODA ADHULLA THAN ELLAM IRUKKU
const dotenv=require('dotenv');

//--> dotenv file la config file yai set pannitten

dotenv.config({path:'backend/config/config.env'})
//db yai connect pannitten
connectDB()

const seedProducts=async()=>{

   try{
    //hanle-->if
    
    //-->products delete pannurathukku

    await Product.deleteMany();
    console.log("all products deleted successfully!")

    //-->products insert pannurathukku

    await Product.insertMany(products);
    console.log('all products added!')
   }
   //->handle else || error
   catch(err){
    console.log('ERROR:',err.message);
   } 
   process.exit()
}
seedProducts();

// ---------------------------------------------------------||
//                                                          ||
//    seeder mulaiyamaga products delete aguthu             ||
//                                                          ||
//    seeder mulaiyamaga vandhu products add aguthu         ||
//                                                          ||
//----------------------------------------------------------||