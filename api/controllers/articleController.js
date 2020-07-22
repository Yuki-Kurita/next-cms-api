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
  }
}