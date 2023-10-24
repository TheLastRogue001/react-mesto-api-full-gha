import Logo from "../images/logo_mesto.svg";
import Menu from "../images/menu.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ onExitClick, email }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Место" src={Logo} />
      <label className="header__label" htmlFor="info-header">
        <img alt="Menu" className="header__menu" src={Menu} />
      </label>
      <input
        className="header__checkbox"
        type="checkbox"
        name="menu"
        id="info-header"
      />
      <Routes>
        <Route
          path="/signin"
          element={
            <div className="header__components">
              <Link to="/signup" className="header__caption">
                Регистрация
              </Link>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="header__components">
              <Link to="/signin" className="header__caption">
                Войти
              </Link>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__components">
              <h2 className="header__email">{email}</h2>
              <Link to="/signin" onClick={onExitClick} className="header__caption">
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/*"
          element={
            <div className="header__components">
              <Link to="/signup" className="header__caption">
                Регистрация
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
