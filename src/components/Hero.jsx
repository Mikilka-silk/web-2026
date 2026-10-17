import React from "react";
import PositionAwareButton from "./PositionAwareButton";
import "../css/Hero.css";

const Hero = () => {
  return (
    <section className="win-hero">
      <img
        src="/images/assets/hero_collage_artists.png"
        alt="Колекція українського живопису"
        className="hero-image"
      />

      <div className="hero-content">
        <h1>Український живопис</h1>
        <p>
          Відкрийте для себе унікальну колекцію творів українських майстрів.
          Пост-імпресіонізм, наївне мистецтво та реалізм у роботах видатних
          художників, що сформували національне мистецтво.
        </p>

        <div className="hero-button-wrapper">
          <PositionAwareButton text="Перейти до каталогу" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
