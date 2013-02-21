///<reference path='node.d'/>
import d = module('dependencies');
import task = module('task');
import linkedlist = module('linkedlist');
/**
 * Schedクラス
 * @class
 */ 
export class Sched{
    private list_:linkedlist.List = new linkedlist.List();
    private tick_:number = -1;
    constructor(){}
    public update(now:number, old:number):void{
        this.tick_ = now; 
        this.list_.scanHead((v:task.ITask):bool=>{
            if(v.invoke_tick > now){
                return false;
            }
            this.list_.remove(v);
            if(v.func){
                v.func();
                v.func = null;
            }
            return true;
        });
    }
    public addTask(func:Function, invoke_tick:number):task.ITask{
        var t:task.ITask = task.createTask(func, invoke_tick);
        this.list_.insertHeadCond(t, task_insert_cond);
        return t;
    }
    public removeTask(t:task.ITask):void{
        if(t){
            t.func = null;
        }
    }
}
function task_insert_cond(a:task.ITask, b:task.ITask):bool=>a.invoke_tick >= b.invoke_tick;
