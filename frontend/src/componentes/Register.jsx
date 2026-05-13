import React, { useState } from "react";
import "../estilos/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navegar = useNavigate();

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return newErrors;
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validate();

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

    // ❌ SI EL BACKEND DEVUELVE ERROR (email ya existe, etc.)
    if (!response.ok) {
      setError(data.error || "Error al registrar usuario");
      return;
    }

    // ✅ TODO OK → redirigir
    navegar("/");

  } catch (err) {
    setError("Error de conexión con el servidor");
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