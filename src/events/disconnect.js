const name = 'disconnect';

exports.listener = (socket, server, data) => {
    server.disconnectClient(socket.id);
}

exports.name = name;
