import React from "react";
import { Component } from "react";
import Profile from "../common/Profile";
import CreateUserForm from "./CreateUserForm";
import UpdateUserForm from "./UpdateUserForm";

class UserProfileMain extends Component {

    render() {
      return (
       <>
       <p>Main Profile page for users</p>
       <p>We can customize this by using the users' role to control what they can see</p>
       <Profile/>
       <p>Testing out create user form here:</p>
       <CreateUserForm/>

       <p>Testing out UPDATE USER form here</p>
       <UpdateUserForm/>
       </>
      );
    }
  }

  export default UserProfileMain;