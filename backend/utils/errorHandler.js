//error handle pannurem

                        //Error la than message enkira property kidaikkum -->|| 01 ||----
class ErrorHandler extends Error{   //-->error thagavalai uruvakkakudiya className ithu 
    constructor(message,statusCode){//-->constructor la enna vaikkaramalo adhai arquements aga kodukkalam
        super(message)              //message,statusCode ithu irandum parent constructor kku anuppanum //super nu parent oda constructor call pannanum
        this.statusCode=statusCode;//statusCode className kku intha statusCode set pannanum 
        Error.captureStackTrace(this,this.constructor)//-->stack vandhu error handler className la thevaipadukirathu    
    }             //ithu stack property yai kodukkum  11                  
      //naama kudakkakudiya object kku stack nu (property) onnai kodukkum
}
//-->captureStackTrace -->intha stack mulaiyamaga error enthaa itadhula irunthu generate aguthu ,entha mari error thagaval nu sollum,ella thagavalum error property la idaikkum
module.exports=ErrorHandler;   //-->error className oda constructor yai pass pannuren  


//ithai productcontroller la use panna poren

//-------------||  1  ||-----------------------------------------------