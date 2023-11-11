import React, { Component, useEffect, useState } from "react";
import Test from "../test/Test";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../common/Profile";
import NavMenu from "../common/NavMenu";
import logo from "../../../public/assets/servicify_logo_nobackground.png";
import { Button } from "reactstrap";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { GetCurrentUser } from "../../services/UserService";


const Home = () =>  {
  const  { getAccessTokenSilently, loginWithRedirect, user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          console.log(currentUser);
          setCurrentUser(currentUser);
        });
      });
    })();
  }, []);

    if(isAuthenticated)
    {
      return (
        <>
        <p>Welcome {currentUser?.userName}!</p>
        <Test/>
        </>
      );
    }
    else{
    return ( 
      <>
       <img
        src = {logo}
        alt="Welcome to Servicify"
        style={{width:"30%", margin:"auto", display:"block", padding:"20px" }}></img>
       <Button style={{margin:"auto", width:"10%", display:"block"}} onClick={() => loginWithRedirect()}>Login</Button>
      </>
    );
    }
  
}

export default Home;