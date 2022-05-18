import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_modal ${props.card.link && 'popup_opened'}`}>
      <figure className="popup__figure">
        <button type="button" className="popup__close popup__close_modal hover-button" onClick={props.onClose}></button>
        <img className="popup__photo" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;