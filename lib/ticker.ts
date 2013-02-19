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
    public update():void{
        this.tick_ = tick();
    }
    public futureTick(count:number):number{
        return this.tick_ + count;
    }
}
