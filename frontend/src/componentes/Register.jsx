import React from "react";
import "../estilos/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navegar = useNavigate()

    const handleToLogin = (event) => {
        event.preventDefault()
        navegar("/")
    }
    
  return (
    <div className="register-page">
      <div className="register-overlay" />

      <div className="register-card">
        <div className="register-logo">
          <span className="register-logo-icon">✱</span>
          <div className="register-logo-text">
            <span>MEDI</span>
            <span>CITAS</span>
          </div>
        </div>

        <h1 className="register-title">Crear cuenta</h1>

        <form className="register-form">
          <div className="register-field">
            <label htmlFor="name">Nombre completo:</label>
            <input id="name" type="text" placeholder="Ingresa tu nombre" />
          </div>

          <div className="register-field">
            <label htmlFor="email">Correo Electrónico:</label>
            <input id="email" type="email" placeholder="Ingresa tu email" />
          </div>

          <div className="register-field">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              placeholder="Crea tu contraseña"
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repite tu contraseña"
            />
          </div>

          <button type="submit" className="register-button">
            Registrarse
          </button>

          <p className="register-footer" onClick={handleToLogin}>
            ¿Ya tienes una cuenta? <a href="#">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Register}