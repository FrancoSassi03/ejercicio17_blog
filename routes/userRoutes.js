const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminAutenticated = require("../middlewares/adminAuthenticated");

// Rutas relacionadas a los usuarios:
// ...

router.get("/crear", userController.create);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.get("/editar/:id",adminAutenticated, userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id",adminAutenticated, userController.destroy);

module.exports = router;
