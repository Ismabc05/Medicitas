import React, { useState } from "react";
import "../estilos/register.css";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../utils/validateRegister";

export default function Register() {
  const navegar = useNavigate();

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ // este estado se encarga de guardar los valores de los inputs
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleToLogin = (event) => {
    event.preventDefault();
    navegar("/");
  };

  const handleChange = (event) => {
    setForm({ // actualizamos el estado con
      ...form, // lo que tenia antes
      [event.target.id]: event.target.value, // a cada id le agregamos el value
    });

    setErrors((prev) => ({ // tambien actualizamos setErrors
      ...prev, // lo que tenia antes
      [event.target.id]: "", // y lo dejamos en blanco
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateRegister(form); // le pasa el estado a la funcion para validar si hay errores

    if (Object.keys(validationErrors).length > 0) { // si la longitud de validationErrors es mayor que 0
      setErrors(validationErrors); /// actualizamos el estado con esos errores
      return;
    }

    // si no existe ningun error
    setErrors({}); // ponemos el estado vacio
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch( // hacemos la peticion
        "https://curso-expressjs-production-a8af.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ // le enviamos como cuerpo el estado donde guardamos los valores del input
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json(); // en data guardamos la respuesta del servidor

      if (!response.ok) {
        setError(data.error || "Error al registrar usuario.");
        setLoading(false);
        return;
      }

      setSuccess("Usuario creado correctamente.");

      setTimeout(() => {
        setLoading(false);
        navegar("/");
      }, 2000);
    } catch (err) {
      setError("Error de conexión con el servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay" />

      <div className="register-card">
        <h1 className="register-title">Crear cuenta</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="name">Nombre completo:</label>
            <input
              id="name"
              type="text"
              value={form.name}
              placeholder="Ingresa tu nombre"
              onChange={handleChange} // cuando cambie el valor del input llamamos a esa funcion
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

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

          <div className="register-field">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={form.password}
              placeholder="Crea tu contraseña"
              onChange={handleChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
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
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <span className="button-loader"></span> : "Registrarse"}
          </button>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <p className="register-footer">
            ¿Ya tienes una cuenta?{" "}
            <span className="register-footer-link" onClick={handleToLogin}>
              Inicia sesión
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export { Register };