const name = 'upgrade';

async function listener(socket, network, {nodeId, dappAlias})
{
    if(typeof nodeId !== 'string' || typeof dappAlias !== 'string') return

    const normalizeAlias = dappAlias.toLowerCase().trim()

    if((normalizeAlias.length > 32 || normalizeAlias.length < 4) ) return 
    
    socket.join(
        network.encryptOrigin(dappAlias)
    )

    const {id} = socket
    network.nodeIdMap[nodeId] = id
    network.clientMap[id] = nodeId
}


exports.name = name;
exports.listener = listener;