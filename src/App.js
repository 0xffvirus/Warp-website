import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import GameInfo from './components/GameInfo';
import Team from './components/Team';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import AdminPanel from './components/Admin/AdminPanel';
import { createGlobalStyle } from 'styled-components';
import emailjs from '@emailjs/browser';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background: #0a0a0a;
    color: #ffffff;
  }
`;

function App() {
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={
          <>
            <Hero />
            <GameInfo />
            <Team />
            <Feedback />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
