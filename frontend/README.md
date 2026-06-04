# 🩺 Frontend de Gestión de Citas Médicas

## 📋 Descripción

Este proyecto es el frontend de una aplicación de gestión de citas médicas desarrollado con **React.js**.

Permite a los usuarios registrarse, iniciar sesión, consultar horarios disponibles, reservar citas, cancelar reservas y gestionar la información de su perfil de forma sencilla e intuitiva.

La aplicación consume una API REST desarrollada con Node.js y Express.js para gestionar toda la lógica de negocio y el almacenamiento de datos.

---

# 🚀 Tecnologías utilizadas

## React.js

Biblioteca de JavaScript utilizada para construir interfaces de usuario dinámicas y reutilizables mediante componentes.

## React Router DOM

Utilizado para la navegación entre páginas sin necesidad de recargar la aplicación.

## React Hooks

Uso de:

* useState
* useEffect
* useNavigate

para la gestión de estados, efectos y navegación.

## Fetch API

Utilizada para realizar peticiones HTTP al backend.

## JWT Decode

Librería utilizada para obtener información del usuario autenticado a partir del token JWT.

## React Icons

Utilizada para incorporar iconografía moderna dentro de la interfaz.

## CSS3

Estilos personalizados para la construcción de una interfaz moderna, responsive y fácil de utilizar.

---

# 🎯 Funcionalidades principales

## Autenticación

* Registro de usuarios.
* Inicio de sesión.
* Persistencia de sesión mediante JWT.
* Cierre de sesión.

## Gestión de horarios

* Visualización de horarios disponibles.
* Identificación de horarios reservados.
* Consulta de la próxima disponibilidad.

## Reservas

* Crear reservas.
* Eliminar reservas.
* Actualización automática de la interfaz tras cada operación.

## Perfil de usuario

* Visualización de datos personales.
* Modificación del nombre.
* Modificación del correo electrónico.
* Cambio de contraseña.
* Validaciones de formularios.

## Experiencia de usuario

* Mensajes de éxito y error.
* Modales interactivos.
* Paginación de horarios.
* Indicadores de carga.
* Diseño responsive.

---

# 🏗️ Estructura del proyecto

```text
src/
│
├── componentes/
├── paginas/
├── estilos/
├── assets/
├── App.jsx
└── main.jsx
```

### Componentes

Elementos reutilizables de la interfaz.

### Páginas

Vistas principales de la aplicación.

### Estilos

Archivos CSS organizados por página o componente.

### Assets

Imágenes, iconos y recursos estáticos.

---

# 📡 Comunicación con la API

La aplicación se comunica con una API REST para:

## Usuarios

```http
POST /api/users/register
POST /api/users/login
GET /api/users/:id/user
PUT /api/users/edit-user/:id
```

## Reservas

```http
POST /api/reservations
DELETE /api/reservations/:id
```

## Horarios

```http
GET /api/admin/time-blocks
```

---

# 🎨 Características de la interfaz

## Dashboard principal

Permite visualizar:

* Información del usuario.
* Próxima disponibilidad.
* Horarios disponibles.
* Reservas activas.

## Modal de edición

Permite actualizar:

* Nombre.
* Correo electrónico.
* Contraseña.

Con validaciones integradas.

## Paginación

Los horarios disponibles se muestran en bloques de 4 elementos para mejorar la experiencia de navegación.

## Notificaciones

Mensajes temporales de:

* Éxito.
* Error.
* Validación.

Desaparecen automáticamente tras unos segundos.

---

# 🔒 Seguridad

La aplicación implementa:

* Almacenamiento seguro del token JWT.
* Protección de rutas privadas.
* Verificación de autenticación.
* Validación de formularios.
* Manejo de errores del servidor.

---

# ⚙️ Instalación

## Clonar el repositorio

```bash
git clone https://github.com/usuario/repositorio-frontend.git
```

## Instalar dependencias

```bash
npm install
```

## Iniciar aplicación

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

# 📱 Diseño Responsive

La interfaz ha sido diseñada para adaptarse a:

* Ordenadores.
* Tablets.
* Dispositivos móviles.

Garantizando una experiencia consistente en cualquier tamaño de pantalla.

---

# 📈 Mejoras futuras

* Modo oscuro.
* Recuperación de contraseña.
* Notificaciones en tiempo real.
* Calendario interactivo.
* Confirmación visual de reservas.
* Integración con correo electrónico.
* Panel de administración avanzado.
* Tests unitarios con Vitest y React Testing Library.

---

# 👨‍💻 Autor

Proyecto desarrollado con React.js como frontend de una aplicación de gestión de citas médicas, consumiendo una API REST desarrollada con Node.js, Express.js, Prisma ORM y PostgreSQL.
