import React, { Component, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../home/Home';
import ProfessionalMain from '../professional/ProfessionalMain';
import ClientMain from '../client/ClientMain';
import AdminMain from '../admin/AdminMain';
import UserProfileMain from '../profile/UserProfile';
import { LoggedInUser } from '../../models/user/LoggedInUser';

export default function App(){
	const [currentUser, setCurrentUser] = useState<LoggedInUser>();

    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />}/>
          <Route path="/professional" element = {<ProfessionalMain currentUser={currentUser}/>}/>
          <Route path="/client" element = {<ClientMain/>}/>
          <Route path="/admin" element = {<AdminMain />}/>
          <Route path="/profile" element = {<UserProfileMain/>}/>
          <Route path="/profile/:id" element={<UserProfileReadOnly />} />
        </Routes>
      </Layout>
    );
}