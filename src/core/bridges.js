const { io, protocol } = require("socket.io-client");

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
            socket.on('transport', this.transportListener)
            this.subscriptions[host] = socket
        });
    }   

    transportListener(data)
    {
        //console.log(data)
    }

    buildNodeIpAddress()
    {
        const {protocol, port} = this.serverOptions
        return {
            protocol, port
        }
    }

}