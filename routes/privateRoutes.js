const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const escritorAuthenticaded = require("../middlewares/escritorAuthenticated")
const adminAutenticated = require("../middlewares/adminAuthenticated");

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/", escritorAuthenticaded, articleController.index);
router.get("/users",adminAutenticated, userController.indexUsers);


module.exports = router;
