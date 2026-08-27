import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import Head from '../components/Head';
import { Outlet } from 'react-router-dom';











const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <div className="app-shell">
      <div className="app-frame">
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <main className="app-main">
          <Head toggle={toggleMenu} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
