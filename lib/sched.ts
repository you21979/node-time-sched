///<reference path='node.d'/>
import d = module('dependencies');
import task = module('task');
/**
 * Schedクラス
 * @class
 */ 
export class Sched{
    private list_:task.Task[] = [];
    private tick_:number = -1;
    constructor(){
    }
    public update(now:number, old:number):void{
        this.tick_ = now; 
        var remove:number[]= [];
        
        this.list_.some((v:task.Task, idx:number):bool=>{
            if(v.invoke_tick > now){
                return false;
            }
            if(v.func){
                v.func();
            }
            remove.push(idx);
            return true;
        });
        var self = this;
        remove.forEach((n:number)=>{
            self.list_.splice(n, 1);
        });
    }
    public addTask(func:Function, invoke_tick:number):task.Task{
        var t:task.Task = task.createTask(func, invoke_tick);
        this.list_.push(t);
        this.list_.sort((a:task.Task,b:task.Task)=>a.invoke_tick-b.invoke_tick);
        return t;
    }
    public removeTask(t:task.Task):void{
        if(t){
            t.func = null;
        }
    }
}
