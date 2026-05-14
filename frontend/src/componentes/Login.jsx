import React, { useState } from "react";
import "../estilos/login.css";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validateLogin";

export default function Login() {
  const navegar = useNavigate();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleToRegister = (event) => {
    event.preventDefault();
    navegar("/register");
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [event.target.id]: "",
    }));
  };

  const handleToLogin = async (event) => {
    event.preventDefault();

    const validationErrors = validateLogin(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://curso-expressjs-production-a8af.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Usuario o contraseña incorrectos");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      setTimeout(() => {
        if (data.user.role === "USER") {
          navegar("/home");
        } else {
          navegar("/control-panel");
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError("Error de conexion con el servidor");
      setLoading(false);
    }
  };

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
            {errors.email && <p className="error-text">{errors.email}</p>}
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
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <span className="button-loader"></span>
            ) : (
              "Ingresar"
            )}
          </button>

          {error && <p className="error-text">{error}</p>}

          <p className="login-footer">
            ¿No tienes una cuenta?{" "}
            <span className="login-footer-link" onClick={handleToRegister}>
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Login };