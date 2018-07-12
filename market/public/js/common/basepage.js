//创建页面共有的dom节点
function Addhead(){
    this.ele = $("#header");
    this.foot = $("#foot");
    this.init();
}
$.extend(Addhead.prototype,{
    init:function(){
        this.createDom();
    },
    createDom:function(){
        this.header = new Header(this.ele);
        this.register = new Register(this.ele);
        this.login = new Login(this.ele);
        this.footer = new Footer(this.foot);
    }
})

new Addhead();