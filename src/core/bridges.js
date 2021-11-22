const { io } = require("socket.io-client");

module.exports  = class {

    constructor(bridgeList)
    {
        this.bridgeList = bridgeList
        this.subscriptions = {}
    }


    registerBridgeList()
    {
        this.bridgeList.forEach(host => {
            const socket = io(host)
            socket.on('connect', function (){
                socket.emit('register', host)
            })
            socket.on('transport', this.transportListener)
            this.subscriptions[host] = socket
        });
    }   

    transportListener(data)
    {
        console.log(data)
    }

}