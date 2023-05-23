import { Route, Routes,Link } from "react-router-dom";
import logo from "../images/header__title.svg";

function Header({email, onLogout}) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <div className="header__condition">
        <h2 className="header__email">{email}</h2>
        <Routes>
          <Route path="/" element={<Link to ="/sign-in" className="header__link">Выйти</Link>} />
          <Route path="/mesto-react" onClick={onLogout} element={<Link to ="/sign-in" className="header__link">Выйти</Link>} />
          <Route path="/sign-in" element={<Link to ="/sign-up" className="header__link">Регистрация</Link>} />
          <Route path="/sign-un" element={<Link to ="/sign-in" className="header__link">Войти</Link>} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
