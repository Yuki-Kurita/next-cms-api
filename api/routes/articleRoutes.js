const router = require("express").Router(),
  articleController = require("../controllers/articleController.js")

router.get("/:id", articleController.getById,
  articleController.respondJSON, articleController.errorJSON);
router.get("/", articleController.getAll,
  articleController.respondJSON, articleController.errorJSON);

module.exports = router;