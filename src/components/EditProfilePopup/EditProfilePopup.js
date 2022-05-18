import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleUpdateName(event) {
    setName(event.target.value);
  }

  function handleUpdateDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }


  return(
    <PopupWithForm 
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      buttonText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        id="name"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        required
        onChange={handleUpdateName}
        value={name || ""}
      />
      <span id="name-error" className="popup__error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_about"
        id="about"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        required
        onChange={handleUpdateDescription}
        value={description || ""}
      />
      <span id="about-error" className="popup__error"></span>
    </PopupWithForm>
  )

 }

 export default EditProfilePopup;