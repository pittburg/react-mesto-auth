import React from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
 

  return (
    <main className="main">
      <section className="profile width-container">
        <div className="profile__avatar" style={{backgroundImage: `url(${currentUser.avatar})`}}></div>
        <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__title overflow">{currentUser.name}</h1>
          <button type="button" className="profile__button profile__button_edit hover-button" onClick={props.onEditProfile}></button>
          <p className="profile__subtitle overflow">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button profile__button_add hover-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards-grid width-container">
        {props.cards.map(card => {
          return(
            <Card 
              key={card._id} 
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
        })}
      </section>

    </main>
  )
}

export default Main;