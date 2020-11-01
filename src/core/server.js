const app = require('express')();
const clientModel = require('../models/client-model.js')
class server{

    eventList = require('../events.js');

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

    socketConnectionListener;

    constructor(socketConnectionListener) {
        this.socketConnectionListener = socketConnectionListener;
    }

    use(nameSpace, values)
    {
        if(this.avaliableUseKeys.includes(nameSpace)) this[nameSpace] = {...this[nameSpace], ...values}
    }

    open()
    {
        if(this.serverOptions.protocol == 'http'){
            this.server = require('http').createServer(app);
            this.io = require('socket.io')(this.server);

            this.io.on('connection', socket => {
                const id = socket.id;
                socket.connections = new clientModel();
                this.pushClient(id);

                this.loadEvents(socket);

                if(typeof this.socketConnectionListener === 'function'){
                    this.socketConnectionListener(socket);
                }
            })

            app.get('/', (req, res) => {
                res.send('<h1>Foxql.com</h1>');
            });
            this.server.listen(this.serverOptions.port, (req, res) => {
                console.log('Foxql server is running...');
            });
        }
    }

    loadEvents(socket)
    {
        this.eventList.forEach(event => {   
            socket.on(event.name, data => {event.listener(socket, this, data)});
        });
    }

    pushClient(id)
    {
        this.clients.push(id);
    }

    disconnectClient(id)
    {
        this.clients = this.clients.filter(e => e !== id)
    }

    pushEvent(event)
    {
        this.eventList.push(event);
    }
}

module.exports = server;