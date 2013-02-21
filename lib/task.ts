///<reference path='node.d'/>
import slist = module('slist');
export interface ITask extends slist.INode{
    func:Function;
    invoke_tick:number;
}
export function createTask(func:Function, invoke_tick:number):ITask{
    return {
        func : func,
        invoke_tick : invoke_tick,
        next : null
    };
}
