///<reference path='node.d'/>
import executor = module('executor');
var e:Function = executor.executor.instance;
var f:Function = ()=>{console.log("x:"+process.uptime());}
/*
for(var i:number=0; i<6; ++i){
    console.log(e().addTask(f, i));
}
e().addTask(function(){
    process.exit(-1);
}, i);
e().run();
*/
var m = 0;
for(var i=0;i<10000;++i){
    e().addTask(function T(){
        console.log(e().addTask(T,0));
    }, 0);
}
e().run();
