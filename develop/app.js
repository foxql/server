const foxql = require('../index.js');


const port = process.argv[2] || 1924
const server = new foxql.server(connection, [
    'http://127.0.0.1:1923'
]);

server.use('serverOptions', {
    port : port,
    host : '0.0.0.0'
});

server.open();  


async function connection(socket)
{
    console.log('New Connection');
}
