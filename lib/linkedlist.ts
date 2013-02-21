///<reference path='node.d'/>
import assert = module('assert');
export interface INode{
    next:INode;
    prev:INode;
}
function is_linked(node:INode):bool{
    return node.next || this.prev ? true : false; 
}
// 引数に指定したノードを自身の後にリンクする
function after_insert(linked:INode,unlinked:INode):void{
    assert.ok(is_linked(unlinked) === false, 'AfterInsert:linked node');
    assert.ok(linked !== unlinked, 'AfterInsert:Same node');
    // 後ろにすでにリンク済みノードがあるなら繋ぎかえる
    if(linked.next){
        linked.next.prev = unlinked;
        unlinked.next = linked.next;
    }
    linked.next = unlinked;
    unlinked.prev = linked;
}
// 引数に指定したノードを自身の前にリンクする
function before_insert(linked:INode,unlinked:INode):void{
    assert.ok(is_linked(unlinked) === false, 'BeforeInsert:linked node');
    assert.ok(linked !== unlinked, 'BeforeInsert:Same node');
    // 前にすでにリンク済みノードがあるなら繋ぎかえる
    if(linked.prev){
        linked.prev.next = unlinked;
        unlinked.prev = linked.prev;
    }
    linked.prev = unlinked;
    unlinked.next = linked;
}
// リンクを解除する
function unlink(linked:INode):void{
    if(linked.prev){
        linked.prev.next = linked.next;
        linked.prev = null;
    }
    if(linked.next){
        linked.next.prev = linked.prev;
        linked.next = null;
    }
}
export class Node implements INode{
    public next:INode = null;
    public prev:INode = null;
    constructor(){}
}
export class List{
    public head_:INode = null;
    public tail_:INode = null;
    public length_:number = 0;
    constructor(){}
    public isEmpty():bool{
        return (this.length_ === 0) ? true : false;
    }
    public insertAfter(target:INode, node:INode):void{
        if(!this.isEmpty()){
            after_insert(target, node);
            if(node.next === null){
                this.tail_ = node;
            }
            ++this.length_;
        }
    }
    public insertBefore(target:INode, node:INode):void{
        if(!this.isEmpty()){
            before_insert(target, node);
            if(node.prev === null){
                this.head_ = node;
            }
            ++this.length_;
        }
    }
    public pushTail(node:INode):void{
        if(this.tail_){
            after_insert(this.tail_, node);
        }
        if(this.head_ === null){
            this.head_ = node;
        }
        this.tail_ = node;
        ++this.length_;
    }
    public pushHead(node:INode):void{
        if(this.head_){
            before_insert(this.head_, node);
        }
        if(this.tail_ === null){
            this.tail_ = node;
        }
        this.head_ = node;
        ++this.length_;
    }
    // 一番前から取り出す
    public popHead():INode{
        var node = null;
        if(this.length_){
            node = this.head_;
            this.head_ = node.next;
            unlink(node);
            --this.length_;
            if(this.head_ === null){
                this.tail_ = null;
            }
        }
        return node;
    }
    // 一番後から取り出す
    public popTail():INode{
        var node = null;
        if(this.length_){
            node = this.tail_;
            this.tail_ = node.prev;
            unlink(node);
            --this.length_;
            if(this.tail_ === null){
                this.head_ = null;
            }
        }
        return node;
    }
    // 前からスキャンする
    public scanHead(callback:(node:INode)=>bool):INode{
        var node:INode = this.head_;
        var work:INode = null;
        while(node){
            work = node.next;
            if(!callback(node)){
                return node;
            }
            node = work;
        }
        return null;
    }
    // 後ろからスキャンする
    public scanTail(callback:(node:INode)=>bool):INode{
        var node:INode = this.tail_;
        var work:INode = null;
        while(node){
            work = node.prev;
            if(!callback(node)){
                return node;
            }
            node = work;
        }
        return null;
    }
    public remove(node:INode):void{
        if(this.length_ > 0){
            if(node === this.head_){
                this.head_ = node.next;
                if(this.head_ === null){
                    this.tail_ = null;
                }
            }
            if(node === this.tail_){
                this.tail_ = node.prev;
                if(this.tail_ === null){
                    this.head_ = null;
                }
            }
            unlink(node);
            --this.length_;
        }
    }
    get length():number{
        return this.length_;
    }
}
/*
module Test{
    var x:number = 0;
    class TNode implements INode{
        public next:INode = null;
        public prev:INode = null;
        public id:number = ++x;
        constructor(public n:number){}
    }
    function insertHeadCond(){
        var l = new List();
        var f = (a:TNode,b:TNode)=>a.n >= b.n;
        var m1 = [1,2,3,4,5,6,7,8];
        var m2 = [8,7,6,5,4,3,2,1];
        var p:number = 0;
        var id = ()=>m2[p++]
        l.insertHeadCond(new TNode(id()), f);
        l.insertHeadCond(new TNode(id()), f);
        l.insertHeadCond(new TNode(id()), f);
        l.insertHeadCond(new TNode(id()), f);
        l.insertHeadCond(new TNode(id()), f);
        l.insertHeadCond(new TNode(id()), f);
        l.insertHeadCond(new TNode(id()), f);
        l.insertHeadCond(new TNode(id()), f);
        l.scanHead((node:TNode)=>{console.log("no:%d:id:%d",node.n,node.id);return true});
    }
    insertHeadCond();
}
*/
