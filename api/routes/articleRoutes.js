const router = require("express").Router(),
  articleController = require("../controllers/articleController.js")

router.get("/", articleController.getAll, articleController.respondJSON);

module.exports = router;