import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/ProductsSlice";
import productReducer from "./slices/ProductSlice"
import { thunk } from "redux-thunk";
import authReducer from "./slices/authSlice"
const reducer = combineReducers({
  productsState:productsReducer,  
  productState:productReducer,
  authState:authReducer
})

const store = configureStore({
  reducer,
  middleware :getDefaultMiddleware => getDefaultMiddleware({
    thunk:{}
  })
  // middleware:()=>{
  //   return [thunk]
  // }
})
export default  store
