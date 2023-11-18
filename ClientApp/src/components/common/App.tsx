import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../home/Home';
import ProfessionalMain from '../professional/ProfessionalMain';
import ClientMain from '../client/ClientMain';
import AdminMain from '../admin/AdminMain';
import UserProfileMain from '../profile/UserProfile';
import UserProfileReadOnly from '../profile/UserProfileReadOnly';

export default class App extends Component {

  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professional" element = {<ProfessionalMain />}/>
          <Route path="/client" element = {<ClientMain/>}/>
          <Route path="/admin" element = {<AdminMain />}/>
          <Route path="/profile" element = {<UserProfileMain/>}/>
          <Route path="/profile/:id" element={<UserProfileReadOnly />} />
        </Routes>
      </Layout>
    );
  }
}