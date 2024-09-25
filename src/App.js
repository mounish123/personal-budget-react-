import React from 'react';
import './App.css';
import Axios from './Axios/Axios';
import PieChart from './PieChart/PieChart';

import { 
  BrowserRouter as Router,
   Switch,
   Route
 } from 'react-router-dom';


import AboutPage from './AboutPage/AboutPage';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className = 'mainContainer'>
        <Switch>
          <Route path="/about">
          <AboutPage/>
          </Route>
          <Route path="/axios"> {/* New route for Axios example */}
            <Axios/>
          </Route>
          <Route path="/login">
          <LoginPage/>
          </Route>
          <Route path="/">
          <HomePage/>
          </Route>
        </Switch>
      </div>

      <Footer/>
    </Router>
  );
}



export default App;
