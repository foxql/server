const name = 'offer';

async function listener(socket, network, payload)
{
    const to = payload.to;
    network.io.to(to).emit('offer', {
        from : socket.id,
        sdp : payload.offer
    });
}


exports.name = name;
exports.listener = listener;