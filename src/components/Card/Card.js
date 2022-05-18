import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  //Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__trash ${isOwn ? 'card__trash_visible' : 'card__trash_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  

  return(
    <article className="card">
      <button type="button" className={`${cardDeleteButtonClassName} hover-button`} onClick={handleDeleteClick}></button>
      <div className="card__wrapper">
        <img className="card__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      </div>
      <div className="card__description">
        <h2 className="card__title overflow">{props.card.name}</h2>
        <div className="card__like-block">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;