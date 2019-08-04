var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Filter = require('bad-words'),
    filter = new Filter();

app.use(express.static(__dirname + '/public'));

//app.use(express.static('public'));
//
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', filter.clean(msg));
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
