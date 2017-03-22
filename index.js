var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./app/io')(io);

app.use(express.static('public'));

http.listen(process.env.PORT||3000);
console.log("running ...");
