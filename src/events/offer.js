const name = 'offer';

async function listener(socket, network, payload)
{
    const {to, signature = ''} = payload;
   
    const target = network.findNode(to)

    if(!target) return
    
    const myNodeId = network.findNodeUuidKey(socket.id)

    if(!myNodeId) return
    
    network.io.to(target).emit('offer', {
        from : myNodeId,
        sdp : payload.offer,
        signature : signature
    });
}


exports.name = name;
exports.listener = listener;