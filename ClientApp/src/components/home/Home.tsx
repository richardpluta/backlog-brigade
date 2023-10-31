import React, { Component } from "react";
import Test from "../test/Test";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../common/Profile";

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Login</button>;
}
class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <>
       <h3>Welcome to Servicify</h3>
       <LoginButton/>
       <Profile/>
       {/* <Test/> */}
      </>
    );
  }
}

export default Home;