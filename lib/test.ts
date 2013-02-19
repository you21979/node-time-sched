///<reference path='node.d'/>
import executer = module('executer');
var e:Function = executer.executer;
var f:Function = ()=>{console.log("x:"+process.uptime());}
for(var i:number=0; i<6; ++i){
    console.log(e().addTask(f, i));
}
e().addTask(function(){
    process.exit(-1);
}, i);
e().run();
