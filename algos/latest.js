// 
// AAPL: 
// Randoms: () / 5 = 

module.exports = {
    shouldBuy: function(vars) {
        return (vars.price < vars.lastPrice && vars.direction === 'down') || (Math.abs(vars.price - vars.lastSoldPrice) > vars.price / 100);
    },
    shouldSell: function(vars) {
        return (vars.price < vars.lastPrice && vars.direction === 'up') || (Math.abs(vars.price - vars.lastBoughtPrice) > vars.price / 100);
    }
};
