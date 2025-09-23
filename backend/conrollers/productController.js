//controller file vandhu many controll pannurathukku -->  || 1 ||

const express=require('express');
const router=express.Router();
//inga than vandhu producModel yai import pannuren -->must be starting capital letter
const Product=require('../models/productModel');

//-----|| 2.1--errorhandler yai import pannikkiren ||----------------
const ErrorHandler = require('../utils/errorHandler');
      //----21.2
const catchAsyncError=require('../middlewares/catchAsyncError');
const APIFeatures = require("../utils/APIFeatures");  //ithai get product la use panna poren


//all product -api/v1/products/

// exports.getProducts= async(req,res,next)=>{
             
// const product=await Product.find();
              
//     res.status(200).json({  
//         success:true,
//         Counts:product.length,
//         product 

//     })
// }                       //req-la queryStr parameter ||keyword ||  la varathai 
exports.getProducts= catchAsyncError(async(req,res,next)=>{
const resultPerPage=5; //-->1 page la 2 product thaan varanum          
    //wait panna data kidaikkum --> adhai product laa store pannuren 
                       //APIFeatures 2 query parameter anuppanum //query and queryStr            //1
// const apiFeatures =await new APIFeatures(Product.find(),req.query).search().filter().paginaate(resultPerPage);  //indha object uruvakkum pothu .search kidaikkum
                                //method return pannura object yai pas pannuren,second vandhu req. la kidacha query 

let buildQuery = ()=>{
return new APIFeatures(Product.find(),req.query).search().filter()
}
const filterdProductCount = await buildQuery().query.countDocuments({});
const productsCount = await Product.countDocuments({});
                            
// const products=   await apiFeatures.query;//Product.find()return pannurathu oru query object apiFeatures.query        //await Product.find(); //3333 -indha visayam nadakurathukku munnadi--query sila add pannittu adharku appuram call pannuren ithula
const products = await buildQuery().paginaate(resultPerPage).query

let productCounts = productsCount;
if(filterdProductCount !== productsCount){
  productCounts = filterdProductCount
}

// return next(new ErrorHandler('unable to send products!',400))

// await new Promise(resolve=>setTimeout(resolve,3000))
              //status code important

    res.status(200).json({  //json data-vai response aaga anuppum
success:true,
//totalProductsCount //productsCount
productsCount : productCounts,
resultPerPage,
    // Counts:product.length, //-->products ooda count ku
        products  //-->product:product =product --nu kodukkalam

    })
}   
)


//create product -api/v1/product/new

// async(req,res,next)=>{
// const product=await Product.create(req.body); -->then
//    res.status(201).json({               
//       product
//     })
// }
      //total ulla kodukkuren      //async -func --point pannum
exports.newProduct=async(req,res,next)=>{   //-->now

   //--------------------------------------------------------------------------------------------------------------------
   //
   //products kku user oda id set pannuren
   //
   //--------------------------------------------------------------------------------------------------------------------

                   //--12--//login panna user data req la kidaikkum //ithu isAothenticatedUser middleware kku ulla poyi eduthunu varum user yai athula irunthu id yai edukkuren
    //create pannurathukku munnadi req.body eduthu user yai insert pannuren
      req.body.user=req.user.id  //--11---           
                     //Product - 2hour model capital first letter
   const product=await Product.create(req.body); //-->naama anuppura data body la kondu varum
                       //ippa promise la vara error handle pannuren**1111--required field illana handle pannuratukku    
   
   res.status(201).json({               //-->anuppura data vai json nu sonnal than data varun || 1 || body laakidaikkum
      success:true,
      product
    })
}


//get single product -api/v1/product



exports.getSingleProduct=async(req,res,next)=>{
    const product =await Product.findById(req.params.id) //-->id yai vachu than kurippitta parameter ayai db id yai thedum match agurathai eduthunu varum ,mongoose eduthu kodukum
                                                      //-->id la id value kedachu eduthidum data
    //-->thappa koducha id varama pogidum adhargu some error throw pannuren
    if(!product){                                    
    //    return res.status(404).json({
    //         success : false,
    //         message:"not get product"
        // });

//-----------------------|| 2 ||---------------------------------------
      //00    //callpannuren    //message 03   //statusCode
return next(new ErrorHandler('product not found',400)); //---->error object yai uruvakki koduthudum  //thisai thiruppi vidurathukku oru middleware urukkuren
//return pannalana else ku pogidum
    }
    res.status(201).json({
            success:true,
            product
        })
    
}

