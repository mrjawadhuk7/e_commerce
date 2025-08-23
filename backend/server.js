//app module inga vandhuduchu
const app=require('./app')
//

const dotenv=require('dotenv')
//indha dotenv yum and config.env file yaiyum joint pannanum
const path =require('path')
const connectDB = require('./config/connectDb.js');


//ipdi kodukkulana undefined nu varum--veliyee irundhu run pannurathunala 
// relative path kodukkakudadhu --absolute path than kodukkanum

dotenv.config({path:path.join(__dirname,"config/config.env")})


//<--database call panni connect pannitten-->
connectDB();

app.get('/',(req,res)=>{
    res.status(200).send('welcome')
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

//

//<-- handle unhandledRejection in db  //MONGO_URI = mongod://127.0.0.1:27017/e_commerse //enga enga promise oda error catch pannalayo adharku ellam intha error varum
process.on('unhandledRejection',(err)=>{
console.log(`db not connetted,ERROR: ${err.message}`);
console.log("shudding down server due to unhandle rejection error");
server.close(()=>{
    process.exit(1);
})


})

//-->

// handling uncaughtException
process.on('uncaughtException',(err)=>{
  console.log(`db not connetted,ERROR: ${err.message}`);
console.log("shudding down server due to uncaught error");
server.close(()=>{
    process.exit(1);
})
})
//      a engayum define pannala athanala error varum
// console.log(a); <--ipdi define panna error varum-->ithukku error vandhaal mele irukkurathu varum 
