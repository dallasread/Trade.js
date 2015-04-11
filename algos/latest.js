// 
// AAPL: 
// Randoms: () / 5 = 

module.exports = {
    shouldBuy: function(vars) {
        return vars.price < vars.lastPrice && vars.direction === 'up' && vars.prevDirection === 'down';
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice && vars.direction === 'down' && vars.prevDirection === 'up';
    }
};
