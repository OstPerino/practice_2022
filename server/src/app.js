"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Hello');
});
app.listen(3000);
// postgres
// example
// sudo docker-compose -f stack.yml up
