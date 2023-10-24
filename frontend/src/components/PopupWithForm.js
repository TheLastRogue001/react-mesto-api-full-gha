const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  children,
}) => {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_size">
        <h2 className="popup__title popup__title_font-size">{title}</h2>
        <form
          className="popup__form"
          onSubmit={onSubmit}
          name={`popup-${name}`}
        >
          {children}
          <button
            aria-label={buttonText}
            type="submit"
            className="popup__button"
          >
            {buttonText}
          </button>
        </form>
        <button
          onClick={onClose}
          aria-label="Close"
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
