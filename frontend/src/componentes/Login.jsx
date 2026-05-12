import React from "react";
import "../estilos/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navegar = useNavigate()

  const handleToRegister = (event) => {
    event.preventDefault()
    navegar("/register")
  }

  return (
    <div className="login-page">
      <div className="login-overlay" />

      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-icon">✱</span>
          <div className="login-logo-text">
            <span>MEDI</span>
            <span>CITAS</span>
          </div>
        </div>

        <h1 className="login-title">Bienvenido</h1>

        <form className="login-form">
          <div className="login-field">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña..."
            />
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>

          <p className="login-footer" onClick={handleToRegister}>
            ¿No tienes una cuenta? <a href="#">Regístrate aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Login }