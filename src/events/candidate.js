const name = 'candidate';

async function listener(socket, network, data)
{
    const to = data.to;
    network.io.to(to).emit(name, data);
}


exports.name = name;
exports.listener = listener;