document.addEventListener("DOMContentLoaded", function() {

  var circles = document.getElementById('circles');
  var players = document.getElementById('players');
  var initials = '';

  var socket=io();
  //listen for server event
  socket.on('add-circle', function(data){
    addCircle(data);
  })

 socket.on('update-player-list', function (data){
    var playerList = '<li>' + data.join('</li><li>') +'</li>';
    players.innerHTML = playerList;
  });

  circles.addEventListener('click', function(evt) {

  socket.emit('add-circle',{
    initials: initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10,100),
    rgba: getRandomRGBA()
  });
});

  document.getElementsByTagName('button')[0].addEventListener('click', function() {
    circles.innerHTML = '';
  });

  while (initials.length < 2 || initials.length > 3) {
    initials = prompt("Please enter your initials").toUpperCase();

    if (initials.length > 1 && initials.length < 4){
      socket.emit('register-player', {initials: initials});
    }
  }


  function addCircle(data) {
    var el = document.createElement('div');
    el.style.left = data.x - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.top = data.y - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.width = el.style.height = data.dia + 'px';
    el.style.backgroundColor = data.rgba;
    el.style.fontSize = Math.floor(data.dia / 3) + 'px';
    el.style.color = 'white';
    el.style.textAlign = 'center';
    el.style.lineHeight = data.dia + 'px';
    el.innerHTML = data.initials;
    circles.appendChild(el);
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
      randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
  }

});
