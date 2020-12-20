const name = 'call';

async function listener(socket, network, size)
{
    const myId = socket.id;
    const findOffers = network.findAvaliableClient(myId, size, socket.offers.list());
    if(findOffers.length <= 0) return

    findOffers.forEach(id => {
        socket.offers.push(id);
    });

    socket.emit('call', findOffers);
}


exports.name = name;
exports.listener = listener;