const router = require("express").Router(),
  articleController = require("../controllers/articleController"),
  tagController = require("../controllers/tagController");

router.get("/tags/:tagName", tagController.getByName, articleController.getByTagId,
  articleController.castErrorHandle, articleController.respondJSON, articleController.errorJSON);
router.put("/:id", tagController.getByName, articleController.update,
  articleController.errorPostJSON);
router.delete("/:id", tagController.getByName, articleController.delete,
  articleController.errorPostJSON);
router.get("/:id", articleController.getById, articleController.castErrorHandle,
  articleController.respondJSON, articleController.errorJSON);
router.post("/", tagController.getByName, articleController.create,
  articleController.errorPostJSON);
router.get("/", articleController.getAll, articleController.castErrorHandle,
  articleController.respondJSON, articleController.errorJSON);

module.exports = router;