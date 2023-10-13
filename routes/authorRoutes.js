const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// Rutas relacionadas a los usuarios:
// ...

router.get("/", authorController.index);
router.get("/crear", authorController.create);
router.post("/", authorController.store);
router.get("/:id", authorController.show);
router.get("/:id/editar", authorController.edit);
router.patch("/:id", authorController.update);
router.delete("/:id", authorController.destroy);

module.exports = router;
