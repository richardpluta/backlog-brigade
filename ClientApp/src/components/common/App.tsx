import React, { Component, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../home/Home';
import ProfessionalMain from '../professional/ProfessionalMain';
import ClientMain from '../client/ClientMain';
import AdminMain from '../admin/AdminMain';
import UserProfileMain from '../profile/UserProfile';
import User from '../../models/userData';
import { GetCurrentUser } from '../../services/UserService';
import { useAuth0 } from '@auth0/auth0-react';
import { LoggedInUser } from '../../models/user/LoggedInUser';

export default function App() {
    const [user, setUser] = useState<User>();
    let {getAccessTokenSilently, user: auth0User} = useAuth0();

    const GetCurrentUserAuth0 = async () => {
      let user = await getAccessTokenSilently().then(async token => {
          return await GetCurrentUser(token, auth0User?.email).then((currentUser: LoggedInUser) => {
              return {
                  id:currentUser.id,
                  userType: currentUser.userType,
                  userName: currentUser.userName,
                  phoneNumber: currentUser.phoneNumber,
                  email: currentUser.email,
                  skillSet: currentUser.skillSet,
                  zip: currentUser.zip,
                  userRate: currentUser.userRate
              } as User;
          })
      })
  
      return user;
  }
  
    useEffect(() => {
      GetCurrentUserAuth0().then(user => setUser(user));
    }, []);

    return user ? (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professional" element = {<ProfessionalMain currentUser={user as User}/>}/>
          <Route path="/client" element = {<ClientMain/>}/>
          <Route path="/admin" element = {<AdminMain />}/>
          <Route path="/profile" element = {<UserProfileMain/>}/>
        </Routes>
      </Layout>
    ) : null;
}