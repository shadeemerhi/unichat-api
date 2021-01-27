const { removeUserFromRoom } = require('../src/helpers/roomUsers');
const createMessage = require('../src/helpers/messages')().createMessage;

const roomUsers = {};

module.exports = () => {
  
  const users = {};
  const manageSocket = function(socket, io) {

    console.log('New Connection');
    const id = socket.handshake.query.id;
    users[id] = socket.id;
    // console.log(users);
  
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

    socket.on('send-message', ({ room, message, currentUser }) => {
      io.in(room).emit('message', 
        { text: message, id: currentUser.user.uid, firstName: currentUser.firstName, lastName: currentUser.lastName });
      createMessage(message);
    })

    socket.on('disconnect', () => {
      console.log('disconnected');
    })
  }

  return { manageSocket }
}