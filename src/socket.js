const users = {};



module.exports = (db) => {

  const manageSocket = function(socket) {
    console.log('from the function', socket.id)

    socket.on('sendMessage', ({ message }) => {
      console.log('message send');
    })
  }


  return { manageSocket }
}