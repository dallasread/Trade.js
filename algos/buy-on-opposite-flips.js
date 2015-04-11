// Buy On Opposite Flips
// AAPL: 128.71
// Randoms: (284 + 224 + 499 + 125 + 344) / 5 = 295

module.exports = {
    shouldBuy: function(vars) {
        return vars.price < vars.lastPrice && vars.direction === 'up' && vars.prevDirection !== vars.direction;
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice && vars.direction === 'down' && vars.prevDirection !== vars.direction;
    }
};