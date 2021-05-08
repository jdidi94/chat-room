var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(4000);
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
      console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });
  });