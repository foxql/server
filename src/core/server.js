const app = require('express')();
class server{

    eventList = require('../events.js');

    serverOptions = {
        port: 1923,
        host: '127.0.0.1',
        protocol : 'http'
    };

    clientMap = {};

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
        if(this.clientMap[id] == undefined) this.clientMap[id] = [];
    }

    disconnectClient(id)
    {
        delete this.clientMap[id];
    }

    pushClientConnection(id, offerId)
    {
        if(this.clientMap[id]) this.clientMap[id].push(offerId);
    }

    getClientConnections(id)
    {
        return this.clientMap[id] || [];
    }

    dropClientConnection(id, offerId)
    {
        let connectionsList = this.getClientConnections(id);
        const findConnectionIndex = connectionsList.indexOf(offerId);
        if(findConnectionIndex > -1){
            this.clientMap[id] = connectionsList.splice(findConnectionIndex, 1)
        }
    }

    pushEvent(event)
    {
        this.eventList.push(event);
    }

    findAvaliableClient(id, count, connectionList)
    {
        const currentClients = Object.keys(this.clientMap);
        return currentClients.filter(e => {
            if(e !== id && !connectionList.includes(e)){
                const targetOfferConnectionList = this.getClientConnections(e)
                if(targetOfferConnectionList.includes(id)){
                    return false;
                }
                return true;
            }
        }).slice(0, count);
    }
}

module.exports = server;