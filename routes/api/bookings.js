const router = require("express").Router();

const Controller = require("../../controllers/api/booking.ctrlr");

// Method To Get List Of Bookings
router.get("/:page/:limit", Controller.getBookings);

module.exports = router;
