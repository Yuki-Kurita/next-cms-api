"use strict";

const express = require("express"),
  app = express(),
  router = require("./api/routes/index"),
  mongoose = require("mongoose"),
  dbURL = "mongodb://localhost:27017/next_cms";

mongoose.connect(
  dbURL,
  {useNewUrlParser: true}
);
mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);
// リクエストボディをJSONに変換する
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http:///localhost::${app.get("port")}`);
})