// update product -api/v1/product/:id

exports.updateProduct= async(req,res,next)=>{
    //update pannurathukku first data vanganum
    let update =await Product.findById(req.params.id) //1 --let update=
    if(!update){
        return res.status(404).json({
            success:false,
            message:"product not found"
            
        });
           }                           //2  --update=   // 1 - req.params.id laa kidacha parameter,-- 2 - update panna pora data
   update = await Product.findByIdAndUpdate(req.params.id,req.body,{                     //--> 2- req.body update panna pora data kdaikkum ,json data vai adhula than anuppunum
new:true, //-->update pannathukku appuran pudhu data varathukkuthan      //-->ithula sila options set pannuren
runValidators:true})//-->currect irukka ilaiya endru nu validate pannurathukku

  

        res.status(200).json({
            success:true,
            update
        })
    }

    //delete - api/v1/product/:id
    exports.deleteProduct=async(req,res,next)=>{
                                    //-->endha  oru velayum seyyirathukku munnadi data vai vangi vachukkiren
        const product = await Product.findById(req.params.id)
        if(!product){  //-->ipdi ellathukkum elutha mudiyathu ,adharku custom error  //res thanitnaniyaga anuppa mudiyadhu
          return  res.status(404).json({
                success:false,
                message:"product not found"

            })
        }            //remove()-not working
       await product.deleteOne(); //-->id match anale delete pannidum

       res.status(200).json({
            success:true,
            message:"product deleted!"
        })
       }

//--------------------------------------------------------------------------------------------------------------- 
//ippa error handle pannanum
//---------------------------------------------------------------------------------------------------------------
//db error ,
//promise error,many of error yai patri parkkalam,  ella vithamana error hai handle panna poren
//production kku oru error 
//development kku oru error-show pannurathukku

//inthula handle pannatha error hai handle panna poren
//---------------------------------------------------------------------------------------------------------------
//ORU className HAI URUVAKITTU ADHAI -ERROR KKU ATHAI PAYANPADUTHIKKALAM  -->utils-->errorhandler-->1
//---------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------- 
//create review
//---------------------------------------------------------------------------------------------------------------

