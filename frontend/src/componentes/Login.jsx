import React, { useState } from "react";
import "../estilos/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navegar = useNavigate()
  const [error, setError] = useState("")
  const [form, setForm ] = useState({
    email: "",
    password: ""
  })

  const handleToRegister = (event) => {
    event.preventDefault()
    navegar("/register")
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value
    })

    setError("")

  }

  const handleToLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        "https://curso-expressjs-production-a8af.up.railway.app/api/auth/login",
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Usuario o contraseña incorrectos");
        return;
      }

      localStorage.setItem("token", data.token);

      if(data.user.role === "USER") {
        navegar("/home")
      } else {
        navegar("/control-panel")
      }
      
    } catch (error) {
      setError("Error de conexion con el servidor")
    }
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

        <form className="login-form" onSubmit={handleToLogin}>
          <div className="login-field">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              id="email"
              type="email"
              value={form.email}
              placeholder="Ingresa tu email"
              onChange={handleChange}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={form.password}
              placeholder="Ingresa tu contraseña..."
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>

          {error && <p className="error-text">{error}</p>}

          <p className="login-footer">
            ¿No tienes una cuenta?{" "}
            <span className="login-footer" onClick={handleToRegister}>Regístrate aquí</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Login }