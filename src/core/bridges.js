const { io } = require("socket.io-client");

module.exports  = class {

    constructor(bridgeList)
    {
        this.bridgeList = bridgeList
        this.subscriptions = {}
    }


    registerBridgeList()
    {
        const nodeIpAddress = this.buildNodeIpAddress()
        this.bridgeList.forEach(host => {
            const socket = io(host)
            socket.on('connect', function (){
                socket.emit('register', nodeIpAddress)
            })
            socket.on('transport', this.transportListener.bind(this))
            this.subscriptions[host] = socket
        });
    }   

    transportListener({appKey, ...data})
    {
        this.io.to(appKey).emit('eventSimulation', data)
    }

    buildNodeIpAddress()
    {
        const {protocol, port} = this.serverOptions
        return {
            protocol, port
        }
    }

}