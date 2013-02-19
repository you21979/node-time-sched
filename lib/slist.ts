///<reference path='node.d'/>
export interface INode{
    next:INode;
}
function node_push(parent:INode, child:INode):void{
    if(parent){
        if(parent.next){
            node_push(parent.next, child);
        }else{
            parent.next = child;
        }
    }
}
export class SNode implements INode{
    public next:INode = null;
    constructor(){}
}
export class SList{
    private head_:INode = null;
    constructor(){}
    // 速い
    public unshift(node:INode):void{
        var old:INode = this.head_;
        node.next = old;
        this.head_ = node;
    }
    // 遅い
    public push(node:INode):void{
        if(this.head_ === null){
            this.head_ = node;
            return;
        }
        node_push(this.head_, node);
    }
    // 条件を指定
    public insert(node:INode, condFunc:(a:INode, b:INode)=>bool){
        if(this.head_ === null){
            this.head_ = node;
            return;
        }
        var f = (prev:INode, parent:INode):void=>{
            if(parent){
                var ret:bool = condFunc(parent, node);
                if(ret){
                    node.next = parent;
                    if(prev === null){
                        this.head_ = node;
                    }else{
                        prev.next = node;
                    }
                }else{
                    f(parent, parent.next);
                }
            }else{
                prev.next = node;
            }
        }
        f(null, this.head_);
    }
    public same(func:(v:INode)=>bool):void{
        var n:INode = this.head_;
        while(n){
            var ret:bool = func(n);
            if(!ret){
                break;
            }
            n = n.next;
        }
    }
    public forEach(func:(v:INode)=>void):void{
        var n:INode = this.head_;
        while(n){
            func(n);
            n = n.next;
        }
    }
}
/*
var x = function(){
    var l:SList = new SList();
    var cond = (a:SNode, b:SNode):bool=>{
        return a.n > b.n;
    }
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(1), cond);
    l.insert(new SNode(1), cond);
    l.insert(new SNode(1), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.insert(new SNode(Math.random()), cond);
    l.unshift(new SNode(1));
    l.push(new SNode(2));
    l.push(new SNode(3));
    l.push(new SNode(4));
    l.push(new SNode(5));
    l.push(new SNode(6));
    l.push(new SNode(1));
    l.push(new SNode(2));
    l.push(new SNode(3));
    l.push(new SNode(4));
    l.push(new SNode(5));
    l.same((node:SNode)=>{
        console.log(node.n);
        return true;
    });
}
x();
*/
