const  express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors')

const  app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../react-client/dist/"));
app.use(bodyParser.json());


app.listen(3000, function () {
  console.log("listening on port 3000!");
});