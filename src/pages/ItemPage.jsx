import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PositionAwareButton from "../components/PositionAwareButton";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import "../css/ItemPage.css";
import { getArtworkById } from "../api/itemsAPI";

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [frameType, setFrameType] = useState("Без рами");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArtwork = async () => {
      setIsLoading(true);
      try {
        const data = await getArtworkById(id);
        setArtwork(data);
      } catch (error) {
        console.error("Помилка завантаження картини", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const getFramePrice = (type) => {
    if (type === "Дерев'яна рама") return 30;
    if (type === "Металева рама") return 50;
    return 0;
  };

  if (isLoading) return <Loader />;

  if (!artwork) return <div className="error-message">Картину не знайдено</div>;

  const handleQuantityChange = (event) => {
    const val = parseInt(event.target.value, 10);
    if (val >= 1 && val <= 10) {
      setQuantity(val);
    }
  };

  const handleGoBack = () => {
    navigate("/catalog");
  };

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const framePrice = getFramePrice(frameType);
  const totalPrice = (artwork.price + framePrice) * quantity;

  return (
    <div className="item-page">
      <div className="item-content-wrapper">
        <div className="item-image-container">
          <img
            src={artwork.imageSrc}
            alt={artwork.title}
            className="item-full-image"
            style={{ objectPosition: artwork.focus || "center" }}
          />
        </div>

        <div className="item-details">
          <div className="item-badges">
            <span className="badge">{artwork.style}</span>
            <span className="badge">{artwork.artist}</span>
          </div>

          <h1 className="item-title">{artwork.title}</h1>
          <p className="item-description">{artwork.desc}</p>

          <div className="item-options">
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>
          Картину <strong>{artwork.title}</strong> ({frameType.toLowerCase()})
          додано в кошик!
        </p>
        <p>Кількість: {quantity}</p>
      </Modal>
    </div>
  );
};

export default ItemPage;
