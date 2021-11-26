const name = 'transport';

async function listener(socket, network)
{
    console.log('Transport listener is fired!')
}


exports.name = name;
exports.listener = listener;