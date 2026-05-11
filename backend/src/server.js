// server.js es el archivo encargado de iniciar el servidor, configurar el puerto y poner en marcha la aplicación
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor  corriendo")
});