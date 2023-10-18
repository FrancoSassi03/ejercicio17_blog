const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rutas relacionadas a la parte pública del sitio web:
// ...
router.get("/login", authController.showLogin);
router.post("/login", authController.login);

router.get("/registro", authController.signup);
router.post("/registro", authController.createuser);

router.get("/logout", authController.logout);

module.exports = router;
