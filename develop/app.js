const foxql = require('../index.js');

const server = new foxql.server(connection);


server.use('serverOptions', {
    port : 1923,
    host : '0.0.0.0'
});
server.open();  


async function connection(socket)
{
    console.log('Birisi bağlandı!');
}
