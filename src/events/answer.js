const name = 'answer';

async function listener(socket, network, payload)
{
    const {to, answer, signature} = payload

    const target = network.findNode(to)

    if(!target) return

    const myNodeId = network.findNodeUuidKey(socket.id)

    if(!myNodeId) return

    network.io.to(target).emit('answer', {
        from : myNodeId,
        sdp : answer,
        signature: signature
    });
}


exports.name = name;
exports.listener = listener;