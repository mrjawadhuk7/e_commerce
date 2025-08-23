
//mongodb--connect pannurathukku 
const mongooe=require('mongoose');
                                                 //connectionString/dbName --> || 1 || db name
const connectDB=()=>{mongooe.connect(process.env.MONGO_URI                      
    
)
.then((con)=>{                                  //run aginu irukkura host hai edukkurathukku
    console.log(`Mongodb connctted to the host: ${con.connection.host}`);
    
})
// .catch((err)=>{
//     console.log("db disconnected",err.message);
    
// })   ////-----catch yai eduthutta unhandleRejection aga maridum
}
module.exports=connectDB
