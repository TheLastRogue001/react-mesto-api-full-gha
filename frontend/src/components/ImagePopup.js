function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_fullscreen ${card ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img src={card?.link} alt={card?.name} className="popup__img" />
        <h2 className="popup__title">{card?.name}</h2>
        <button
          aria-label="Close"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
