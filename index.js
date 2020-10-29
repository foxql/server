const app = require('express')();
class server{

    eventList = require('./events.js');

    serverOptions = {
        port: 1923,
        host: '127.0.0.1',
        protocol : 'http'
    };

    clients = [];

    io;
    server;

    avaliableUseKeys = [
        'serverOptions'
    ];

    constructor() {}

    use(nameSpace, values)
    {
        if(this.avaliableUseKeys.includes(nameSpace)) this[nameSpace] = {...this[nameSpace], ...values}
    }

    open()
    {
        if(this.serverOptions.protocol == 'http'){
            this.server = require('http').createServer(app);
            this.io = require('socket.io')(this.server);
            app.get('/', (req, res) => {
                res.send('<h1>Foxql.com</h1>');
            });
            this.server.listen(this.serverOptions.port, (req, res) => {
                console.log('Foxql server is running...');
            });
        }
    }

    pushClient(id)
    {
        this.clients.push(id);
    }

    disconnectClient(id)
    {
        this.clients = this.clients.filter(e => e !== id)
    }
}

module.exports = server;