import React from "react";
import { Api } from "../utils/Api";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { options } from "../utils/constant";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

const api = new Api(options);

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [errorMassage, setErrorMessage] = React.useState("");
  const [cardToDelete, setCardToDelete] = React.useState(null);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfoProfile(), api.getInitialCards()])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const method = isLiked ? "deleteLike" : "setLike";
    api[method](card._id)
      .then((newCard) => {
        const index = cards.findIndex((c) => c._id === card._id);
        setCards((state) => {
          const newCards = [...state];
          newCards[index] = newCard;
          return newCards;
        });
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteCard(card) {
    setCardToDelete(card);
  }

  function confirmDeleteCard(e) {
    e.preventDefault();
    if (cardToDelete) {
      setIsLoading(true);
      api
        .deleteCard(cardToDelete._id)
        .then(() => {
          const index = cards.findIndex((c) => c._id === cardToDelete._id);
          const newCards = [...cards];
          newCards.splice(index, 1);
          setCards(newCards);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setCardToDelete(null);
          setIsLoading(false);
        });
    }
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlace(newCard) {
    setIsLoading(true);
    api
      .createCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsSuccessPopupOpen(false);
  }

  function regSuccess(successed) {
    setIsSuccessPopupOpen(true);
    setIsSuccess(successed);
  }

  function regError(err) {
    setErrorMessage(err);
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  function cbRegister(formValue) {
    setIsLoading(true);
    auth
      .register(formValue.email, formValue.password)
      .then((res) => {
        if (res.error === "Пользователь с таким email уже зарегистрирован") {
          regSuccess(false);
        } else {
          console.log(res);
          regSuccess(true);
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          regSuccess(false);
          console.log("Error: Email already taken");
        } else {
          regError(err);
        }
      })
      .finally(() => setIsLoading(false));
  }

  function login(formValue) {
    setIsLoading(true);

    auth
      .authorize(formValue.email, formValue.password)
      .then((res) => {
        if (res.token) {
          console.log(res);
          setLoggedIn(true);
          navigate("/", { replace: true });
          setUserData(formValue.email);
        } else {
          throw new Error("Неверный формат ответа сервера");
        }
      })
      .catch((err) => {
        console.log(err);
        regSuccess(false);
      })
      .finally(() => setIsLoading(false));
  }

  function logout() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("jwt");
  }

  if (
    !loggedIn &&
    location.pathname !== "/signin" &&
    location.pathname !== "/signup"
  ) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <InfoTooltip />
        <Header email={userData} onLogout={logout} />
        <Routes>
          <Route
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                handleCardClick={setSelectedCard}
                handleCardLike={handleCardLike}
                handleDeleteCard={handleDeleteCard}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={cbRegister}
                isLoading={isLoading}
                isLogin={loggedIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login onLogin={login} isLoading={isLoading} isLogin={loggedIn} />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <PopupWithForm
          name="delete-card-form"
          className="delete-card"
          title="Вы уверены?"
          submitText={isLoading ? "Удаление..." : "Да"}
          isOpen={!!cardToDelete}
          onClose={() => setCardToDelete(null)}
          onSubmit={confirmDeleteCard}
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          errorMessage={errorMassage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
