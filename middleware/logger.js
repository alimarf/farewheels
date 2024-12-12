const express = require("express");
const app = express();

const log = app.use((req, res, next) => {
  console.log("Logging...");
  next();
});

module.exports = log;
