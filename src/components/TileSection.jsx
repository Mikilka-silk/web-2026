import React, { useState } from "react";
import Tile from "./Tile";
import PositionAwareButton from "./PositionAwareButton";
import { artworks } from "../data/artworks";
import "../css/Tile.css";

const TileSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="win-tile-section">
      <div className="tiles-grid">
        {/* Беремо частину масиву від 0 до visibleCount і виводимо через map */}
        {artworks.slice(0, visibleCount).map((art) => (
          <Tile
            key={art.id}
            id={art.id}
            title={art.title}
            desc={art.artist}
            imageSrc={art.imageSrc}
            price={art.price}
            focus={art.focus}
          />
        ))}
      </div>

      {visibleCount < artworks.length && (
        <div className="button-container">
          <PositionAwareButton
            text="Переглянути більше"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </section>
  );
};

export default TileSection;
