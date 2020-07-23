const router = require("express").Router(),
  articleController = require("../controllers/articleController"),
  tagController = require("../controllers/tagController");

router.get("/tags/:tagName", tagController.getByName, articleController.getByTagId,
  articleController.respondJSON, articleController.errorJSON);
router.get("/:id", articleController.getById,
  articleController.respondJSON, articleController.errorJSON);
router.post("/", tagController.getByName, articleController.create);
router.get("/", articleController.getAll,
  articleController.respondJSON, articleController.errorJSON);

module.exports = router;