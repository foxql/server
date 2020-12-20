module.exports = class {

    connections = [];

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

    drop(id)
    {
        this.connections = this.connections.filter(e => e !== id)
    }

    lenght()
    {
        return this.connections.length;
    }
}