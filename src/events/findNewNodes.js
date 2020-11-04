const name = 'findNewNodes';

exports.listener = (socket, server, length) => {
    const userId = socket.id;
    const userList = server.clientList(userId, length);

    if(userList.length <= 0) return false;

    server.io.to(socket.id).emit(name,  userList);
}

exports.name = name;
