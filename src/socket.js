const { removeUserFromRoom } = require('../src/helpers/roomUsers');

const roomUsers = {};

module.exports = (db) => {
  
  const users = {};
  const manageSocket = function(socket, io) {

    console.log('New Connection');
    const id = socket.handshake.query.id;
    users[id] = socket.id;
    // console.log(socket.id);
    console.log(users);
  
    socket.on('join-room', ({ room, currentUser }, callback) => {
      if(!roomUsers[room]) roomUsers[room] = {};
      if(!roomUsers[room][currentUser.user.uid]) roomUsers[room][currentUser.user.uid] = currentUser;
      socket.join(room);
      callback(Object.values(roomUsers[room]));
      socket.to(room).emit('update-users', 
        { message: `${currentUser.firstName} ${currentUser.lastName} has joined!`, users: Object.values(roomUsers[room]) });

      console.log(`${currentUser.firstName} has joined`);

      socket.on('leave-room', ({ currentUser }, callback) => {
        delete roomUsers[room][currentUser.user.uid];
        socket.to(room).emit('update-users', 
          { message: `${currentUser.firstName} ${currentUser.lastName} left`, users: Object.values(roomUsers[room]) });
        socket.leave(room);
        socket.removeAllListeners('leave-room');
        console.log(`${currentUser.firstName} has left`);
      })
    });

    socket.on('send-message', ({ message, currentUser }) => {
      console.log(message);
    })

    socket.on('disconnect', () => {
      console.log('disconnected');
    })
  }

  return { manageSocket }
}