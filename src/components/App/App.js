import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/api";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import auth from "../../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [authorizationEmail, setAuthorizationEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, initialCards]) => {
          setCurrentUser(user);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(`Что-то не так: ${err}`);
        })
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setAuthorizationEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(`Что-то не так: ${err}`));
    }
  }, [history]);

  React.useEffect(() => {
    function closeByEsc(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, []);

  React.useEffect(() => {
    function closeByOverlay(event) {
      if (event.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("click", closeByOverlay);
    };
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
    .changeLikeCardStatus(card, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((err) => {
      console.log(`Что-то не так: ${err}`)
    })
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Что-то не так: ${err}`)
      })
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
     })
     .catch((err) => {
      console.log(`Что-то не так: ${err}`)
    })
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Что-то не так: ${err}`)
      });
  }
  
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Что-то не так: ${err}`)
      });
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({})
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        history.push("/sign-in");
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(`Что-то не так: ${err}`);
        setIsLoggedIn(false);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setAuthorizationEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(`Что-то не так: ${err}`);
        setIsLoggedIn(true);
        setIsInfoTooltipOpen(true);
        setIsLoggedIn(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setAuthorizationEmail("");
    history.push("/sign-in");
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header email={authorizationEmail} onSignOut={handleSignOut} />
      <Switch>
        <ProtectedRoute
          exact path="/"
          component={Main}
          loggedIn={isLoggedIn}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegistration} />
        </Route>
      </Switch>
      <Footer/>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        addNewCard={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name={"confirm"}
        title={"Вы уверены?"}
        isOpen={isConfirmPopupOpen}
        buttonText={"Да"}
        onClose={closeAllPopups}>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={isLoggedIn}
        onClose={closeAllPopups}
      />

    </div>
  </CurrentUserContext.Provider>
  )
}

export default App;