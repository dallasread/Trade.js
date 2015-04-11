// Simple Math
// AAPL: 127.04
// Randoms: (203 + 228 + 735 + 667 + 1564) / 5 = 679

module.exports = {
    shouldBuy: function(vars) {
        return vars.price < vars.lastPrice;
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice;
    }
}