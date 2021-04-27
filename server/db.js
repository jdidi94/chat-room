const mongoose = require("mongoose");
// connect your database
mongoose.connect("mongodb://localhost:27017/learnmongo", {
useNewUrlParser: true
});
