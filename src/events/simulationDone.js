const name = 'simulationDone';

async function listener(socket, network, event)
{
    const to = event.to || false;
    const target = event.targetListener || false;

    network.io.to(to).emit(target, socket.id);
}


exports.name = name;
exports.listener = listener;