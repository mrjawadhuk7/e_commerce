//-----------------------------------
//------|| iii ||--------------------
//-----------------------------------
//thirumba thirumba use pannura code yai thaniya oru file la uruvakkittu ,mt use pannikklam

const nodemailer=require('nodemailer');//email anuppurathu kkana orupackae & //email test pannurathukkana service yai provide pannuranga--mailtrap--
//email anuppurathukkana function yai ezhutha porn
                      //parameter-options
const sendEmail=async options =>{//mail anuppunum enkirathunala ithu vanthu async aga than irukkum
    const transport={ //ithula sila mukkiyama thagavalai irukkanum//thagavaloda name than (transport),//transport kku ulla object vaikkiren
        host:process.env.SMTP_HOST, //host sammantha patta data irukkum
        port:process.env.SMTP_POR,
        auth:{
            user:process.env.SMTP_USER,//email server kkana user
            pass:process.env.SMTP_PASS//email server kkana pass
            //ithu ellam vanthu epdi kidaikum na , nammakittaiye mail sammanthapatta server irukkum athula ella data von kuduthuduvanga illana,mailtrap nu onnu use pannalam

        }

    };//ithu vanthu email anuppurathukkama important thagavakl

    //create pannathai oru function kku ulla kodukka poren  install pana nodemailer la irukkura function la kodukka poren
   
                      //nm kku ulla createTransport irukku atharku ulla create panna transport info vai kodukkiren
    const transporter = nodemailer.createTransport(transport);//ithu vandhu mail yai anuppakudiya sathanam mathiri ready agidm
   const message={
        //entha mail la irunthu vanthu irukunu thagavalai kondu irukkum   
    from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      //to la- options vanthu function yai call pannum pothu anuppuvoom//enna name la anuppuvoom na( email )enkira name la anuppuvoom
    to: options.email,
    //subject enkira name la :options la subject enkira name la anuppurem
    subject:options.subject,
    //last one vanthu text:enkira name la :options la message enkira name la anuppurem ,so ithuthan body la kodukkura message
    text:options.message
   }               //sendMail method irukku athutan email send  pannurathu
   //ithu vanthu options enkirathula vanki duvoom
  await transporter.sendMail(message)
}
module.exports=sendEmail
