import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.addNewCard({place, link});
  }

  function handleUpdateAddPlace(event) {
    if (event.target.name === "place") {
      setPlace(event.target.value);
    } else
    if (event.target.name === "link") {
      setLink(event.target.value);
    }
  }

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);


  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      isOpen={props.isOpen}
      buttonText={"Создать"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_place"
        id="place"
        name="place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required
        value={place}
        onChange={handleUpdateAddPlace}
      />
      <span id="place-error" className="popup__error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_link"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        value={link}
        onChange={handleUpdateAddPlace}
      />
      <span id="link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;