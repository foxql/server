const name = 'upgrade';

async function listener(socket, network, nodeId)
{
    if(typeof nodeId !== 'string') return

    if(nodeId.length !== 36) return 

    const {id} = socket
    network.nodeIdMap[nodeId] = id
    network.clientMap[id] = nodeId
}


exports.name = name;
exports.listener = listener;