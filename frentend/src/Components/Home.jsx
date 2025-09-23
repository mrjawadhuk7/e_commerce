import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "./actions/ProductActions";
import Loading from "./Layouts/loading/Loading";
import Products from "./products/Products";
import { toast } from "react-toastify";
import MetaData from "./layout/MetaData";
import ReactPaginate from "react-paginate"



const Home=() => {

  
  const {products,loading,error,productsCount,resultPerPage} =useSelector((state)=>state.productsState)
   
  const [curentPage,setCurentPage]=useState(1);
//console.log((curentPage))//
  const setCurentPageNo=(pageNo)=>{
    setCurentPage(Math.ceil(pageNo.selected+1));
  }

  const dispatch = useDispatch()
  useEffect(()=>{
    if(error){
  
     return toast.error(error,{
      position:"bottom-center",
      autoClose:3000,
      // hideProgressBar: false, // progress bar visible
        // closeOnClick: true, // click panna close aagum
        // pauseOnHover: true, // mouse over panna stop aagum
        // draggable: true, // drag pannalam
        // theme: "red", // style (light/dark/colored)
     })
    }

  //  dispatch(getProducts);
  // },[error,dispatch])
   dispatch(getProducts(null,null,null,curentPage));
  },[error,dispatch,curentPage])

  const totalPage=Math.ceil(productsCount / resultPerPage)
  return (
    <>
    
    {
      loading ? <Loading/> : 
      <>
      <MetaData title={'Buy best product'}/>
      <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
       {
        products && products.map((product)=>  (//products,index

        <Products products={product} key={product._id}/>//key={product._id}

        ))
       }

       
      </div>
    </section>
      {
        productsCount > 0 &&  productsCount > resultPerPage ? 
    <div className="d-flex flex-col justify-content-center mt-5">
        
    <ReactPaginate  
       onPageActive={curentPage}
       onPageChange={setCurentPageNo}
      //  pageCount={Math.ceil(productsCount/resultPerPage)}
      pageCount={totalPage}
      
       const itemsPerPage={resultPerPage}
       containerClassName={'page-item'}
       pageLinkClassName={'page-link'}
    />
    
    </div> : null   }

  </>
    }
    </>
  )
};

export default Home;
