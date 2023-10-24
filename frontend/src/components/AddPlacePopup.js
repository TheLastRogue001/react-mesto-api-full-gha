import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [card, setCard] = useState("");
  const [link, setLink] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("Создать");

  const handleSetCard = (e) => {
    setCard(e.target.value);
  };

  const handleSetLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitButtonText("Создание карточки...");

    onAddPlace(
      {
        name: card,
        link,
      },
      setSubmitButtonText
    );
  };

  useEffect(() => {
    setCard("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="card"
      buttonText={submitButtonText}
      onSubmit={handleSubmit}
    >
      <input
        id="card-input"
        className="popup__input"
        name="card"
        type="text"
        value={card ?? ""}
        onChange={handleSetCard}
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required
      />
      <span className="popup__input-error card-input-error"></span>
      <input
        id="link-input"
        className="popup__input"
        name="link"
        value={link ?? ""}
        onChange={handleSetLink}
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
