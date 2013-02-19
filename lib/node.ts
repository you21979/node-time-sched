///<reference path='node.d'/>
import events = module("events");
export class EventEmitter implements events.NodeEventEmitter {
    constructor() {
        (<any>events.EventEmitter).call(this);
    }
    public addListener(event:string, listener:Function) {
        (<any>events.EventEmitter).prototype.addListener.call(this, event, listener);
    }
    public on(event:string, listener:Function):any {
        return (<any>events.EventEmitter).prototype.on.call(this, event, listener);
    }
    public once(event:string, listener:Function):void {
        (<any>events.EventEmitter).prototype.once.call(this, event, listener);
    }
    public removeListener(event:string, listener:Function):void {
        (<any>events.EventEmitter).prototype.removeListener.call(this, event, listener);
    }
    public removeAllListener(event:string):void {
        (<any>events.EventEmitter).prototype.removeAllListener.call(this, event);
    }
    public setMaxListeners(n:number):void {
        (<any>events.EventEmitter).prototype.setMaxListeners.call(this, n);
    }
    public listeners(event:string):{ Function; }[] {
        return (<any>events.EventEmitter).prototype.listeners.call(this, event);
    }
    public emit(event:string, arg1?:any, arg2?:any):void {
        (<any>events.EventEmitter).prototype.emit.call(this, event, arg1, arg2);
    }
}
