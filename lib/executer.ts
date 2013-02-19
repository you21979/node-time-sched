///<reference path='node.d'/>
import d = module('dependencies');
import sched = module('sched');
import ticker = module('ticker');
import task = module('task');

var taskExecuter:(arg:Function)=>void = d.createExecuter(0);

export class Executer{
    private is_run_:bool = false;
    private sched_:sched.Sched = new sched.Sched();
    private ticker_:ticker.Ticker = new ticker.Ticker();
    constructor(){
    }
    public stop():void{
        this.is_run_ = false;
    }
    public run():void{
        var self = this;
        self.is_run_ = true;
        self.ticker_.update();
        taskExecuter(function loop(){
            if(self.is_run_){
                var oldtick:number = self.ticker_.update();
                var nowtick:number = self.ticker_.tick();
                self.sched_.update(nowtick, oldtick);
                taskExecuter(loop);
            }
        });
    }
    public addTask(func:Function,wait_time:number):task.Task{
        return this.sched_.addTask(func, this.ticker_.futureTick(wait_time));
    }
}
var instance:Executer = null;
export function executer():Executer{
    if(instance){
        return instance;
    }
    return instance = new Executer();
}
