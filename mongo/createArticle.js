const mongoose = require("mongoose"),
  dbURL = "mongodb://localhost:27017/cms_db",
  Article = require("../api/models/article");

mongoose.connect(
dbURL,
{useNewUrlParser: true}
);
mongoose.set("useCreateIndex", true);

const sampleArticle1 = new Article({
  title: "Python",
  content: "Machine learningとかで流行った",
  tagId: 2,
});

sampleArticle1.save()
  .then((savedDocument) => {
    console.log("Saved this document");
    console.log(savedDocument);
  })
  .catch(err => {
    console.log(err)
  });