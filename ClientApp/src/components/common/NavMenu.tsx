import React, { Component } from "react";
import {
  Collapse,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/servicify_logo_nobackground.png";
import {withAuth0, User, Auth0ContextInterface} from "@auth0/auth0-react";

const env = process.env.REACT_APP_ENVIRONMENT;
type NavProps = {
  auth0: Auth0ContextInterface<User>;
};

class NavMenu extends Component<NavProps> {
  static displayName = NavMenu.name;
  user?:User;

  state = {
    collapsed: true,
  };

  constructor(props: NavProps | Readonly<NavProps>) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
    this.user = this.props.auth0.user;
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    console.log("show nav");
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          container
          light
        >
          <NavbarBrand tag={Link} to="/">
            <img 
                alt="Servicify"
                src={logo}
                style={{
                    height: 150,
                    width: 150
                }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!this.state.collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  Home
                </NavLink>
              </NavItem>
               {/* TO DO: Once we have user roles/permissions set up restrict these to the correct roles: */}
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/professional">
                  Professionals
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/client">
                  Clients
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/admin">
                  Admins
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/profile">
                <img 
                alt="User Profile"
                src={this.user?.picture}
                style={{
                    height: 60,
                    width: 60,
                    borderRadius: "50%"
                }}
            />
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
export default withAuth0(NavMenu);