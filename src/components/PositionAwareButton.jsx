import React, { useRef } from "react";
import "../css/PositionAwareButton.css";

const PositionAwareButton = ({ text, onClick }) => {
  const btnRef = useRef(null);
  const bgRef = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    bgRef.current.style.top = `${relY}px`;
    bgRef.current.style.left = `${relX}px`;
  };

  const handleMouseOut = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    bgRef.current.style.top = `${relY}px`;
    bgRef.current.style.left = `${relX}px`;
  };

  return (
    <button
      className="btn_aware"
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      onClick={onClick}
    >
      <span className="btn-text">{text}</span>
      <span className="btn-bg" ref={bgRef}></span>
    </button>
  );
};

export default PositionAwareButton;
