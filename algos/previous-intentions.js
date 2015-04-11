// Previous Intentions
// AAPL: 127.04
// Randoms: (691 + 267 + 711 + 525 + 82) / 5 = 455

module.exports = {
    shouldBuy: function(vars) {
        return vars.price < vars.lastPrice && vars.prevDirection === 'up';
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice && vars.prevDirection === 'down';
    }
}