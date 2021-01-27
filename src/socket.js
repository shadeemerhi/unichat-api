const { removeUserFromRoom } = require('../src/helpers/roomUsers');

const roomUsers = {};

module.exports = () => {
  
  const users = {};
  const manageSocket = function(db, socket, io) {
    
    const createMessage = require('../src/helpers/messages')(db).createMessage;
    console.log('New Connection');
    const id = socket.handshake.query.id;
    users[id] = socket.id;
  
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

    socket.on('send-message', ({ room_id, room, message, currentUser }) => {
      createMessage(room_id, currentUser.user.uid, message)
      .then(() => {
        io.in(room).emit('message', 
          { text: message, uid: currentUser.user.uid, firstName: currentUser.firstName, lastName: currentUser.lastName });
      });
    })

    socket.on('disconnect', () => {
      console.log('disconnected');
    })
  }

  return { manageSocket }
}