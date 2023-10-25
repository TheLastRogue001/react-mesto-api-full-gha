import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("Сохранить");

  const handleSetAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitButtonText("Сохранение...");

    onUpdateAvatar(avatar, setSubmitButtonText);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      buttonText={submitButtonText}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        className="popup__input"
        name="avatar"
        value={avatar ?? ""}
        onChange={handleSetAvatar}
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
