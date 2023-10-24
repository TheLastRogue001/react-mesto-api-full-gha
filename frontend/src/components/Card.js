import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onTrashClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser?._id;
  const isLiked = card.likes.some((i) => i._id === currentUser?._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card.likes, card._id);
  };

  const handleTrashClick = () => {
    onTrashClick(card);
  };

  return (
    <div className="element">
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          onClick={handleTrashClick}
          className="element__trash"
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="element__img"
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__content">
        <button
          type="button"
          aria-label="Нравится"
          onClick={handleLikeClick}
          className={cardLikeButtonClassName}
        />
        <p className="element__like-count">{card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
