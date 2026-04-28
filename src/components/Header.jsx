import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import logoImg from '../assets/images/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <nav className="container">
        <div className="logo">
          <a href="/">
            <img src={logoImg} alt="조이킨더 로고" className="logo-img" />
            <div className="logo-text">
              조이킨더<span>어린이집</span>
            </div>
          </a>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#philosophy" onClick={() => setIsMenuOpen(false)}>교육철학</a></li>
          <li><a href="#rhythm" onClick={() => setIsMenuOpen(false)}>하루일과</a></li>
          <li><a href="#environment" onClick={() => setIsMenuOpen(false)}>교육환경</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>오시는길</a></li>
          <li className="login-link">
            <Link 
              to={isAuthenticated ? (user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/parent') : '/admin/login'} 
              onClick={() => setIsMenuOpen(false)}
            >
              {isAuthenticated ? '내 대시보드' : '통합 관리 포털'}
            </Link>
          </li>
        </ul>
        <div 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} 
          id="mobile-menu-btn"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
