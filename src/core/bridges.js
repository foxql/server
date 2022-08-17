const { io } = require("socket.io-client");

module.exports  = class {

    constructor(bridgeList, nodeHostAddress)
    {
        this.bridgeList = bridgeList
        this.nodeHostAddress = nodeHostAddress
        this.subscriptions = {}
    }


    registerBridgeList()
    {
        this.bridgeList.forEach(host => {
            const socket = io(host)
            socket.on('connect', function (){
                socket.emit('register', this.nodeHostAddress)
            })
            socket.on('transport', this.transportListener.bind(this))
            this.subscriptions[host] = socket
        });
    }   

    transportListener({appKey, ...data})
    {
        this.io.to(appKey).emit('eventSimulation', data)
    }

}