import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  return (
    <header className="win-header">
      <Link to="/">
        <img
          src="/images/assets/logo_full.png"
          alt="Клаптик Лого"
          className="header-logo"
        />
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Головна</NavLink>
        <NavLink to="/catalog">Каталог</NavLink>
        <NavLink to="/cart">Кошик</NavLink>
      </nav>

      <div className="empty-space"></div>
    </header>
  );
};

export default Header;
