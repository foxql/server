const name = 'get-offer';

exports.listener = (socket, server, data) => {

    const id = socket.id;

    const clients = server.clients.filter(e => e !== id);

    
}

exports.name = name;
