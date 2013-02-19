///<reference path='node.d'/>
/**
 *  時間を取得する
 */
function tick():number{
    return process.uptime();
}
/**
 *  時間
 */
export class Ticker{
    private tick_:number = tick();
    /**
     *  コンストラクタ
     */
    constructor(){}
    /**
     *  時間を取得する
     */
    public tick():number{
        return this.tick_;
    }
    /**
     *  内部時間を更新する
     */
    public update():number{
        var old:number = this.tick_;
        this.tick_ = tick();
        return old;
    }
    /**
     *  未来の時間を指す
     */
    public futureTick(count:number):number{
        return this.tick_ + count;
    }
}
