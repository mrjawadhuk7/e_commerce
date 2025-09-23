//search functionality add panna popren http://locolhost:4000/api/v1/products?keyword=iphone 12

class APIFeatures{    //-->query ennana productController vandhu getProducts la Product.find()--ellathum eduthunu varum  ||33333||
                     //await yai vachu call pannalan aobject tharum athai--|| query |    enkira name la pass panna poren ||------
 constructor(query,queryStr){ //-->queryStr--     
   
  this.query=query;//--property vankuren--22222 2

   this.queryStr=queryStr; //this.query parameter assign pannikkiren
 }
 //search fuctionality ezhuatha poren //----|| SEERCH FUCTION CALL PANNA SEARCHING NADAKKANUM ||-----------
 search(){
       //itharku return pannuren .keyword.
    let keyword = this.queryStr.keyword ? { //22222 mela vanguna property keyword nu oru property kidaikum //ithu query parameter ooda name//serch pannum pothu anupura query parameter nane
        name:{                   //query la irukkura keyword value vai eduthukkum
            $regex:this.queryStr.keyword,//ithu db name field yai search pannum,x match agurathai eduthunu varum
            $options:'i'  //case pakka kudathu l & u
        }
      }:{};
      //keyword la if or else object varum ,varathai
      this.query.find({...keyword}) //mela irukkura query property la find() irukkum mongoose model //athula keyword object split panni pass pannuren
      return this; //indha object yai return pannuren  
      // page sammantha pattai podum and category filter sammandha pattathai podum affect aga kudathu athuku return panniduren//     
 }

// -------------------------------------------------------------------------------------------------------------------------
//ippa category filter panna poren || category kku etha mathiri product yai filter panni eduthunu varathukku
//---------------------------------------------------------------------------------------------------------------------------

filter(){       //mela irukkurathai copy pannitten
  const queryStrCopy ={...this.queryStr};//ithula keyword and some ellame ulla anuppi filter panni eduthukkalam,athargu than inga copy panni vachuoirukken
  //before
  //console.log(queryStrCopy) //--{keyword="iphone",category:"Accessory"}--remove agaama varum
//removing fields from query
//entha field remove pannureno athargana array field haa vachikkiren
  const removeFields=['keyword', 'limit', 'page']; //query str la ithu ellame remove pannittu category yai mattum anuppuren -find kku ulla
              //ippa varathuyaium remove pannuren and appurama varathaiyum remove pannuren  //pagination limit,page la athaiyum remove pnnuren
  removeFields.forEach(field=> delete queryStrCopy[field]);//-->ovvore field yaiyum loop panni delete pannuren
  //console.log(queryStrCopy);// ------{category:"Accessory"} ------remove agittu ipdi varum
  
  // this.query.find(queryStrCopy);//--query yai vachu find pannuren 

  //price filtering
  
  let queryStr=JSON.stringify(queryStrCopy);
  queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
 
  this.query.find(JSON.parse(queryStr));//--query yai vachu find pannuren 
  
  console.log(queryStr);
  
  
  return this

  //----------------------------------------------------------------------------------------------------------
  //ippa category yai currect haaga filter pannuthu
  //-----------------------------------------------------------------------------------------------------------
}



 //----------------------------------------------------------------------------------------------------------
  //ithu vandhu oru page kkana limit yai set panni vidum
  //-----------------------------------------------------------------------------------------------------------
//2
paginaate(resultPerPage){
  //second pge kku entha 2 data va kondu varanum nu solluran  
                          //mela irukkura query string hai eduthukkuren //ithula page enkira query prmeter kidaikum ,str to no convert
                   //current page irunthuchun eduthukum illana page 1 yai default aga eduthukkum
const currentPage=Number(this.queryStr.page) || 1 ;//-->current page ennanu therinju vachikiren 
     //skip vandhu current page kkana dta vaai edukkum
const skip =resultPerPage * (currentPage - 1);
             // 2 * 2 - 1 =4nu kidaikkum example kku
this.query.limit(resultPerPage).skip(skip)
           //fun  //value      //func  //constant
return this 
}

}
module.exports=APIFeatures;