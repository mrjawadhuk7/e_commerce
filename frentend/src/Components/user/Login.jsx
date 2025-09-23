import React, { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData"
import { clearAuthError, login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../Layouts/loading/Loading";
// import {clearAuthError} from "../actions/userActions"



const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch = useDispatch();
    const location =useLocation()

    const navigate = useNavigate();
    const redirect = location.search?'/'+location.search.split('=')[1] : '/';
    const {loading,error,isAuthenticated} = useSelector(state=>state.authState)

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }
    useEffect(()=>{
        if(isAuthenticated){
            navigate(redirect)
        }
        if(error){
      
         toast(error,{
          position:"bottom-center",
          autoClose:3000,
          type:"error",
          onOpen:()=>{dispatch(clearAuthError())}

          // hideProgressBar: false, // progress bar visible
            // closeOnClick: true, // click panna close aagum
            // pauseOnHover: true, // mouse over panna stop aagum
            // draggable: true, // drag pannalam
            // theme: "red", // style (light/dark/colored)
         }

        )
         return; 

        }
      }
,[error,isAuthenticated,dispatch,redirect]
 )
  return (
    <>
    <MetaData title={`login`}/>
       <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                name="email"
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e=>setPassword(e.target.value )}
                name="password"
              />
            </div>

            <a href="#" className="float-right mb-4">Forgot Password?</a>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {
                loading ? "Loading..." : "login"
              }
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
</div>
    </>
    );
};

export default Login;
