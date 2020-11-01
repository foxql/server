const name = 'disconnect';

exports.listener = (socket, server, data) => {
    const id = socket.id;

    server.disconnectClient(id);
}

exports.name = name;
