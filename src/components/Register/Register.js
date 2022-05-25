import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register({onRegister}) {
  const [authorizationEmail, setAuthorizationEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setAuthorizationEmail("");
    setPassword("");
  }, []);

 function handleEmailChange(event) {
   setAuthorizationEmail(event.target.value);
 }

 function handlePasswordChange(event) {
   setPassword(event.target.value);
 }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(authorizationEmail, password);
 }

  return (
    <div>
      <div className="login">
        <form
          className="login__form"
          onSubmit={handleSubmit}
        >
          <h2 className="login__title">Регистрация</h2>
          <input
            required
            type="email"
            name="email"
            value={authorizationEmail || ""}
            onChange={handleEmailChange}
            placeholder="Email"
            id="email-input"
            className="login__input"
            minLength="6"
            maxLength="40"
            autoComplete="off"
          />
          <input
            required
            type="password"
            name="password"
            value={password || ""}
            onChange={handlePasswordChange}
            placeholder="Password"
            id="password-input"
            className="login__input"
            minLength="8"
            maxLength="200"
            autoComplete="off"
          />
          <button type="submit" className="login__button button">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="login__link link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Register);