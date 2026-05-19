// archivo de validaciones 


function isValidEmail(email) { // valida si el email contiene una @ y un .
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidName(name) { // valida si el nombre es de tipo string y tiene mas de 3 caracteres
  return typeof name === 'string' && name.length >= 3;
}

function isValidForCreate(id, users) { // valida que el id sea tipo numerico y que no existe otro usuario con ese id
    return typeof id === "number" && !users.some(user => user.id === id)
}

function isValidForUpdate(id, users) {
  return typeof id === "number" && users.some(user => user.id === id);
}

function validateUser(user, users, isUpdate= false) {
  const errors = []; // crea un array donde guardará los errores
  
  if (!isValidName(user.name)) { // si el resultado de la funcion no cumple con los requisitos
    errors.push("El nombre debe tener al menos tres caracteres"); // con .push añadiimos ese error al array creado
  }
  
  if (!isValidEmail(user.email)) {
    errors.push("El correo electrónico no es válido");
  }
  
  if (isUpdate) {
    if (!isValidForUpdate(user.id, users)) {
      errors.push("El ID debe existir para poder actualizar");
    }
  } else {
    if (!isValidForCreate(user.id, users)) {
      errors.push("El ID debe ser numérico y único");
    }
  }
  
  return {
    isValid: errors.length === 0, // retornamos isValid que será si no hay ningun error en errors
    errors: errors // y errors que contendrá los errores
  };
}



module.exports = {
    isValidEmail,
    isValidName,
    isValidForCreate,
    isValidForUpdate,
    validateUser
}