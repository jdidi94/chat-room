const  express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/auth-routes")
const cors = require('cors')
const morgan = require("morgan");

const  app = express();
app.use(morgan("combined"));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");

const mongoUri = 'mongodb://localhost/pokemon';

const db=mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("hey i'm connected")
})

app.use(bodyParser.json());
app.use("/api/user", userRoutes);

app.listen(3000, function () {
  console.log("listening on port 3000!");
});