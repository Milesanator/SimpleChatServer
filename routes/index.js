var express = require('express'),
   app = express(),
   http = require('http').Server(app),
   io = require('socket.io')(http),
   path = require('path');

app.get('/', function(req, res){
  res.render('index', {});
});

app.use(express.static(path.join(__dirname, '/../public')));

module.exports = app;

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
