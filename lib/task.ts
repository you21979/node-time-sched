///<reference path='node.d'/>
import ticker = module('ticker');
var t:ticker.Ticker = new ticker.Ticker();
console.log(t);
t.update();
console.log(t);
console.log(t.futureTick(5));
