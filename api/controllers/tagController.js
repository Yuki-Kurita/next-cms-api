const Tag = require("../models/tag"),
  httpStatus = require("http-status-codes");

module.exports = {
  // Tag名からTag情報を取得
  getByName: (req, res, next) => {
    const tagName = req.params.tagName;
    Tag.findOne({tagName: tagName})
      .then(tag => {
        res.locals.tag = tag;
        next();
      })
      .catch(err => {
        next(err);
      })
  }
}