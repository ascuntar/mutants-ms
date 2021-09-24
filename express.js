// Created By Eyder Ascuntar Rosales
const express = require("express");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const mutantRoute = require("./src/routes/mutant/mutantRoute");
const notFoundRoute = require("./src/routes/common/notFoundRoute");

const app = express();

app.use(cors());
// Permit All
app.options("*", cors());
// Select Permit
// app.use(
//   cors({
//     origin: 'http://localhost:4200'
//   })
// );

// ================= Morgan, middleware to get url of request, only on dev enviroment Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ================= Limit requests from same API
// const limiter = rateLimit({
//   max: 1,
//   windowMs: 60 * 60 * 1000, // One Hour
//   message:
//     'Demasiadas peticiones provenientes desde esta IP, por favor intente nuevamente en 1 hora!'
// });

// ================= Body parser, reading data from body into req.body
app.use(express.json());

// ================= To compress text response to clients
app.use(compression());

// ================= Ignore call favicon
app.use((req, res, next) => {
  if (req.url === "/favicon.ico") {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
});

// ================= Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// ================= Data sanitization against XSS
app.use(xss());

// ================= ROUTES DEFINITION
app.use("/api/v1/mutant", mutantRoute);
app.all("*", notFoundRoute);

module.exports = app;
