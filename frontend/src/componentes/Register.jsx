import React, { useState } from "react";
import "../estilos/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navegar = useNavigate()
    const [error, setError] = useState("");
    const [ form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    const handleToLogin = (event) => {
        event.preventDefault()
        navegar("/")
    }

    const handleChange = (event) => {
      setForm({
        ...form,
        [event.target.id]: event.target.value
      })
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      
      if(form.password !== form.confirmPassword) {
        setError("Las contraseñas no coinciden")
        return;
      }

      await fetch("https://curso-expressjs-production-8a8f.up.railway.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email:form.email,
          password: form.password
        }) 
      });

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

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="name">Nombre completo:</label>
            <input id="name" type="text" value={form.name} placeholder="Ingresa tu nombre" onChange={handleChange} />
          </div>

          <div className="register-field">
            <label htmlFor="email">Correo Electrónico:</label>
            <input id="email" type="email" value={form.email} placeholder="Ingresa tu email" onChange={handleChange} />
          </div>

          <div className="register-field">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={form.password}
              placeholder="Crea tu contraseña"
              onChange={handleChange}
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              placeholder="Repite tu contraseña"
              onChange={handleChange}
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