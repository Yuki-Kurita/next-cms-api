const Article = require("../models/article"),
  httpStatus = require("http-status-codes"),
  getArticleParams = body => {
    return {
      title: body.title,
      content: body.content,
      tagId: body.tagId
    };
  };

module.exports = {
  getAll: (req, res, next) => {
    Article.find()
      .then(article => {
        res.locals.article = article;
        next();
      })
      .catch(err => {
        console.log(`Error fetching all articles: ${err.message}`);
        next(error);
      })
  },
  getById: (req, res, next) => {
    Article.findById(req.params.id)
      .then(article => {
        res.locals.article = article;
        next();
      })
      .catch(err => {
        // データがない場合はPass
        err.name === "CastError" ? next() : next(err);
      })
  },
  getByTagId: (req, res, next) => {
    // Tag情報からタグIDを取得
    const tagId = res.locals.tag._id;
    Article.find({tagId: tagId})
      .then(article => {
        res.locals.article = article;
        next();
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  },
  create: (req, res, next) => {
    // request bodyのtag nameをidに変換
    req.body.tagId = res.locals.tag._id;
    const articleParams = getArticleParams(req.body);
    Article.create(articleParams)
      .then(article => {
        res.json({
          status: httpStatus.CREATED,
          message: `Created : ${article}`
        });
      })
      .catch(err => {
        console.log(`Error saving article: ${err.message}`);
        next(err);
      })
  },
  update: (req, res, next) => {
    const articleId = req.params.id;
    req.body.tagId = res.locals.tag._id;
    const articleParams = getArticleParams(req.body);

    Article.findByIdAndUpdate(articleId, {
      $set: articleParams
    }, {
      runValidators: true
    })
    .then(article => {
      res.json({
        status: httpStatus.CREATED,
        message: `Before : ${article} => After : ${articleParams}`
      });
    })
    .catch(err => {
      console.log(`Error updating article by ID: ${err.message}`);
      next(err);
    })
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals.article
    });
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
    res.status(400).json({
      status: httpStatus.BAD_REQUEST,
      message: `Error saving article: ${err.message}`
    });
  }
}