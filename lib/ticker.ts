///<reference path='node.d'/>
function tick():number{
    return process.uptime();
}
export class Ticker{
    private tick_:number = -1;
    constructor(){}
    public tick():number{
        return this.tick_;
    }
    public update():number{
        var old:number = this.tick_;
        this.tick_ = tick();
        return old;
    }
    public futureTick(count:number):number{
        return this.tick_ + count;
    }
}
