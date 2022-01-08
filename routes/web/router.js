const express = require("express");
const app = express();

//All Routes Imported Here For APIs
app.use("/home", require("./home"));

module.exports = app;
