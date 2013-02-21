///<reference path='node.d'/>
import d = module('dependencies');
import task = module('task');
import linkedlist = module('linkedlist');
/**
 * Schedクラス
 * @class
 */ 
export class Sched{
    //private list_:linkedlist.List = new linkedlist.List();
    private lists_:linkedlist.List[] = new Array(10);
    private tick_:number = -1;
    constructor(){
        var len:number = this.lists_.length;
        for(var i:number = 0; i<len; ++i){
            this.lists_[i] = new linkedlist.List();
        }
    }
    public update(now:number, old:number):void{
        this.tick_ = now; 
        this.lists_.forEach((list:linkedlist.List):void=>{
            list.scanHead((v:task.ITask):bool=>{
                if(v.invoke_tick > now){
                    return false;
                }
                list.remove(v);
                if(v.func){
                    v.func();
                    v.func = null;
                }
                return true;
            });
        });
    }
    public addTask(func:Function, invoke_tick:number):task.ITask{
        var t:task.ITask = task.createTask(func, invoke_tick);
        var no:number = Math.floor(invoke_tick) % this.lists_.length;
        this.lists_[no].insertHeadCond(t, task_insert_cond);
        return t;
    }
    public removeTask(t:task.ITask):void{
        if(t){
            t.func = null;
        }
    }
}
/**
 *
 */
function task_insert_cond(a:task.ITask, b:task.ITask):bool=>a.invoke_tick > b.invoke_tick;
