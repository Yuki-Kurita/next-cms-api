const router = require("express").Router(),
  tagController = require("../controllers/tagController");

router.get("/", tagController.getAll, tagController.respondJSON,
  tagController.errorJSON);
router.post("/", tagController.create, tagController.errorPostJSON);

module.exports = router;