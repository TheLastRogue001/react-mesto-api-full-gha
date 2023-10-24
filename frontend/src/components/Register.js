import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Register({ onInfoAuth }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.password) {
      auth
        .register(formValue.email, formValue.password)
        .then((res) => {
          onInfoAuth(true);
          navigate("/signin", { replace: true });
        })
        .catch((err) => {
          if (err) onInfoAuth(false);
        });
    }
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" onSubmit={handleSubmit} name="register">
        <div className="sign__components">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
            className="sign__input"
          ></input>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
            className="sign__input"
          ></input>
        </div>
        <button
          aria-label="Регистрация"
          onClick={handleSubmit}
          type="submit"
          className="sign__button"
        >
          Зарегистрироваться
        </button>
      </form>
      <Link className="sign__caption" to="/signin">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