exports.createReview=catchAsyncError(async(req,res,next)=>{
    const {productId,rating,comment}=req.body;//req.body la irunthu 3 field data vanguren
           //review podurathukkana product data thevaipadukirathu atharku req la anuppuren
    const review={ //new haa oru review oda object yai uruvakkanum //athi product la review field kku ulla push pannanumx
        user:req.user.id,//user enkira field la entha user vanthu product kkana review uruvaakararoo user id yai kodukkure//isathentcate thandi vanthale user la req.user.id eduthukkalam
        rating, //rating:rating =rating  //post la body la anuppura data vai kondu varum
        comment
    }//ippa vanthu ithu new review kkana data ithu
    //ithai oru product oda document la reviews enkira field kku ulla push pannanum enna ithu (reviews:array) data
    const product=await Product.findById(productId);//review podurathukkana product data
    //oru user oru product kku oru thadava than review kudukkanum innoru thadava review kudutha athai update pannura mathiri code eluthuren
    
//finding user already review //excist

            //product vankunathukku appuran user review panni irukkara nu parkuren
    const isReviewed=product.reviews.find(review=>{  //user:req.user.id intha user erganave product review pottu irukkaranu pakkurathukku
                     //product.reviews - field la than ella reviews  yum irukkum   //array nalaa find function use pannuren
        return review.user.toString() == req.user.id.toString() //intha string um == login user string um onna nu parkkum //irandum string um onna irukkuna user vanthu intha product kku review pottu irukkaru endru artham
        
             // review kku ulla irukkura user enkira field ,user enkirathu id field //objectid aga kidaikkum athai string aga mathuren

    })//athai return panni oru const (isReviewed) pottu vachikkiren //isReviewed - ithu irunthuchina review data irukkum
    
    //review ulla serkkalama or irukkura review yai update pannalamaa nu  code(condition) elutha poren
       if(isReviewed){ //review irunthuchina athai update panna poren  
       
        //updating the review
       
        product.reviews.forEach(review=>{ //forEach la intha body la varakudiya review vai enna panna poren na
          
            
          
            if(review.user.toString()==req.user.id.toString()){//user oda review ethunu kandu pidikka poren//user id yum login panna user id same aga irunthuchina intha review vai kandu pidichitten entru artham
                review.comment=comment,//review kku ulla comment field irukku //athukku req la pass panna comment yai kodukkuren
                review.rating=rating //same up line command//athukku req la pass panna rating  yai kodukkuren
            }//value aga assign pannuren//itha mathiri pannale review data vanthu update agidum
          })
       }
       //creating the  review
       else{//review illana reviews field kku ulla review vai puh pannaporen
                       //array nala //new review kkana object yai ulla push pannuren
        product.reviews.push(review);       //array nala length idaikkum
        product.numOfReviews=product.reviews.length//product.numOfReviews - value matha poren= numOfReviews intha field yai eduthu reviews count yai kattaren 
       } //antha review length poyi numOfReviews= value vaaga assign agum

       //find the avarage of the product reviews

//review yai ulla kondu vanthuttom anal ratings field update pannuren
                                       //array value vai total value aga mathurathukku
                                              //intial val.depending on privious val,reviews yai review vankikkuren
       product.ratings=product.reviews.reduce((acc,review)=>{ //ithukku ulla body irukkum //ratings enkirathu avarage//review la ratings field irukkum athula review avg  kodukkanum
                      //ratings la ella reviews eduthu antha reviews avg kondu varanum
        //ella review kutti devid pannanum                                                                          //acc=0,=3
        return review.rating + acc;//return pannurathu acculumeter value return pannurathu than adutha loop la varum-0+3=3,3+2=5
       //return la review yai rating + acc val vai add panni return pannuren
     
       //first vanthu call back,second vanthu acculumeter val oda intial val =0.//0 layirunthu ovvoru review vai yum + panninu varum
    },0) / product.reviews.length;//motha ratings vum vanki athai devid pannuren athoda length laye 

    //entha review yum illana empty aga irukkum appa NaN value return agum //athu poyi db la update aga kudathu 
      product.ratings = isNaN(product.ratings)?0:product.ratings//review llana =0 , nan illana val  athai kudu
      await product.save({validateBeforeSave:false})//ella finish anatharku appuram save pannuren validate illama
      res.status(200).json({//response anuppuren
           success:true,
      })
    })

    //get reviewes - api/v1/reviews?id={productId}--id yai inga query parameter la oru product oda productId value aga anuppuren
    exports.getReviews=catchAsyncError(async(req,res,next)=>{
        //first product data thevaiv\padum//req yai query parameter aga anuppuven name=id vachikkiren
        const product =await Product.findById(req.query.id);
        res.status(200).json({
            success:true,
            reviews:product.reviews//review kkana array data vanthu serum
        })
    })

    //delete review - api/vi/review//req pogum anal delete req aga pogum

    exports.deleteReview=catchAsyncError(async(req,res,next)=>{
        //oru review yai delete pannanum na product data thevaipadum  
        
              //product kkana id than productId
        const product = await Product.findById(req.query.productId);//productId nu delete pannurathukkana id yai anuppuren query la
                      //reviews array data vaga irukkum //

    //filtering the reviews which does match the deleteing review id

        const reviews=product.reviews.filter(review=>{//array nala filter use pannalam

//ovvoru review layum varakudiya id //and intha product la irukkakudiya id match achina athai omit pannurathukku
            review._id.toString() !== req.query.id.toString() //varakudiyathu objectId yai string aga mathuna than use panna mudiyum
                                 //not equal to //req.query. la anuppura id match agala new array kku push pannidum
        })

        //number of reviews

        //review yai delete pannathukku appuram thirumba numOfReviews thirumba + panni / panni update pannanum
        const numOfReviews =reviews.length;

        //finding the avarage with the filtered reviews

        let ratings= reviews.reduce((acc,review)=>{// ratings=product.
        return review.rating + acc;
       },0) / reviews.length;
        ratings=isNaN(ratings)?0:ratings 
        //saving the product document
        await Product.findByIdAndUpdate(req.query.productId,{ //update pannuren//first product id yai kodukkuren//second vanthu ethu update pannuren no athai object la kodukkuren
          reviews,
          numOfReviews,  //ethu ellam update pannurno athai kodukkuren
          ratings   
        })//ippa vanthu productId kku update agidum
         res.status(200).json({//update agi mudichathume response anuppuren
            success:true,
            
         })
    })//delete pannura review id and entha product oda review id enkirathukku productId yai kodukkuren