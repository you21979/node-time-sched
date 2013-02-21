///<reference path='node.d'/>
import linkedlist = module('linkedlist');
/**
 *  
 */
var uniq:number = 0;
function uniqid():number{
    return ++uniq;
}
export interface ITask extends linkedlist.INode{
    id:number;          // taskid
    func:Function;      // 処理関数
    invoke_tick:number; // 呼び出し時刻
}
/**
 *
 */
export function createTask(func:Function, invoke_tick:number):ITask{
    return {
        id : uniqid(),
        func : func,
        invoke_tick : invoke_tick,
        next : null,
        prev : null
    };
}
