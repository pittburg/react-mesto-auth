import React from "react";
import successImage from "../../images/success_image.svg";
import unSuccessImage from "../../images/unsuccess_image.svg";

function InfoTooltip (props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close hover-button" onClick={props.onClose} />
        <img
          src={props.isSuccess ? successImage : unSuccessImage}
          alt={props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Регистрация не выполнена.'}
          className="popup__signup-icon"
        />
        <h3 className="popup__signup-title">
          {props.isSuccess? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;