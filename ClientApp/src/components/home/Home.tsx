import React, { Component, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../common/Profile";
import NavMenu from "../common/NavMenu";
import logo from "../../../public/assets/servicify_logo_nobackground.png";
import { Button } from "reactstrap";
import { LoggedInUser } from "../../models/user/LoggedInUser";
import { GetCurrentUser } from "../../services/UserService";
import CreateUserForm from "../profile/CreateUserForm";


const Home = () =>  {
  const  { getAccessTokenSilently, loginWithRedirect, user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          console.log(currentUser);
          setCurrentUser(currentUser);
        }).finally(() => setIsLoading(false));
      });
    })();
  }, []);

    if(!isLoading && isAuthenticated && currentUser != undefined)
    {
      return (
        <>
        <p>Welcome {currentUser?.userName}!</p>
        </>
      );
    }
    else if(!isLoading && isAuthenticated && currentUser == undefined)
    {
      return (
        <>
        <p>Welcome New User!</p>
        <p>Please Create Your Profile:</p>
        <CreateUserForm/>
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