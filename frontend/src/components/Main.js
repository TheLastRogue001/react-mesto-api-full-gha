import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onTrashClick,
  onCardLike,
  cards,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar-button">
          <img
            className="profile__avatar"
            alt="Аватар"
            src={currentUser?.avatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Edit"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser?.about}</p>
        </div>
        <button
          aria-label="Add-button"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onTrashClick={onTrashClick}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
