// import React from "react";
// import axios from "axios"
// import {productsRequest,productsSuccess,productsFail} from "../slices/ProductsSlice"

// export const getProducts =(keyword,category,ratings,curentPage)=>async(dispatch) => {
// try{
// dispatch(productsRequest())
// let link = `/api/v1/products?page=${curentPage}`;
// if(keyword){
//     link +=`&keyword=${keyword}`
// }
// if(category){
//     link +=`&category=${category}`
// }
// if(ratings){
//   link +=`$ratings=${ratings}`
// }
//   const {data} =await axios.get(link)
// dispatch(productsSuccess(data))
// }  
// catch(error){
// dispatch(productsFail(error.response.data.message))
// }
// };

