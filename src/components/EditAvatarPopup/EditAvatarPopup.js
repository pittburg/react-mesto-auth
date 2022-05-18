import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef({});

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({avatar: avatarRef.current.value});
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm 
      name={"avatar"} 
      title={"Обновить аватар"} 
      isOpen={props.isOpen} 
      buttonText={"Сохранить"} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} 
    >
      <input
        type="url"
        className="popup__input popup__input_type_link"
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        ref={avatarRef}
      />
      <span id="avatar-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;