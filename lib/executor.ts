///<reference path='node.d'/>
import d = module('dependencies');
import sched = module('sched');
import ticker = module('ticker');
import task = module('task');
var DEFAULT_RESOLUTION:number = 0;
var taskExecutor:(arg:Function)=>void = d.createExecutor(DEFAULT_RESOLUTION);
/**
 *  実行クラス
 */
export class Executor{
    private is_run_:bool = false;
    private sched_:sched.Sched = new sched.Sched();
    private ticker_:ticker.Ticker = new ticker.Ticker();
    constructor(){
        this.ticker_.update();
    }
    public stop():void{
        this.is_run_ = false;
    }
    public run():void{
        this.is_run_ = true;
        this.ticker_.update();
        taskExecutor(function loop():void=>{
            if(this.is_run_){
                var oldtick:number = this.ticker_.update();
                var nowtick:number = this.ticker_.tick();
                this.sched_.update(nowtick, oldtick);
                taskExecutor(loop);
            }
        });
    }
    public addTask(func:Function,wait_time:number):task.ITask{
        return this.sched_.addTask(func, this.ticker_.futureTick(wait_time));
    }
}
export function initialize(resolution:number):void{
    taskExecutor = d.createExecutor(resolution);
}
export module executor{
    var instance_:Executor = null;
    export function instance():Executor{
        if(instance_){
            return instance_;
        }
        return instance_ = new Executor();
    }
}
