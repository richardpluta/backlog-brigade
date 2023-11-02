import React from "react";
import { Component } from "react";
import Profile from "../common/Profile";

class UserProfileMain extends Component {

    render() {
      return (
       <>
       <p>Main Profile page for users</p>
       <p>We can customize this by using the users' role to control what they can see</p>
       <Profile/>
       </>
      );
    }
  }

  export default UserProfileMain;