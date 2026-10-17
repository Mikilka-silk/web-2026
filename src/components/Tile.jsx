import React from "react";
import { useNavigate } from "react-router-dom"; // Імпортуємо хук для навігації
import PositionAwareButton from "./PositionAwareButton"; // Імпортуємо твою круту кнопку
import "../css/Tile.css";

const Tile = ({ id, title, desc, imageSrc, price, focus }) => {
  const navigate = useNavigate(); // Ініціалізуємо функцію навігації

  // Функція, яка спрацює при кліку на кнопку
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
      <p>{desc}</p>

      {/* Виводимо ціну, якщо вона передана */}
      {price && <p className="tile-price">Ціна: ${price}</p>}

      {/* Використовуємо твою анімовану кнопку замість звичайного посилання */}
      {id && (
        <div className="tile-actions">
          <PositionAwareButton text="Переглянути" onClick={handleViewMore} />
        </div>
      )}
    </div>
  );
};

export default Tile;
