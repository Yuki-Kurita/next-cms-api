const router = require("express").Router(),
  tagController = require("../controllers/tagController");

router.get("/", tagController.getAll, tagController.respondJSON,
  tagController.errorJSON);

module.exports = router;