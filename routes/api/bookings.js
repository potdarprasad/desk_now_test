const router = require("express").Router();

const Controller = require("../../controllers/api/booking.ctrlr");

// Route To Get List Of Bookings
router.get("/:page/:limit", Controller.getBookings);

// Route To Update Booking
router.put("/:id", Controller.update);

module.exports = router;
