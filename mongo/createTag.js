const mongoose = require("mongoose"),
  dbURL = "mongodb://localhost:27017/cms_db",
  Article = require("../api/models/tag");

mongoose.connect(
dbURL,
{useNewUrlParser: true}
);
mongoose.set("useCreateIndex", true);

const sampleTag1 = new Article({
  tagName: "Python"
});

const sampleTag2 = new Article({
  tagName: "Node.js"
});

sampleTag2.save()
  .then((savedDocument) => {
    console.log("Saved this document");
    console.log(savedDocument);
  })
  .catch(err => {
    console.log(err)
  });