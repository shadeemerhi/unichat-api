const users = {};



module.exports = (db) => {

  const manageSocket = function(socket) {

    console.log('New Connection');

    const id = socket.handshake.query.id;
    users[id] = socket.id;
    console.log('socket users', users);

    socket.on('sendMessage', ({ message }) => {
      console.log('message sent from socket', socket.id);
    });

    socket.on('disconnect', () => {
      // delete users[id];
      console.log('Disconnected');
    })
  }


  return { manageSocket }
}