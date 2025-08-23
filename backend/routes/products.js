//naama anuppura pala vithamana requist andhantha requist entha controll match agutho adharku poi seranum adhargu than intha routes  la irukkura sila files help panna poguthu

const express=require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../conrollers/productController');
const router=express.Router();

router.get('/products',getProducts);  //  --> ||2||
router.post('/product/new',newProduct);
// router.get('/product/:id',getSingleProduct);
// router.put('/product/:id',updateProduct);
router.route('/product/:id') //-->id anuppuren url laa
                          .get(getSingleProduct)
                          .put(updateProduct)
                          .delete(deleteProduct)
module.exports=router;    //also chaining also possible 

