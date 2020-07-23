const router = require("express").Router(),
  articleRoutes = require("./articleRoutes");
  tagRoutes = require("./tagRoutes");

router.use("/article", articleRoutes);
router.use("/tag", tagRoutes);

module.exports = router;