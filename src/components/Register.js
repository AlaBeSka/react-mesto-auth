import React from "react";
import { Link, Navigate } from "react-router-dom";

function Register({ onRegister, isLogin, isLoading }) {
  const [formValue, setFormValue] = React.useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValue);
  }

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Регистрация</h2>
        <input
          className="login__field"
          type="email"
          id="email-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Email"
          required
          name="email"
          onChange={handleChange}
          value={formValue.email || ""}
        ></input>
        <input
          className="login__field"
          type="password"
          id="password-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Пароль"
          required
          name="password"
          onChange={handleChange}
          value={formValue.password || ""}
        ></input>
        <button className="login__submit" type="submit" name="submit">
          {isLoading ? "Регистрация..." : "Зарегестрироваться"}
        </button>
        <Link to="/signin" className="register__have-login">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
