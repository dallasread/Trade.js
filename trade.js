#!/usr/bin/env node

var algo = process.argv[2] || 'latest';
var mode = process.argv[3] || 'live';

var fs = require('fs');
var http = require('urllib-sync').request;
var touch = require('touch');
var mkdirp = require('mkdirp');
var algorithm = require('./algos/' + algo);
var rootPath = '/Users/thereads/apps/trade.js';
var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL%22)%0A%09%09&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=';
var vars = {};

mkdirp.sync(rootPath + '/vars/' + mode);
mkdirp.sync(rootPath + '/logs/' + mode);
touch.sync(rootPath + '/vars/' + mode + '/' + algo + '.json');
touch.sync(rootPath + '/logs/' + mode + '/' + algo + '.json');

function reset() {
    fs.writeFileSync(rootPath + '/logs/' + mode + '/' + algo + '.json', new Buffer(''));
    fs.writeFileSync(rootPath + '/logs/' + mode + '/' + algo + '.json', new Buffer(''));
    
    updateVars({
        'netWorth': 0,
        'trades': 0,
        'cash': 1000, 
        'price': 0,
        'shares': 0,
        'action': 'none',
        'lastPrice': 0,
        'lastBoughtPrice': 0,
        'lastSoldPrice': 0,
        'direction': "up",
        'mode': mode,
        'algo': algo
    });
}

function log(vars) {
    vars.createdAt = new Date();
    fs.appendFile(rootPath + '/logs/' + mode + '/' + algo + '.json', '\n' + JSON.stringify(vars));
	console.log(vars);
    return vars;
}

function updateVars(vars) {
    vars.price = Math.round(vars.price * 100) / 100;
    fs.writeFileSync(rootPath + '/vars/' + mode + '/' + algo + '.json', JSON.stringify(vars));
    return vars;
}

function sell(vars) {
    vars.action = 'sell';
    vars.cash += vars.price * vars.shares;
    vars.lastSoldPrice = vars.price;
    vars.lastPrice = vars.price;
    vars.shares = 0;
    vars.trades += 1;
    return vars;
}

function buy(vars) {
    vars.action = 'buy';
    vars.shares = parseInt(Math.floor(vars.cash / vars.price));
    vars.cash -= vars.price * vars.shares;
    vars.lastBoughtPrice = vars.price;
    vars.lastPrice = vars.price;
    vars.trades += 1;
    return vars;
}

function buyOrSell(vars) {
    vars.action = 'none';
    
    switch (true) {
        case (vars.newPrice > vars.price):
            vars.direction = 'up';
            break;
        case (vars.newPrice < vars.price):
            vars.direction = 'down';
            break;
    }
    
    oldPrice = vars.price;
    vars.price = vars.newPrice;
    delete vars.newPrice;
    
    if (vars.shares === 0 && oldPrice === 0) {
        buy(vars);
    } else if (vars.shares > 0 && algorithm.shouldSell(vars)) {
        sell(vars);
    } else if (vars.shares === 0 && algorithm.shouldBuy(vars)) {
        buy(vars);
    }
    
    vars.netWorth = vars.cash + (vars.price * vars.shares);
    
    updateVars(vars);
    log(vars);
    
    return vars;
}

function checkStock(price) {
    var vars = fs.readFileSync(rootPath + '/vars/' + mode + '/' + algo + '.json', 'utf8');
    vars = vars.length ? JSON.parse(vars) : {};

    vars.netWorth = vars.netWorth || vars.cash;
    vars.trades = vars.trades || 0;
    vars.cash = vars.cash || 1000;
    vars.price = vars.price || 0;
    vars.shares = vars.shares || 0;
    vars.action = vars.action || 'none';
    vars.direction = vars.direction || 'up';
    vars.prevDirection = vars.direction;
    vars.lastPrice = vars.lastPrice || 0;
    vars.lastBoughtPrice = vars.lastBoughtPrice || 0;
    vars.lastSoldPrice = vars.lastSoldPrice || 0;
    vars.mode = vars.mode || mode;
    vars.algo = vars.algo || algo;
    
    if (price) {
        vars.newPrice = parseFloat(price);
    } else {
        var request = http( url );
        var data = JSON.parse( request.data.toString() );
        vars.newPrice = parseFloat(data.query.results.quote.Ask);
    }

    vars = buyOrSell(vars);
    return vars;
}

