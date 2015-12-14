//io.js

var io = require('socket.io')();
var players = {};

io.on('connection', function (socket){
  socket.on('add-circle', function (data){
    io.emit('add-circle', data);
  });
  socket.on('clear', function(){
    io.emit('clear');
});

socket.on('register-player', function(data){
  players[data.initials] =  true;
  socket.initials = data.initials;
  io.emit('update-player-list', Object.keys(players));
});

socket.on('disconnect', function(data){
  delete players[socket.initials];
  io.emit('update-player-list', Object.keys(players));
});

});

module.exports = io;
