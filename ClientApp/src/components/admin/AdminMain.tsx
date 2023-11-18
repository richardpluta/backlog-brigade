import React from "react";
import { Component } from "react";
import AdminUserView from "./AdminUserView";
import AdminListingsView from "./AdminListingsView";
import AdminHelpWantedsView from "./AdminHelpWantedsView";
import AdminReviewsView from "./AdminReviewsView";


class AdminMain extends Component {

    render() {
      return (
       <>
       <AdminUserView/>
       <AdminListingsView/>
       <AdminHelpWantedsView/>
       <AdminReviewsView/>
       </>
      );
    }
  }

  export default AdminMain;