function init() {
    var vars = {};
    
    switch (mode) {
        case 'aapl':
            reset();
            var apr_10_aapl = [125.63, 125.61, 125.61, 125.64, 125.89, 126.04, 126.17, 126.27, 126.35, 126.35, 126.22, 126.26, 126.28, 126.13, 126.24, 126.31, 126.31, 126.3 , 126.14, 126.16, 126.1 , 126.2 , 126.21, 126.21, 126.27, 126.29, 126.37, 126.49, 126.73, 126.6 , 126.6 , 126.66, 126.69, 126.66, 126.64, 126.62, 126.58, 126.58, 126.52, 126.52, 126.52, 126.59, 126.65, 126.65, 126.65, 126.67, 126.78, 126.79, 126.79, 126.75, 126.79, 126.79, 126.79, 126.85, 126.87, 126.86, 126.76, 126.81, 126.81, 126.79, 126.76, 126.7 , 126.7 , 126.65, 126.65, 126.65, 126.76, 126.78, 126.76, 126.76, 126.74, 126.81, 126.81, 126.76, 126.77, 126.76, 126.71, 126.73, 126.66, 126.66, 126.62, 126.45, 126.37, 126.41, 126.4 , 126.47, 126.47, 126.42, 126.42, 126.38, 126.45, 126.43, 126.3 , 126.3 , 126.3 , 126.32, 126.33, 126.31, 126.33, 126.24, 126.24, 126.22, 126.25, 126.34, 126.42, 126.46, 126.5 , 126.5 , 126.53, 126.52, 126.54, 126.6 , 126.51, 126.5 , 126.5 , 126.49, 126.51, 126.51, 126.51, 126.49, 126.54, 126.54, 126.52, 126.51, 126.51, 126.52, 126.59, 126.64, 126.64, 126.66, 126.63, 126.63, 126.61, 126.63, 126.63, 126.63, 126.63, 126.66, 126.66, 126.67, 126.65, 126.63, 126.63, 126.63, 126.61, 126.63, 126.62, 126.62, 126.69, 126.69, 126.76, 126.7 , 126.72, 126.7 , 126.72, 126.7 , 126.7 , 126.72, 126.75, 126.77, 126.81, 126.82, 126.84, 126.84, 126.87, 126.94, 126.97, 126.97, 127.08, 127.03, 127.03, 127.08, 127.07, 127.01, 126.95, 126.93, 126.91, 126.91, 126.83, 126.82, 126.86, 126.88, 126.93, 126.96, 126.96, 126.94, 126.85, 126.87, 126.89, 126.83, 126.81, 126.81, 126.83, 126.84, 126.89, 126.92, 127.02, 126.98, 126.98, 127.07, 127.13, 127.15, 127.07, 127.11, 127.16, 127.16, 127.14, 127.14, 127.14, 127.09, 127.14, 127.11, 127.11, 127.14, 127.13, 127.09, 127.1 , 127.05, 126.99, 126.99, 127	  , 126.99, 127	  , 127.03, 126.95, 127.03, 127.03, 126.92, 127.01, 126.98, 126.98, 127.07, 127.09, 127.09, 127.09, 126.97, 127.07, 127.08, 127.07, 127.01, 127.01, 127.08, 127.1 , 127.1 , 127.15, 127.21, 127.13, 127.13, 127.15, 127.09, 127.04, 127.03]
			// 5 is once a minute
			for (var n = 0; n < 10; n++) {
	            for (var i = 0; i < apr_10_aapl.length; i++) {
	                vars = checkStock( apr_10_aapl[i] );
	            }
			}
            break;
        case 'random':
            reset();
            var p = 30;
            for (var i = 0; i < 360; i++) {
                updown = Math.random() < 0.5 ? -1 : 1;
                p = Math.abs(p + (updown * Math.random()));
				p = p < 20 ? 20 : p;
                vars = checkStock( p );
            }
            break;
        default:
            vars = checkStock();
    }
    
    return vars;
}

var cash = 0;
if (mode === 'random') {
    var iterations = parseInt(process.argv[4] || 1);
    cash = 0;
    for (var i = 0; i < iterations; i++) {
        vars = init();
        cash += vars.cash;
    }
} else {
    vars = init();
}
console.log(vars);