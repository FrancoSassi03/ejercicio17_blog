const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Rutas relacionadas a los artículos:
// ...

router.get("/crear", articleController.create);
router.post("/", articleController.store);
router.get("/:id", articleController.show);
router.get("/:id/editar", articleController.edit);
router.patch("/:id", articleController.update);
router.get("/destroy/:id", articleController.destroy);

module.exports = router;
