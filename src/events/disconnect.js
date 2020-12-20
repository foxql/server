const name = 'disconnect';

async function listener(socket, network)
{
    const id = socket.id;

    const connectionList = socket.offers.list();
    if(connectionList.length > 0) {
        connectionList.forEach(socketId => {
           const connection = network.io.sockets.sockets[socketId] || false;
           if(!connection) return false;
           connection.offers.drop(id);
        });
    }

    socket.broadcast.emit('drop', id);
    network.disconnectClient(id);
}


exports.name = name;
exports.listener = listener;