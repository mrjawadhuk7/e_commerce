const express=require('express');
const cookieParser=require('cookie-parser') //-->cookie s sammantha patta data vai eduthu kodukkum
const middleware=require('./middlewares/error')//...2.0
const order =require('./routes/order')
const path=require('path');

// const bodyParser=require('body-parser');
const app=express();
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const products=require('./routes/products');  
const auth=require('./routes/auth')
//app.use(express.json())--this json data allow pannurathukku
app.use(express.json()) //--> || 2 ||  -->varakudiya data json aaga anuppuna ithu vandhu vankinkum
// app.use(bodyParser.json());

app.use(express.urlencoded({extended:true})) //--> || 1 || -->varakudiya data url aaga anuppuna ithu vandhu vankinkum

          //api/v1 -->server kku varakudiya requiest - Default address  
app.use('/api/v1',products) // --> || 3 ||
app.use('/api/v1',auth)

app.use('/k7',order)

app.use(middleware)  //...2.1  __intha middleware call pannanum naaa next kku ulla kodukkanum-->productcontroller 00
module.exports=app;


//npm i nodemon --save-dev  -->development dependency

//custom command --> npm run dev &prod
//normal command -->npm start