const name = 'transport';

async function listener(socket, data)
{
    console.log('Transport listener is fired!')
}


exports.name = name;
exports.listener = listener;