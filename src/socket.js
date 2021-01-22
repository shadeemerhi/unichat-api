const { removeUserFromRoom } = require('../src/helpers/roomUsers');

const roomUsers = {};

module.exports = (db) => {
  
  const users = {};
  const manageSocket = function(socket, io) {

    console.log('New Connection');
    const id = socket.handshake.query.id;
    users[id] = socket.id;
    console.log(users);
  
    socket.on('join-room', ({ room, currentUser }, callback) => {
      if(!roomUsers[room]) roomUsers[room] = [];
      roomUsers[room].push(currentUser);
      socket.emit('update-users', roomUsers[room]);
      socket.to(room).emit('update-users', roomUsers[room]);
      socket.join(room);

      console.log(`${currentUser.firstName} has joined`);

      socket.on('leave-room', ({ currentUser }, callback) => {
        roomUsers[room] = removeUserFromRoom(roomUsers[room], currentUser.user.uid);
        callback(roomUsers[room]);
        socket.to(room).emit('update-users', roomUsers[room]);
        socket.leave(room);
        socket.removeAllListeners('leave-room');
        console.log(`${currentUser.firstName} has left`);
      })
    })
  }

  return { manageSocket }
}