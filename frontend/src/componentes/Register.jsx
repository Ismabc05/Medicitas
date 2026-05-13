import React, { useState } from "react";
import "../estilos/register.css";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../utils/validateRegister";

export default function Register() {
  const navegar = useNavigate();

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleToLogin = (event) => {
    event.preventDefault();
    navegar("/");
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value
    });

    // limpiar error del campo mientras escribe
    setErrors((prev) => ({
      ...prev,
      [event.target.id]: ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateRegister(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError("");

    try {
      const response = await fetch(
        "https://curso-expressjs-production-a8af.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password
          })
        }
      );

      const data = await response.json();

    
      if (!response.ok) {
        setError(data.error || "Error al registrar usuario.");
        return;
      }

    
      setSuccess("Usuario creado correctamente.");

      setTimeout(() => {
        navegar("/");
      }, 1500);

    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay" />

      <div className="register-card">
        <h1 className="register-title">Crear cuenta</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="register-field">
            <label htmlFor="name">Nombre completo:</label>
            <input
              id="name"
              type="text"
              value={form.name}
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div className="register-field">
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

          {/* PASSWORD */}
          <div className="register-field">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={form.password}
              placeholder="Crea tu contraseña"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="register-field">
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              placeholder="Repite tu contraseña"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="register-button">
            Registrarse
          </button>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <p className="register-footer">
            ¿Ya tienes una cuenta?{" "}
            <span className="register-footer" onClick={handleToLogin}>Inicia sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Register };