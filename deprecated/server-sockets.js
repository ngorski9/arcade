const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var { Liquid } = require('liquidjs');
var engine = new Liquid({
    root: './templates/'
});
app.engine('liquid', engine.express()); 
app.set('view engine', 'liquid');
app.set('views', './templates/')

connections = {};

game_names = {
  0 : "Chuck E Cheese Memory Game"
}

app.get('/', (req, res) => {
  res.send("hello gamers");
});

app.get('/coin', (req, res) => {
  game = req.query.game_id;
  res.send("success")
  io.to(connections[game_id]).emit('start');
});

app.get('/machine', (req, res) => {
    game_id = req.query.game_id;
    res.render("insert_coin.liquid", {"game_id" : game_id, "machine_name" : game_names[game_id]})
});

io.on('connection', (socket) => {
  socket.on('identify', function(game_id){
    console.log(socket.id.toString() + " identified with " + game_id);
    connections[game_id] = socket.id;
  });
  console.log('a user connected');
  io.emit('query_name', null);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});