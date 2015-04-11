// Random
// AAPL: Unknown
// Randoms: (223 + 248 - 49 + 74 - 13) / 5 = 96

module.exports = {
    shouldBuy: function(vars) {
        return Math.random() > 0.5;
    },
    shouldSell: function(vars) {
        return Math.random() > 0.5;
    }
}