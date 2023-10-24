import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import * as auth from "../utils/auth";
import TrueImg from "../images/TrueImg.svg";
import FalseImg from "../images/FalseImg.svg";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import TrashPlacePopup from "./TrashPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTrashPopupOpen, setIsTrashPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardToTrash, setSelectedCardToTrash] = useState(null);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          console.log(res.email);
          setEmail(res.email);
          navigate("/", { replace: true });
        })
        .then(() => setLoggedIn(true))
        .catch((e) => {
          localStorage.removeItem("jwt");
          console.log(`Ошибка: ${e}`);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .getUserProfile()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка данных: ${err}`);
        });
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(`Ошибка данных: ${err}`);
        });
    }
  }, [loggedIn]);

  const handleCardLike = (likes, id) => {
    const isLiked = likes.some((i) => i._id === currentUser?._id);

    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Возникла ошибка с лайками: ${err}`);
      });
  };

  const handleCardDelete = (card, setSubmitButtonText) => {
    api
      .deleteCard(card?._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((cardItem) => card?._id !== cardItem._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при удалении карточки: ${err}`);
      })
      .finally(() => setSubmitButtonText("Да"));
  };

  const handleUpdateUser = ({ name, about }, setSubmitButtonText) => {
    api
      .updateUserProfile(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при получении данных  пользователя: ${err}`
        );
      })
      .finally(() => setSubmitButtonText("Сохранить"));
  };

  const handleUpdateAvatar = ({ avatar }, setSubmitButtonText) => {
    api
      .updateAvatarProfile(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при получении данных  пользователя: ${err}`
        );
      })
      .finally(() => setSubmitButtonText("Сохранить"));
  };

  const handleAddPlaceSubmit = ({ name, link }, setSubmitButtonText) => {
    api
      .createCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при получении данных  пользователя: ${err}`
        );
      })
      .finally(() => setSubmitButtonText("Создать"));
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const openInfoTooltip = (status) => {
    setIsInfoTooltipOpen(true);
    setIsSuccessInfoTooltipStatus(status);
  };

  const handleExitClick = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  const handleTrashClick = (card) => {
    setSelectedCardToTrash(card);
    setIsTrashPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleLogin = (email) => {
    setEmail(email);
    setLoggedIn(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTrashPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="layout">
          <Header onExitClick={handleExitClick} email={email} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onTrashClick={handleTrashClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={<Register onInfoAuth={openInfoTooltip} />}
            />
            <Route
              path="/signin"
              element={
                <Login handleLogin={handleLogin} onInfoAuth={openInfoTooltip} />
              }
            />
            <Route path="/*" element={<Navigate to="/signin" replace />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <TrashPlacePopup
            isOpen={isTrashPopupOpen}
            onClose={closeAllPopups}
            CardDelete={handleCardDelete}
            card={selectedCardToTrash}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            title={
              isSuccessInfoTooltipStatus
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }
            src={isSuccessInfoTooltipStatus ? TrueImg : FalseImg}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
