const name = 'disconnect';

async function listener(socket, network)
{
    const id = socket.id;
    network.disconnectClient(id);
}


exports.name = name;
exports.listener = listener;