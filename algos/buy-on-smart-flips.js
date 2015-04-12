// 
// AAPL: 
// Randoms: (303 + 1667 + 81 + 578 + 302) / 5 = 

module.exports = {
    shouldBuy: function(vars) {
		if ((vars.price < vars.lastPrice && vars.direction === 'up' && vars.prevDirection === 'down')) {
			return true
		}
		
		return false;
    },
    shouldSell: function(vars) {
		if ((vars.price > vars.lastPrice && vars.direction === 'down' && vars.prevDirection === 'up')) {
			return true;
		}
		
        return false;
    }
};