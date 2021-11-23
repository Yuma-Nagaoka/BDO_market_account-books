import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Book from './pages/Book'
import Header from './modules/Header'
import Footer from './modules/Footer'
import Home from './pages/Home'
import HowTo from './pages/HowTo'
import About from './pages/About'
import Credential from './pages/Credential'
import { StyledEngineProvider } from '@mui/material/styles';
// import Icon from '../title.png'

export default function App() {
  const style = {
    image: {
    },
  };
  return (
    <div className="App">
      {/* <div className="backGround"> */}
      <Router>
        <StyledEngineProvider injectFirst>
          <Header />
        </StyledEngineProvider>
        {/* <h1>黒い砂漠　統合取引所　帳簿</h1> */}
        {/* <div align="center">
          <img src={`${process.env.PUBLIC_URL}/title.png`} alt="Title"></img>3
        </div> */}
        <Route exact path="/" component={About} />
        <Route path="/About" component={About} />
        <Route path="/HowTo" component={HowTo} />
        <Route exact path="/AccountBooks" component={Home} />
        <Route path="/AccountBooks/:date" component={Book} />
        <Route path="/CredentialUpdate" component={Credential} />
        {/* <Route path="/xlsx" component={MakeXlsx} /> */}
        <Footer />
      </Router>
      
      {/* </div> */}
    </div>
  );
}