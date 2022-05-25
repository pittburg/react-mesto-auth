import React from "react";
import { withRouter } from "react-router-dom";


function Login({ onLogin }) {
  const [authorizationEmail, setAuthorizationEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(event) {
    setAuthorizationEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(authorizationEmail, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login__input"
          placeholder="Email"
          minLength="6"
          maxLength="40"
          required
          autoComplete="off"
          name="name"
          value={authorizationEmail || ""}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          className="login__input"
          placeholder="Password"
          minLength="8"
          maxLength="200"
          required
          autoComplete="off"
          name="password"
          value={password || ""}
          onChange={handlePasswordChange}
        />
        <button className="login__button login__button-enter" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);