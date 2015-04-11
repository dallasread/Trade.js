// Buy On Flips v2
// AAPL: 127.04
// Randoms: (343 + 689 + 444 + 468 + 803) / 5 = 549

module.exports = {
    shouldBuy: function(vars) {
        return vars.price < vars.lastPrice && vars.direction === 'down';
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice && vars.direction === 'up';
    }
};