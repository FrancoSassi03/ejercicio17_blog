const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const userLoginAutenticated = require("../middlewares/userLoginAutenticated");

// Rutas relacionadas a los artículos:
// ...

router.get("/crear", articleController.create);
router.post("/", articleController.store);
router.get("/:id", articleController.show);
router.get("/editar/:id", userLoginAutenticated, articleController.edit);
router.patch("/:id", articleController.update);
router.delete("/:id",userLoginAutenticated, articleController.destroy);

module.exports = router;
