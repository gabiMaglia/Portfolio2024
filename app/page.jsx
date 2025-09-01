"use client";

import Navbar from "./components/navbar";
import Header from "./components/header";
import About from "./components/about";
import Work from "./components/work";

const Homepage = () => {

  return (
   <main>
      <Navbar/>
      <Header/>
      <About />
      <Work/>
    </main>
  );
};

export default Homepage;
