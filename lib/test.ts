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
var i = 0;
var r = ()=>++i
var m = 0;
(<any>console).time("test");
for(var i=0;i<100000;++i){
    var x = e().addTask(function T(){
        e().addTask(T,Math.random());
//    }, Math.random()*60);
    }, Math.random()*10);
}
(<any>console).timeEnd("test");

e().run();
//e().sched_.lists_.forEach((list)=>{console.log(list.length)});
//e().sched_.list_.scanHead((n)=>{console.log("%d id:%d",n.invoke_tick,n.id);return true});
