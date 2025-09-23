//naama anuppura pala vithamana requist andhantha requist entha controll match agutho adharku poi seranum adhargu than intha routes  la irukkura sila files help panna poguthu

const express=require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview,getReviews, deleteReview } = require('../conrollers/productController');
// const isAuthenticatedUser=require('../middlewares/authenticate')  //-->module aga import panna kudathu
const {isAuthenticatedUser,authorizeRoles}=require('../middlewares/authenticate')  //-->function agathan eduthukkanum pannanum
const router=express.Router();
                       //routes pathugakkathukkana middleware ithu thaan
router.get('/products',getProducts);  //  --> ||2||
                                         

// router.get('/product/:id',getSingleProduct);
// router.put('/product/:id',updateProduct);
router.route('/product/:id') //-->id anuppuren url laa
                          .get(getSingleProduct)
                          .put(updateProduct)  //admin kku than delete ,create ,update,ellathukum urimi irukku
                          .delete(deleteProduct)//ithanala than user:"role" nu vachi irukkom
                          
router.route('/review').put(isAuthenticatedUser,createReview)
                      .delete(deleteReview)
router.route('/reviews').get(getReviews)

//ADMIN ROUTES

  //ithu array values('admin,user) //--||1.2||
router.post('/admin/product/new',isAuthenticatedUser,authorizeRoles('admin'),newProduct);
                        //login panni irukkanum // inta router anumathi irukkanum //appuram than newProduct kku pogum or handle seyya padum


module.exports=router;    //also chaining also possible 

