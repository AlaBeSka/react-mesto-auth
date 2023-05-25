import React from "react";
import { Navigate } from "react-router-dom";

function Login({ onLogin, isLogin, isLoading }) {
  const [formValue, setFormValue] = React.useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.password || !formValue.email) {
      return;
    }
    onLogin(formValue);
  }

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input
          className="login__field"
          type="email"
          id="email-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Email"
          name="email"
          value={formValue.email || ""}
          onChange={handleChange}
          required
        ></input>
        <input
          className="login__field"
          type="password"
          id="password-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Пароль"
          name="password"
          value={formValue.password || ""}
          onChange={handleChange}
          required
        ></input>
        <button className="login__submit" type="submit" name="submit">
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
