const name = 'answer';

async function listener(socket, network, payload)
{
    network.io.to(payload.to).emit('answer', {
        from : socket.id,
        sdp : payload.offer
    });
}


exports.name = name;
exports.listener = listener;