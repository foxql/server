const foxql = require('../index.js');

const server = new foxql.server(connection);

server.open();  


async function connection(socket)
{
    //console.log('Birisi bağlandı!');
}
