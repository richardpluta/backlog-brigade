import React, { Component } from "react";
import Test from "../test/Test";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../common/Profile";
import NavMenu from "../common/NavMenu";
import logo from "../../../public/assets/servicify_logo_nobackground.png";
import { Button } from "reactstrap";


const Home = () =>  {
  const  { loginWithRedirect, user, isAuthenticated } = useAuth0();
    
    if(isAuthenticated)
    {
      return (
        <>
        <NavMenu/>
        <p>Welcome {user?.name}!</p>
          <Profile/>
        </>
      );
    }
    return ( 
      <>
       <img
        src = {logo}
        alt="Welcome to Servicify"
        style={{width:"30%", margin:"auto", display:"block", padding:"20px" }}></img>
       <Button style={{margin:"auto", width:"10%", display:"block"}} onClick={() => loginWithRedirect()}>Login</Button>
       {/* <NavMenu />
       <Profile/> */}
       {/* <Test/> */}
      </>
    );
  
}

export default Home;