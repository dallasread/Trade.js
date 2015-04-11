// 
// AAPL: 
// Randoms: () / 5 = 
// IF SIGNIFICANT JUMP

module.exports = {
    shouldBuy: function(vars) {
        return vars.price > vars.lastPrice && vars.direction === 'up' && vars.prevDirection === 'down';
    },
    shouldSell: function(vars) {
        return vars.price > vars.lastPrice && vars.direction === 'down' && vars.prevDirection === 'up';
    }
};