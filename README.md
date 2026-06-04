# 🩺 Backend de Gestión de Citas Médicas

## 📋 Descripción

Este proyecto es una API REST desarrollada con **Node.js** y **Express.js** para la gestión de citas médicas.

Permite a los usuarios registrarse, iniciar sesión, reservar citas médicas, cancelar reservas y gestionar su perfil. Además, incluye funcionalidades de administración para la gestión de horarios disponibles.

El objetivo principal es proporcionar una solución sencilla y escalable para la organización de citas médicas mediante una arquitectura backend moderna.

---

# 🚀 Tecnologías utilizadas

## Node.js

Entorno de ejecución de JavaScript que permite desarrollar aplicaciones backend rápidas y eficientes.

## Express.js

Framework web para Node.js utilizado para la creación de rutas, controladores y gestión de peticiones HTTP.

## Prisma ORM

ORM moderno utilizado para interactuar con la base de datos mediante modelos y consultas tipadas.

## PostgreSQL

Base de datos relacional utilizada para almacenar usuarios, horarios y reservas.

## JWT (JSON Web Tokens)

Sistema de autenticación basado en tokens para proteger rutas privadas y verificar la identidad de los usuarios.

## bcrypt

Librería utilizada para el cifrado seguro de contraseñas antes de almacenarlas en la base de datos.

## Railway

Plataforma utilizada para el despliegue y alojamiento de la API.

---

# 🏗️ Arquitectura del proyecto

El proyecto sigue una arquitectura por capas:

```text
src/
│
├── controllers/
├── services/
├── routes/
├── middlewares/
├── prisma/
└── app.js
```

### Controllers

Gestionan las peticiones HTTP y las respuestas.

### Services

Contienen la lógica de negocio de la aplicación.

### Routes

Definen los endpoints disponibles en la API.

### Middlewares

Gestionan autenticación, validaciones y control de errores.

### Prisma

Configuración y modelos de la base de datos.

---

# 🔐 Funcionalidades principales

## Usuarios

* Registro de usuarios.
* Inicio de sesión.
* Autenticación mediante JWT.
* Consulta de perfil.
* Modificación de nombre.
* Modificación de correo electrónico.
* Cambio de contraseña.

## Reservas

* Crear reservas médicas.
* Consultar reservas de un usuario.
* Cancelar reservas.
* Evitar reservas duplicadas en un mismo horario.

## Horarios

* Consulta de horarios disponibles.
* Gestión de bloques horarios.
* Identificación de horarios reservados y libres.

---

# 📡 Endpoints principales

## Usuarios

```http
POST /api/users/register
```

Registrar un nuevo usuario.

```http
POST /api/users/login
```

Iniciar sesión.

```http
GET /api/users/:id/user
```

Obtener información de un usuario.

```http
PUT /api/users/edit-user/:id
```

Actualizar nombre, correo o contraseña.

---

## Reservas

```http
POST /api/reservations
```

Crear una reserva.

```http
DELETE /api/reservations/:id
```

Eliminar una reserva.

---

## Horarios

```http
GET /api/admin/time-blocks
```

Obtener todos los bloques horarios disponibles.

---

# 🔒 Seguridad

La API implementa diversas medidas de seguridad:

* Contraseñas cifradas con bcrypt.
* Autenticación mediante JWT.
* Protección de rutas privadas.
* Validación de datos de entrada.
* Gestión centralizada de errores.

---

# ⚙️ Instalación

## Clonar el repositorio

```bash
git clone https://github.com/usuario/repositorio.git
```

## Instalar dependencias

```bash
npm install
```

## Configurar variables de entorno

Crear un archivo `.env`:

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

## Ejecutar migraciones

```bash
npx prisma migrate dev
```

## Iniciar servidor

```bash
npm run dev
```

---

# 🗄️ Base de datos

La aplicación utiliza las siguientes entidades principales:

### User

* id
* name
* email
* password

### Appointment

* id
* date
* userId
* timeBlockId

### TimeBlock

* id
* startTime
* endTime

---

# 📈 Posibles mejoras futuras

* Recuperación de contraseña mediante email.
* Confirmación de reservas por correo electrónico.
* Panel de administración avanzado.
* Roles de usuario y administrador.
* Historial de citas médicas.
* Notificaciones en tiempo real.
* Documentación automática con Swagger.

---

# 👨‍💻 Autor

Desarrollado como proyecto de aprendizaje utilizando Node.js, Express.js, Prisma ORM y PostgreSQL para la gestión de citas médicas.
