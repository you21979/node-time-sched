///<reference path='node.d'/>
export function tick():number=>process.uptime()
export function createExecutor( resolution:number ):(arg:Function)=>void{
    if(resolution === 0){
        if(global.setImmediate){
            return (func:Function):void=>{global.setImmediate(func)}
        }
        return (func:Function):void=>{process.nextTick(func)}
    }
    return (func:Function):void=>{setTimeout(func,100)}
}
