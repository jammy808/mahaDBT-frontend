import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import HeroSection from "./Sections/Hero/index";
import About from "./Sections/About/index";
import Services from "./Sections/Services/index";
import Testimonials from "./Sections/Testimonials/index";
import Contact from "./Sections/Contact/index";
import styled from "styled-components";

import { GlobalStyle } from './PageStyle/globalStyles';
import { Suspense } from 'react';
import ScrollToTop from './Components/ScrollToTop';
import Header from './Components/Header';
import Footer from './Components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

// install Swiper modules

function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/profile', {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <Suspense fallback={null}>
    <GlobalStyle />
    <ScrollToTop />
    <Header />
    <Container>
      <HeroSection />
      <About />
      {/* <Services /> */}
      <Testimonials />
      <Contact />
    </Container>
    <Footer />
  </Suspense>
  </>
  //   <div>
  //   <h1>Dashboard</h1>
  //   <div>
  //     {user ? (
  //       // If user is not null, go to profile section
  //       <button onClick={() => navigate('/profile')}>Profile</button>
  //     ) : (
  //       // If user is null, go to login
  //       <button onClick={() => navigate('/login')}>Login</button>
  //     )}
  //   </div>
  // </div>
  )
}

export default Dashboard