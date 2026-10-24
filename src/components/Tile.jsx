import React from "react";
import { useNavigate } from "react-router-dom";
import PositionAwareButton from "./PositionAwareButton";
import "../css/Tile.css";

const Tile = ({ id, title, desc, imageSrc, price, focus }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="win-tile">
      <div className="tile-image-placeholder">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="tile-image"
            style={{ objectPosition: focus || "center" }}
          />
        ) : (
          <span className="img-icon">🖼️</span>
        )}
      </div>
      <h3>{title}</h3>

      {price && <p className="tile-price">Ціна: ${price}</p>}

      {id && (
        <div className="tile-actions">
          <PositionAwareButton text="Переглянути" onClick={handleViewMore} />
        </div>
      )}
    </div>
  );
};

export default Tile;
