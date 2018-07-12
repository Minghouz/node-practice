function Login(container){
    this.container = container;
    this.init();
}
Login.Template = ` <div class="modal fade" id="userLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">会员登录</h4>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="username_log">用户名</label>
                    <input type="text" class="form-control" id="username_log" placeholder="请输入用户名/电话号码">
                </div>
                <div class="form-group">
                    <label for="password_log">密码</label>
                    <input type="password" class="form-control" id="password_log" placeholder="请输入密码">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="userLoginBtn">登录</button>
        </div>
    </div>
</div>
</div>`;

$.extend(Login.prototype,{
    init:function(){
        this.ele = $("<div></div>").append(Login.Template);
        this.container.append(this.ele);
        this.loginbtn = this.ele.find("#userLoginBtn");
        this.loginbtn.on("click",$.proxy(this.loginAjax,this));
    },
    loginAjax:function(){
        let username = $("#username_log");
        let password = $("#password_log");
        const odata = {
            username:username.val(),
            password:password.val()
        }
        $.ajax({
            type:"post",
            url:"/api/users/login",
            data:odata,
            dataType:"json",
            success:$.proxy(this.successCb,this)
        })
    },
    successCb:function(data){
       const n = data.status;
       switch(n){
            case 0:
                alert(data.info);
                break;
            case 1:
                alert(data.info);
                console.log(data);
                location.reload(true);
                break;
            case 2:
                alert(data.info);
                break;
       }
    }
})