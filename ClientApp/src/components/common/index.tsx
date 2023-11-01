import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';


const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID as string;
const container = document.getElementById("app-root")!;
const root = createRoot(container);

root.render(
  <Router> 
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{redirect_uri: window.location.origin}}
      >
        <App/>
      </Auth0Provider>
  </Router>
);
