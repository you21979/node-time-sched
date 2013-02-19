///<reference path='node.d'/>
export interface Task{
    func:Function;
    invoke_tick:number;
}
export function createTask(func:Function, invoke_tick:number):Task{
    return {
        func : func,
        invoke_tick : invoke_tick
    };
}
