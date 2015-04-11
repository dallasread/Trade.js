// Buy On Flips
// AAPL: 127.04
// Randoms: (303 + 1667 + 81 + 578 + 302) / 5 = 586

module.exports = {
    shouldBuy: function(vars) {
        return vars.price < vars.lastPrice && vars.direction === 'up' && vars.prevDirection === 'down';
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice && vars.direction === 'down' && vars.prevDirection === 'up';
    }
};