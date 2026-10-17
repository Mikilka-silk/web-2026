import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  return (
    <header className="win-header">
      {/* Логотип зліва */}
      <Link to="/">
        <img
          src="/images/assets/logo_full.png"
          alt="Клаптик Лого"
          className="header-logo"
        />
      </Link>

      {/* Навігація по центру */}
      <nav className="nav-links">
        <Link to="/" className="nav-item">
          Головна
        </Link>
        <Link to="/catalog" className="nav-item">
          Каталог
        </Link>
        <Link to="/cart" className="nav-item">
          Кошик
        </Link>
      </nav>

      {/* Порожній блок справа для правильного центрування меню (flexbox) */}
      <div className="empty-space"></div>
    </header>
  );
};

export default Header;
