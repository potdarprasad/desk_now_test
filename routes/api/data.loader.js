const router = require("express").Router();
const Controller = require("../../controllers/api/data.loader.ctrl");

// Route To Save Bookings To Database
router.get("/saveBookings", Controller.saveBookings);

// Route To Save Hosts To Database
router.get("/saveHosts", Controller.saveHosts);

module.exports = router;
