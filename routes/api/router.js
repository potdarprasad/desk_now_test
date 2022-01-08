const express = require("express");
const app = express();

//All Routes Imported Here For APIs
app.use("/bookings", require("./bookings"));

app.use("/hosts", require("./hosts"));

app.use("/dataloader", require("./data.loader"));

module.exports = app; 
