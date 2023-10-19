const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const ensureIsAuthenticaded = require("../middlewares/ensureISAuthenticated");
// Rutas relacionadas a los comentarios:
// ...

router.get("/", commentController.index);
router.get("/crear", commentController.create);
router.post("/", ensureIsAuthenticaded, commentController.store);
router.get("/:id", commentController.show);
router.get("/:id/editar", commentController.edit);
router.patch("/:id", commentController.update);
router.delete("/:id", commentController.destroy);

module.exports = router;
