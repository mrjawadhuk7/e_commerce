const express=require('express');
const middleware=require('./middlewares/error')//...2.0
const app=express();
//app.use(express.json())--this json data allow pannurathukku
app.use(express.json()) //--> || 2 ||  -->varakudiya data json aaga anuppuna ithu vandhu vankinkum

const products=require('./routes/products')  
          //api/v1 -->server kku varakudiya requiest - Default address  
app.use('/api/v1',products) // --> || 3 ||
app.use(middleware)  //...2.1  __intha middleware call pannanum naaa next kku ulla kodukkanum-->productcontroller 00
module.exports=app;

//npm i nodemon --save-dev  -->development dependency

//custom command --> npm run dev &prod
//normal command -->npm start