// Always Buy
// AAPL: 1.65
// Random: (68 + 132 + 169 + 103 + 117) / 5 = 117

module.exports = {
    shouldBuy: function(vars) {
        return true;
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice && vars.direction === 'down' && vars.prevDirection === 'up';
    }
};