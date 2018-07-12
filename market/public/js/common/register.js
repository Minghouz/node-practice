//创建用户注册模块
function Register(container){
    this.container = container;
    this.init();
}
//用户注册模块DOM结构
Register.Template = `<div class="modal fade" id="userRegister" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">会员注册</h4>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="username_reg">用户名</label>
                    <input type="text" class="form-control" id="username_reg" placeholder="请输入用户名/电话号码">
                </div>
                <div class="form-group">
                    <label for="password_reg">密码</label>
                    <input type="text" class="form-control" id="password_reg" placeholder="请输入密码">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id = "registerBtn">注册</button>
        </div>
    </div>
</div>
</div>`;
//给用户注册扩展功能
$.extend(Register.prototype,{
    //初始化调用
    init:function(){
        this.ele = $("<div></div>").append(Register.Template);
        this.container.append(this.ele);
        this.regBtn = $("#registerBtn");
        this.regBtn.click($.proxy(this.handelUserRegister,this));
    },
    //用户注册，发出ajax请求
    handelUserRegister:function(){
        let uname = this.ele.find("#username_reg").val();
        let upwd = this.ele.find("#password_reg").val();
        $.ajax({
            type:"post",
            url:"/api/users/register",//访问路由
            data:{
                username:uname,
                password:upwd
            },
            dataType:"json",
            success:$.proxy(this.handelRegisterCallBack,this)
        })
    },
    //注册成功回调
    handelRegisterCallBack:function(data){
        console.log(data);
        const n = data.status;
        switch(n){
            case 0:
                alert(data.info);
                break;
            case 1:
                alert(data.info);
                location.reload();
                break;
        } 
    }
})