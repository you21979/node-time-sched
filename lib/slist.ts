///<reference path='node.d'/>
export interface INode{
    next:INode;
}
function snode_rpush(parent:INode, child:INode):void{
    if(parent){
        var n:INode = parent.next;
        parent.next = child;
        child.next = n;
    }
}
function snode_lpush(parent:INode, child:INode):void{
    if(parent){
        if(parent.next){
            snode_lpush(parent.next, child);
        }else{
            parent.next = child;
        }
    }
}
function snode_condpush(parent:INode, child:INode, condFunc:(a:INode, b:INode)=>bool):void{
//    if(parent instanceof)
    if(parent){
        if(parent.next){
            var ret:bool = condFunc(parent, child);
            if(ret){
                snode_rpush(parent, child);
            }else{
                snode_condpush(parent.next, child, condFunc);
            }
        }else{
            parent.next = child;
        }
    }
}
class HeadNode implements INode{
    constructor (public next:INode){
    }
}
class SNode implements INode{
    public next:INode = null;
    constructor (public n:number){
    }
}
export class SList{
    private head_:HeadNode;
    constructor(){
        this.head_ = new HeadNode(null);
    }
    // 速い
    public rpush(node:INode):void{
        snode_rpush(this.head_, node);
    }
    // 遅い
    public lpush(node:INode):void{
        snode_lpush(this.head_, node);
    }
    public condPush(node:INode, condFunc:(a:INode, b:INode)=>bool){
        snode_condpush(this.head_, node, condFunc);
    }
    public scan(func:Function):void{
        var n:INode = this.head_;
        while(n = n.next){
            var ret:bool = func(n);
            if(!ret){
                break;
            }
        }
    }
}


var x = function(){
    var l:SList = new SList();
    var cond = (a:SNode, b:SNode):bool=>{
        if(a instanceof SNode) return a.n < b.n;
        return true;
    }
    l.condPush(new SNode(1), cond);
    l.condPush(new SNode(2), cond);
    l.condPush(new SNode(3), cond);
    l.condPush(new SNode(4), cond);
    l.condPush(new SNode(5), cond);
    l.condPush(new SNode(6), cond);
    l.condPush(new SNode(7), cond);
    l.condPush(new SNode(8), cond);
    l.condPush(new SNode(9), cond);
/*
    l.lpush(new SNode());
    l.lpush(new SNode());
    l.lpush(new SNode());
    l.lpush(new SNode());
    l.lpush(new SNode());
    l.lpush(new SNode());
    l.lpush(new SNode());
    l.lpush(new SNode());
*/
    l.scan((node:SNode)=>{
        console.log(node.n);
        return true;
    });
console.log(l);
}
x();

