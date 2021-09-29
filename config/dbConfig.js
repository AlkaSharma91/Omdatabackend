//const config = require("./config");

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/omdatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("open", function (err) {
  if (!err) {
    console.log("Database Connected");
  } else {
    console.log("This is error", err);
  }
});

// module.exports.mongoose = mongoose;
// module.exports.db = db;

export {mongoose,db};



