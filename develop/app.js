const foxql = require('../index.js');


const port = process.argv[2] || 1924
const server = new foxql.server(connection, [
    'https://foxql-bridge.herokuapp.com' // bridge server url
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
