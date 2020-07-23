const Tag = require("../models/tag"),
  httpStatus = require("http-status-codes");

module.exports = {
  // Tag名からTag情報を取得
  getByName: (req, res, next) => {
    // GETリクエスト時はpath, POSTリクエスト時はbodyから取得
    const tagName = req.params.tagName ?? req.body.tagName;
    Tag.findOne({tagName: tagName})
      .then(tag => {
        // 該当のタグがなければnullが入る -> nullならcasthandle
        res.locals.tag = tag;
        tag ? next() : next(err = {name: "CastError"});
      })
      .catch(err => {
        next(err);
      })
  }
}