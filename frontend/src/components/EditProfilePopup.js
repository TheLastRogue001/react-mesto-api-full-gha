import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState("Сохранить");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading("Сохранение...");

    onUpdateUser(
      {
        name,
        about: description,
      },
      setIsLoading
    );
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
      onSubmit={handleSubmit}
      buttonText={isLoading}
    >
      <input
        id="name-input"
        className="popup__input"
        name="name"
        value={name ?? ""}
        onChange={handleSetName}
        type="text"
        min-length="2"
        max-length="40"
        placeholder="ФИО"
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="job-input"
        className="popup__input"
        name="job"
        type="text"
        value={description ?? ""}
        onChange={handleSetDescription}
        min-length="2"
        max-length="200"
        placeholder="Работа"
        required
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
