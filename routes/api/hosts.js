const router = require("express").Router();

const Controller = require("../../controllers/api/host.ctrlr");

// Route To Get List Of Hosts
router.get("/:page/:limit", Controller.getHosts);


// Route To Update Host
router.put("/:id", Controller.update);

module.exports = router;
