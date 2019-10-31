var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var cors = require('cors');
const fs = require('fs');

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app,fs);

var server = app.listen(4000, function () {
    console.log("app running on port.", server.address().port);
});