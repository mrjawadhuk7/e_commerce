import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {DropdownButton,Dropdown,Image } from "react-bootstrap";

const Header = () => {
const navigate=useNavigate()
const {isAuthenticated,user} =useSelector(state=>state.authState)

  return <div className="app">
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
               <img width="150px" src="/images/logo.png" alt="mr_jawadhu" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {
          isAuthenticated ? 
             (
              <Dropdown className="d-inline">
                      <Dropdown.Toggle variant="success" className="default text-white pr-5" id="dropdown-basic">
                          <figure className="avatar avatar-nav">
                            <Image width="50px" src={user.avatar ?? "./images/kakhasiHatake.jpg"}/>
                          </figure>
                          <span>{user.name}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        
                        {/* <Link to="/profile"> */}

                        <Dropdown.Item  as="button" className="text-danger" onClick={()=>{navigate("/profile")}}>Profile</Dropdown.Item>
                        {/* </Link> */}
                        <Dropdown.Item as="button" className="text-danger" >LogOut</Dropdown.Item>
                      </Dropdown.Menu>
                </Dropdown>
             ) 
               :<Link to='/login' className="btn" id="login_btn">Login</Link>
        }
        

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>
  </div>;
};

export default Header;
