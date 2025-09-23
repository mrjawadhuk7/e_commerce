const express=require('express');
const { newOrder, 
        getSingleOrder, 
        myOrders,
        orders,
        updateOrder,
        deleteOrder
           } = require('../conrollers/orderController');

const {isAuthenticatedUser, authorizeRoles}=require('../middlewares/authenticate')

const router=express.Router();
                               //login              //neworder
router.route('/order/new').post(isAuthenticatedUser,newOrder);
//oru kurippitta order oda id pakkanum na login panni irukkanum user
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser,myOrders);
//ithu admin kkana router athanala admin yai thandi than varanum
router.route('/allorders').get(isAuthenticatedUser,authorizeRoles('admin'),orders)
//order status yai admin mattum than matha mudiyuramathiri kudukkuren
router.route('/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
                          .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)
module.exports=router  