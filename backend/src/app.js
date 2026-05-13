const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const loggerMiddleware = require("./middlewares/logger");
const errorMiddleware = require("./middlewares/errorHandler");
const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(loggerMiddleware);
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(errorMiddleware);

module.exports = app;