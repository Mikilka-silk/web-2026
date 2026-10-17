import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { artworks } from "../data/artworks";
import PositionAwareButton from "../components/PositionAwareButton";
import "../css/ItemPage.css"; // Створимо цей файл наступним

const ItemPage = () => {
  const { id } = useParams(); // Отримуємо ID з URL
  const navigate = useNavigate(); // Для кнопки "Назад"

  // Шукаємо картину в масиві за ID
  const item = artworks.find((art) => art.id === parseInt(id));

  // Стани для інтерактивних елементів (як вимагає 8 лаба)
  const [quantity, setQuantity] = useState(1);
  const [frameType, setFrameType] = useState("Без рами");

  const getFramePrice = (type) => {
    if (type === "Дерев'яна рама") return 30; //
    if (type === "Металева рама") return 50; //
    return 0; // Без рами
  };

  const framePrice = getFramePrice(frameType);
  const totalPrice = (item.price + framePrice) * quantity;

  // Захист від від'ємних чисел та нуля
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(""); // Дозволяємо стерти число, щоб ввести нове
    }
  };

  if (!item) {
    return (
      <div className="item-not-found">
        <h2>Картину не знайдено</h2>
        <button onClick={() => navigate("/catalog")}>
          Повернутися до каталогу
        </button>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1); // Повертає на попередню сторінку
  };

  const handleAddToCart = () => {
    // В 10-й лабі тут буде Redux, поки що просто alert
    alert(
      `Додано в кошик:\n${item.title}\nКількість: ${quantity}\nОформлення: ${frameType}`,
    );
  };

  return (
    <div className="item-page">
      <div className="item-content-wrapper">
        {/* Ліва частина: Зображення */}
        <div className="item-image-container">
          <img
            src={item.imageSrc}
            alt={item.title}
            className="item-full-image"
            style={{ objectPosition: item.focus || "center" }}
          />
        </div>

        {/* Права частина: Інформація */}
        <div className="item-details">
          <div className="item-badges">
            <span className="badge">{item.style}</span>
            <span className="badge">{item.artist}</span>
          </div>

          <h1 className="item-title">{item.title}</h1>
          <p className="item-description">{item.desc}</p>

          <div className="item-options">
            {/* Правильний блок кількості з нашим захистом */}
            <div className="option-group">
              <label>Кількість (репродукцій):</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityChange}
                className="item-input"
              />
            </div>

            {/* Блок вибору рами, який випадково зник */}
            <div className="option-group">
              <label>Оформлення:</label>
              <select
                value={frameType}
                onChange={(e) => setFrameType(e.target.value)}
                className="item-select"
              >
                <option value="Без рами">Без рами (полотно)</option>
                <option value="Дерев'яна рама">Дерев'яна рама (+$30)</option>
                <option value="Металева рама">Металева рама (+$50)</option>
              </select>
            </div>
          </div>

          <div className="item-purchase-area">
            <h2 className="item-price">Ціна: ${totalPrice || 0}</h2>
            <div className="item-buttons">
              <PositionAwareButton text="Назад" onClick={handleGoBack} />
              <PositionAwareButton
                text="Додати в кошик"
                onClick={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
