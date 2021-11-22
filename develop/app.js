const foxql = require('../index.js');

const server = new foxql.server(connection, [
    'http://127.0.0.1:1923'
]);


server.use('serverOptions', {
    port : 1924,
    host : '0.0.0.0'
});

server.open();  


async function connection(socket)
{
    console.log('Birisi bağlandı!');
}
