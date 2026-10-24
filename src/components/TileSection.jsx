import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import PositionAwareButton from "./PositionAwareButton";
import { getArtworks } from "../api/itemsAPI";
import Loader from "./Loader";
import "../css/Tile.css";

const TileSection = () => {
  const [artworks, setArtworks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const data = await getArtworks();
        setArtworks(data);
      } catch (error) {
        console.error("Помилка завантаження картин:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  if (isLoading) return <Loader />;

  return (
    <section className="win-tile-section">
      <div className="tiles-grid">
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
