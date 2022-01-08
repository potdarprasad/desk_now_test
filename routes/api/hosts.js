const router = require("express").Router();

const Controller = require("../../controllers/api/host.ctrlr");

// Method To Get List Of Bookings
router.get("/:page/:limit", Controller.getHosts);

module.exports = router;
