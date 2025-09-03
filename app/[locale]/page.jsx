"use client";

import { useState, useEffect } from 'react'
import Navbar from "../components/navbar";
import Header from "../components/header";
import About from "../components/about";
import Work from "../components/work";
import Contact from "../components/contact";
import Experience from "../components/experience";
import Footer from "../components/footer";
const Homepage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [isDarkMode]);
  return (
    <main>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header isDarkMode={isDarkMode} />
      <About />
      <Work isDarkMode={isDarkMode} />
      <Experience isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </main>
  );
};

export default Homepage;
