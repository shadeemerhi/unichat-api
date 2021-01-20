module.exports = (db) => {
  
  const users = {};
  const manageSocket = function(socket, io) {

    console.log('New Connection');
    const id = socket.handshake.query.id;
    users[id] = socket.id;
    console.log(users);
  
    socket.on('sendMessage', ({ message }) => {
      console.log('message has happened');
      console.log('message sent from socket', socket.id);
  
      const socketId = users['SaRRezWfiUVEDXwYB0R614r3GkU2'];
      console.log(socketId);
      io.to(socketId).emit("hey", "I just met you");
  
      
    })
    
    socket.on('disconnect', () => {
      console.log('Disconnected');
    })
  }


  return { manageSocket }
}