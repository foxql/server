const app = require('express')();
const sha256 = require("crypto-js/sha256");

class server extends require('./bridges'){ 

    constructor(socketConnectionListener, bridgeList) {

        super(bridgeList)

        this.io = null;

        this.server = null;

        this.avaliableUseKeys = [
            'serverOptions'
        ];

        this.serverOptions = {
            port: 1923,
            host: '127.0.0.1',
            protocol : 'http'
        };

        this.clientMap = {};
        this.nodeIdMap = {};

        this.eventList = require('../events.js');

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
            this.io = require('socket.io')(this.server,{
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });

            this.io.on('connection', socket => {
                const {origin} = socket.request.headers;
                this.loadEvents(socket);

                if(typeof this.socketConnectionListener === 'function'){
                    this.socketConnectionListener(socket);
                }
            })

            app.get('/', (req, res) => {
                res.send('<h1>Foxql.com</h1>');
            });
            this.server.listen(this.serverOptions.port, (req, res) => {
                console.log('Foxql signalling server is running...');
                this.registerBridgeList()
            });
        }
    }

    loadEvents(socket)
    {
        this.eventList.forEach(event => {   
            socket.on(event.name, data => {event.listener(socket, this, data)});
        });
    }

    disconnectClient(id)
    {
        const nodeId = this.clientMap[id] || false

        if(nodeId){
            delete this.nodeIdMap[nodeId];
        }

        delete this.clientMap[id];
        
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

    encryptOrigin(origin)
    {
        return sha256(origin).toString()
    }

    findNode(id)
    {
        return this.nodeIdMap[id] || false
    }

    findNodeUuidKey(id)
    {
        return this.clientMap[id] || false
    }

    
}

module.exports = server;