import React from "react";

function InfoTooltip({ isOpen, onClose, title, src }) {
  return (
    <div className={`popup popup_auth ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_center">
        <img className="popup__img-info" alt="Info" src={src} />
        <h2 className="popup__title popup__title_font-size">{title}</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
