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