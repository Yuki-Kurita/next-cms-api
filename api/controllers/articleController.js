const Article = require("../models/article"),
  httpStatus = require("http-status-codes")

module.exports = {
  getAll: (req, res, next) => {
    Article.find()
      .then(articles => {
        res.locals.articles = articles;
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
    const tagName = req.params.tagName;
    Article.find({tagId: tagName})
      .then(artcle => {
        res.locals.artcle = artcle;
        next();
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (err, req, res, next) => {
    let errorObject;
    err ? errorObject = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message
    } : errorObject = {
      status: httpStatus.ACCEPTED,
      message: "Unknown error"
    }
    res.json(this.errorJSON);
  }
}