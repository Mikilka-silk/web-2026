import React from "react";
import { useNavigate } from "react-router-dom";
import PositionAwareButton from "./PositionAwareButton";
import "../css/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">{children}</div>

        <div className="modal-buttons">
          <PositionAwareButton text="Продовжити" onClick={onClose} />
          <PositionAwareButton text="До кошика" onClick={handleGoToCart} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
