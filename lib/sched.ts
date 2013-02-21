///<reference path='node.d'/>
import d = module('dependencies');
import task = module('task');
import linkedlist = module('linkedlist');
function task_insert_cond(a:task.ITask, b:task.ITask):bool=>a.invoke_tick > b.invoke_tick;
class TaskList extends linkedlist.List{
    constructor(){
        super();
    }
    public insert(node:task.ITask):void{
        var head:task.ITask = <task.ITask>this.head_;
        var tail:task.ITask = <task.ITask>this.tail_;
        if(this.isEmpty()){
            this.pushHead(node);
        }else if(tail.invoke_tick < node.invoke_tick){
            this.pushTail(node);
        }else if(head.invoke_tick > node.invoke_tick){
            this.pushHead(node);
        }else{
            var target = this.scanTail((n:task.ITask)=>!task_insert_cond(n, node));
            this.insertAfter(target, node);
        }
    }
}
/**
 * Schedクラス
 * @class
 */ 
export class Sched{
    //private list_:linkedlist.List = new linkedlist.List();
    private lists_:TaskList[] = new Array(10);
    constructor(){
        var len:number = this.lists_.length;
        for(var i:number = 0; i<len; ++i){
            this.lists_[i] = new TaskList();
        }
    }
    public update(now:number, old:number):void{
        var no:number = Math.floor(now) % this.lists_.length;
        this.lists_[no].scanHead((v:task.ITask):bool=>{
            if(v.invoke_tick > now){
                return false;
            }
console.log(v.id);
            this.lists_[no].remove(v);
            if(v.func){
                v.func();
                v.func = null;
            }
            return true;
        });
    }
    public addTask(func:Function, invoke_tick:number):task.ITask{
        var t:task.ITask = task.createTask(func, invoke_tick);
        var no:number = Math.floor(invoke_tick) % this.lists_.length;
        this.lists_[no].insert(t);
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
//function task_insert_cond(a:task.ITask, b:task.ITask):bool=>a.invoke_tick <= b.invoke_tick;
