///<reference path='node.d'/>
import linkedlist = module('linkedlist');
export interface ITask extends linkedlist.INode{
    func:Function;
    invoke_tick:number;
}
export function createTask(func:Function, invoke_tick:number):ITask{
    return {
        func : func,
        invoke_tick : invoke_tick,
        next : null,
        prev : null
    };
}
