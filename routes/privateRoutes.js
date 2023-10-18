const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureIsAuthenticaded = require("../middlewares/ensureISAuthenticated")

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/", ensureIsAuthenticaded, articleController.index);


module.exports = router;
