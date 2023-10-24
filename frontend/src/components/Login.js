import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ onInfoAuth, handleLogin }) {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          handleLogin(formValue.email);
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        onInfoAuth(false);
      });
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" onSubmit={handleSubmit} name="login">
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
        <button onClick={handleSubmit} className="sign__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
