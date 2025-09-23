const express=require("express");
const multer =require("multer");
const path = require("path");

const upload = multer({storage:multer.diskStorage({
     destination:function(req,file,cb){
          cb(null,path.join(__dirname,'..','/uploads/users'))
     },
     filename:function(req,file,cb){
          cb(null,file.originalname)
     }
})})

const { registerUser,
     loginUser, 
     loggedOut, 
     forgetPassword, 
     resetPassword, 
     getUserProfile, 
     changePassword, 
     updateProfile,
     getAllUsers,
     updateUser,
     deleteUser,
     getUser} = require("../conrollers/authController");
const {isAuthenticatedUser, authorizeRoles}=require('../middlewares/authenticate')
const router=express.Router();

// router.route('/register').post(registerUser);
router.post('/register',upload.single('avatar'),registerUser);
router.post('/login',loginUser);
router.get('/logout',loggedOut);
//-----------------------------------|
//------|| v ||----------------------|
//-----------------------------------| //forgetPassword enkira request functional than handle panna poguthu
router.post('/password/forgot',forgetPassword);
                             //parameter //two field la data varuthu athanala post la than varum
router.route('/password/reset/:token').post(resetPassword);

router.route('/profile').get(isAuthenticatedUser,getUserProfile)
                             //login  //login pannathukku appuram than profile kku ulla  pogum,login pannathai vachi
router.route('/password/change').put(isAuthenticatedUser,changePassword)
                                      //login            //login pannathai vachi password change pannuren
router.route('/update').put(isAuthenticatedUser,updateProfile)
                        //change agurathu put request la vantha thaan currect aga irukkum  
          
//ADMIN ROUTES                        

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser)
                               .get(isAuthenticatedUser,authorizeRoles('admin'),getUser)
                               .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
                               .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)


module.exports=router;
//intha (token) enkira parameter than resetPassword req handler la resetPasswordToken generate pannum pothu oru Hash 
// generate pannuroom illa  crypto vachu .update(req.params.token) atarku value vaaga kudukkuren athanala thevaipadukirathu