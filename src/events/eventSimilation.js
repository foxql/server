const name = 'eventSimulation';

async function listener(socket, network, event)
{
    socket.broadcast.emit('eventSimulation', event);
}


exports.name = name;
exports.listener = listener;