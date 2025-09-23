
import axios from "axios"
import {productsRequest,productsSuccess,productsFail} from "../slices/ProductsSlice"//productc
import {productRequest,productSuccess,productFail} from "../slices/ProductSlice";//product


// products
export const getProducts =(keyword,category,ratings,curentPage)=>async(dispatch) => {
try{
dispatch(productsRequest())
let link = `/api/v1/products?page=${curentPage}`;
if(keyword){
    link +=`&keyword=${keyword}`
}
if(category){
    link +=`&category=${category}`
}
if(ratings){
  link +=`$ratings=${ratings}`
}
  const {data} =await axios.get(link)
dispatch(productsSuccess(data))
}  
catch(error){
dispatch(productsFail(error.response.data.message))
}
};



//product









export const getProduct =(id) => async (dispatch) => {
try{
dispatch(productRequest())
  const {data} = await axios.get(`/api/v1/product/${id}`)
dispatch(productSuccess(data))
}  
catch(error){
   dispatch(productFail(error.response.data.message))
}
};

