module.exports = class {

    connections = [];
    offerSdp;

    constructor()
    {

    }

    push(id)
    {
        if(!this.connections.includes(id)) this.connections.push(id);
    }

    list()
    {
        return this.connections;
    }

    drop(offerId)
    {
        this.connections = this.connections.filter(e => e !== offerId)
    }
}