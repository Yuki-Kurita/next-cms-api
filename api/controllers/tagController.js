const Tag = require("../models/tag"),
  httpStatus = require("http-status-codes"),
  getTagParams = body => {
    return {
      tagName: body.tagName
    };
  };

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
  },
  getAll: (req, res, next) => {
    Tag.find()
      .then(tag => {
        res.locals.tag = tag;
        next();
      })
      .catch(err => {
        next(err);
      })
  },
  create: (req, res, next) => {
    // 投稿されたタグが存在しなければ追加
    Tag.find({tagName: req.body.tagName})
      .then(tag => {
        if (tag.length !== 0) {
          res.json({
            status: httpStatus.OK,
            message: `Already exist tag: ${tag}`
          });
        } else {
          const tagParams = getTagParams(req.body);
          Tag.create(tagParams)
            .then(tag => {
              res.status(201).json({
                status: httpStatus.CREATED,
                message: `Created : ${tag}`
              });
            })
            .catch(err => {
              next(err);
            })
        }
      })
      .catch(err => {
        next(err);
      })
  },
  respondJSON: (req, res) => {
    // tagがnullなら204を返す
    if (!res.locals.tag || res.locals.tag.length == 0) {
      res.status(204).json({
        status: httpStatus.NO_CONTENT,
        data: res.locals.article
      })
    } else {
      res.json({
        status: httpStatus.OK,
        data: res.locals.tag
      });
    }
  },
  errorJSON: (err, req, res, next) => {
    err ? res.status(500).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message
    }) : res.status(202).json({
      status: httpStatus.ACCEPTED,
      message: "Unknown error"
    });
  },
  errorPostJSON: (err, req, res, next) => {
    console.log(err);
    res.status(400).json({
      status: httpStatus.BAD_REQUEST,
      message: `Error saving tag: ${err.message}`
    });
  }
}