const sendToken=(user,statusCode,res)=>{

    //creating jwt token
    const token=user.getjwtToken();
//router yai pathukanga poroom athargu cookie set pannanu muthalla

//setting cookies
    const options={//-->ithai res la anuppanum
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ), //-->7days kalichu token expire agidum
    httpOnly:true, //-->intha cookie yai js ala use panna mudiyathu adarkuthan
    }

    res.status(statusCode).cookie('token',token,options) //-->login or register pannum pothu cookie varum
    .json({
        success:true,
        token,
        user
    })
}
module.exports=sendToken;//--|| 143-0||