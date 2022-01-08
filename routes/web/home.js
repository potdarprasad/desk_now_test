const router = require("express").Router();
const Controller = require("../../controllers/web/home.ctrlr");

// Route To Render Home Page
router.get("/", Controller.renderPage);

module.exports = router;
