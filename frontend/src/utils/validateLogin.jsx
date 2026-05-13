const validateLogin = (form) => {
  const newErrors = {};

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

  return newErrors;
};


export { validateLogin }