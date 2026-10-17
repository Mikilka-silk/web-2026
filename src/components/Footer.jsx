import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="win-footer">
      <div className="footer-top">
        <div className="branding">
          <p>
            Цифрова галерея українського образотворчого мистецтва. Зберігаємо та
            популяризуємо культурну спадщину.
          </p>
        </div>
        <img
          src="/images/assets/logo_text.png"
          alt="Логотип Клаптик"
          className="footer-logo"
        />

        <div className="socials">
          <span className="soc-icon">F</span>
          <span className="soc-icon">X</span>
          <span className="soc-icon">In</span>
          <span className="soc-icon">G</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2026 Клаптик © Тут могла бути ваша реклама</p>
      </div>
    </footer>
  );
};

export default Footer;
