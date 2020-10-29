module.exports = class {

    offers = [];

    constructor()
    {

    }

    push(id)
    {
        if(!this.offers.includes(id)) this.offers.push(id);
    }

    list()
    {
        return this.offers;
    }

    drop(offerId)
    {
        this.offers = this.offers.filter(e => e !== offerId)
    }
}