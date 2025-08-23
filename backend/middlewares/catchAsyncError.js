// module.exports=func=>(req,res,next)=>{
//   return  Promise.resolve(func(req,res,next)).catch(next)}
  
module.exports=func=>(req,res,next)=> //--> ithula function yai pass pannuren i mean arquiments haaga
       Promise.resolve(func(req,res,next)).catch(next)
                       //3 parameter aga anuppuren //ithu req yai aduth middleware kku pass pannidum ,adutha middleware aka irukkapogurathu vandhu error middleware than--143 error poi error generate panni vittudm

//=========================================================================================================
//
//
// ithu vandhu asynchronous error hai mattum eduthu error middeleware anuppudhu avvalavuthan inga work
//
//ithai productController la payanpadutha poren----21.1
//
//
//==========================================================================================================  