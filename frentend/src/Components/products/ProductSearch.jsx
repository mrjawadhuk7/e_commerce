import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../actions/ProductActions";
import Loading from "../Layouts/loading/Loading";
import Products from "../products/Products";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import ReactPaginate from "react-paginate"
import { useParams } from "react-router-dom";



const ProductSearch=() => {

  
  const {products,loading,error,productsCount,resultPerPage} =useSelector((state)=>state.productsState)
   
  const [curentPage,setCurentPage]=useState(1);

  const [category,setCategory]=useState(null)

  const [ratings,setRating]=useState(0)

  const categories  = [
                'Electronics',
                "mobile phones",   //-->and thenfollow the currect letter
                'Laptops',
                'accessories',
                'headphones',
                'books',
                'foods',
                'clothes/shoes',
                'Beauty/health',
                'sports',
                'outdoor',
                'home'
  ]

//console.log((curentPage))//
const {keyword} =useParams()
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

//    dispatch(getProducts);
//   },[error,dispatch])
   dispatch(getProducts(keyword,category,ratings,curentPage));
  },[error,dispatch,curentPage,keyword,category,ratings])

  const totalPage=Math.ceil(productsCount / resultPerPage)
  return (
    <>
    
    {
      loading ? <Loading/> : 
      <>
      <MetaData title={'Buy best product'}/>
      <h1 id="products_heading">Search Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
      <div className="col-6 col-md-3 mb-5 mt-5">
        {/* price filter */}
        <div className="px-5">

        </div>
        <hr  className="my-5"/>
        {/* category filter */}
        <div className="mt-5">
         <h3 className="mb-3">Categories</h3>
         <ul className="">
          {
            categories.map(category=>

            <li style={{listStyleType:"none",
              cursor:"pointer"
            }}
            key={category}
            onClick={()=>{
              setCategory(category)
            }}
            >
                   {category}
            </li>

            )
          }
         </ul>
        </div>
        <hr className="my-5"/>
        {/* ratings filter */}
        <div>
          <h4>Ratings</h4>
          <ul className="">
          {
            [5,4,3,2,1].map(star=>

            <li style={{listStyleType:"none",
              cursor:"pointer"
            }}
            key={star}
            onClick={()=>{
              setRating(star)
            }}
            >
                  <div className="rating-outer">
                     <div className="rating-inner"   
                     style={{
                      width : `${star * 20}%`
                     }}
                     >
                     </div>
                  </div>
            </li>

            )
          }
         </ul>
        </div>
      </div>
       {
        products && products.map((product)=>  (//products,index
               
        <Products products={product} key={product._id}/>//key={product._id}
     
        ))
       }

       
      </div>
    </section>
      {
        productsCount > 0 &&  productsCount > resultPerPage ? 
    <div className="flex d-flex col justify-content-center mt-5">
        
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

export default ProductSearch;
