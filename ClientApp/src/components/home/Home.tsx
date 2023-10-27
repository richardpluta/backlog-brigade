import React, { Component } from "react";
import Test from "../test/Test";


class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <>
       <h3>Welcome to Servicify</h3>
       <Test/>
      </>
    );
  }
}

export default Home;