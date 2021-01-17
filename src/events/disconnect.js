const name = 'disconnect';

async function listener(socket, network)
{
    const id = socket.id;

    const connectionList = network.getClientConnections(id);
    if(connectionList.length > 0) {
        connectionList.forEach(offerId => {
            network.dropClientConnection(offerId, id);
        });
    }

    socket.broadcast.emit('drop', id);
    network.disconnectClient(id);
}


exports.name = name;
exports.listener = listener;