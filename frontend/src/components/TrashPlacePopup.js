import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function TrashPlacePopup({ isOpen, onClose, CardDelete, card }) {
  const [submitButtonText, setSubmitButtonText] = useState("Да");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitButtonText("Удаление карточки...");

    CardDelete(card, setSubmitButtonText);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="trash"
      buttonText={submitButtonText}
    />
  );
}

export default TrashPlacePopup;
