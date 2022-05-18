import React from "react";

function PopupWithForm(props) {
  return(
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__content">
        <button type="button" className={`popup__close popup__close_${props.name} hover-button`} onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" id={`popup-${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button type="submit" className={`popup__button popup__button_${props.name}`}>{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;