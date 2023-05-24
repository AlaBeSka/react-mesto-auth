import { Route, Routes, Link } from "react-router-dom";
import logo from "../images/header__title.svg";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <div className="header__condition">
        <h2 className="header__email">{email}</h2>
        <Routes>
          <Route
            path="/"
            element={
              <Link onClick={onLogout} to="/signin" className="header__link">
                Выйти
              </Link>
            }
          />
          <Route
            path="/mesto-react"
            element={
              <Link onClick={onLogout} to="/signin" className="header__link">
                Выйти
              </Link>
            }
          />
          <Route
            path="/signin"
            element={
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/signup"
            element={
              <Link to="/signin" className="header__link">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
