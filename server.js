var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('app'));

app.listen(8000);