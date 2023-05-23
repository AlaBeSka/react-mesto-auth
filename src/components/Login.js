import React from "react";

function Login() {
  return (
    <div className="login">
      <form className="login__form" noValidate>
        <h2 className="login__title">Вход</h2>
        <input
          className="login__field"
          type="text"
          id="email-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Email"
          required
        ></input>
        <input
          className="login__field"
          type="text"
          id="password-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Пароль"
          required
        ></input>
        <button className="login__submit" type="submit" name="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
