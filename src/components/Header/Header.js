import React from "react";
import headerLogo from "../../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип" />
      <Switch>
        <Route path="/sign-in">
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <button className="header__button" onClick={props.onSignOut}>
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;