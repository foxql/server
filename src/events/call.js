const name = 'call';

async function listener(socket, network, size)
{
    const myId = socket.id;
    let findOffers = network.findAvaliableClient(myId, size, network.getClientConnections(myId));
    if(findOffers.length <= 0) return


    findOffers.forEach(offerId => {
        network.pushClientConnection(myId, offerId)
    });

    socket.emit('call', findOffers);
}


exports.name = name;
exports.listener = listener;