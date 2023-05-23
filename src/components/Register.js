import React from "react";
import { Link } from "react-router-dom";

function Register({onRegister}) {
  const [formValue, setFormValue] = React.useState({});

  function handleChange(e) {
    const  {name, value} = e.target;
    setFormValue({...formValue, [name]:  value});
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValue);
  }

  return (
    <div className="register">
      <form className="login__form" noValidate onSubmit={handleSubmit}>
        <h2 className="login__title">Регистрация</h2>
        <input
          className="login__field"
          type="text"
          id="email-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Email"
          required
          onChange={handleChange}
          value={formValue.email}
        ></input>
        <input
          className="login__field"
          type="text"
          id="password-field"
          minLength="2"
          maxLength="infinity"
          placeholder="Пароль"
          required
          onChange={handleChange}
          value={formValue.password}
        ></input>
        <button className="login__submit" type="submit" name="submit">
          Зарегистрироваться
        </button>
        <Link to='/sign-in' href="#" className="register__have-login">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
