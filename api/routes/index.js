const router = require("express").Router(),
  articleRoutes = require("./articleRoutes");

router.use("/article", articleRoutes);

module.exports = router;