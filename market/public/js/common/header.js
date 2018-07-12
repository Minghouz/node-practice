//创建头部模块
function Header(container){
    this.container = container;
    this.init();
}
//头部模块的DOM结构
Header.Template = ` <nav class="navbar navbar-default">
<div class="container-fluid">

    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span class="sr-only">卷皮</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">
            <img src="../img/common/Screenshot.png" alt="">
        </a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li>
                <a href="../index.html">首页 </a>
            </li>
            <li>
                <a href="/html/list.html">列表页</a>
            </li>
        </ul>
        <div class="navbar-form navbar-left">
            <div class="form-group">
                <input type="text" class="form-control" id="serach" placeholder="请输入您要搜索的商品">
            </div>
            <button class="btn btn-default" id="serachBtn">搜索</button>
            <ul class="dropdown-menu" id="serach_menu">
                <li><a href="#">Action</a></li>
            </ul>
        </div>
        <ul class="nav navbar-nav navbar-right" id = "sec_hide">
            <li>
                <a href="#" data-toggle="modal" data-target="#userLogin">登录</a>
            </li>
            <li>
                <a href="#" data-toggle="modal" data-target="#userRegister">注册</a>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right hide" id="sec_show">
            <li>
                <a href="##"></a>
            </li>
            <li>
                <a href="##" id = "userloginout">退出</a>
            </li>
        </ul>
    </div>
   
</div>

</nav>`;
//给头部扩展功能
$.extend(Header.prototype,{
    //初始化调用
    init:function(){
        this.ele = $("<div></div>").append(Header.Template);
        this.container.append(this.ele);
        this.loginoutbtn = $("#userloginout");
        this.search = this.ele.find("#serach");
        this.serachBtn = this.ele.find("#serachBtn");
        this.serach_menu = this.ele.find("#serach_menu");
        this.loginoutbtn.on("click",$.proxy(this.handelLoginOutAjax,this));
        this.serach_menu.click($.proxy(this.handelSerach_menuClick,this));
        this.isLogin();
        this.goodsSerach();
    },
    //判断用户是否登录
    isLogin:function(){
        $.ajax({
            type:"get",
            url:"/api/users/islogin",
            dataType:"json",
            success:$.proxy(this.handelIsLoginCallBack,this)
        })
    },
    //登陆成功回调
    handelIsLoginCallBack:function(data){
       
        let uname = this.ele.find("#sec_show").children().eq(0).find("a");
        if(data.status == 1){
            //获取用户名
            uname.text(data.name);
            this.ele.find("#sec_hide").addClass("hide");
            this.ele.find("#sec_show").removeClass("hide");
        }
    },
    //用户退出登录
    handelLoginOutAjax:function(){
        $.ajax({
            type:"get",
            url:"/api/users/loginout",
            dataType:"json",
            success:$.proxy(this.handelSuccessCallBack,this)
        })
    },
    //退出登陆成功回调
    handelSuccessCallBack:function(data){
        if(data.status){
            alert("已退出登录！");
            location.reload(true);
        }
    },
    //商品搜索
    goodsSerach:function(){
        this.search.on("input",$.proxy(this.handelSearchAjax,this));
        this.search.on('blur',$.proxy(this.handelSearchMenuHide,this));
        this.serachBtn.on("click",$.proxy(this.handelSearchAjax,this));
    },
    //失去焦点时搜索结果展示框隐藏
    handelSearchMenuHide(){
        this.serach_menu.hide();
    },
    //发出商品搜索Ajax请求
    handelSearchAjax:function(){
        var keyword = this.search.val();
        var reg = /\s/g;
        if(reg.test(keyword)){
            this.serach_menu.hide();
        }else if(keyword!=""){
            this.serach_menu.show();
            $.ajax({
                type:"get",
               url:"/api/goods/getlikegoods",
                data:{title:keyword},
                dataType:"json",
                success:$.proxy(this.handelSearchCallBack,this)
            })
        }  
    },
    //搜索商品成功回调
    handelSearchCallBack:function(data){
        this.serach_menu.html("");
       let serachres= data.data;
       for(var i = 0;i<serachres.length;i++){
          var li = $("<li></li>");
          li.attr("data-type",serachres[i].type);
          var txt = serachres[i].title;
          li.html(txt);
          this.serach_menu.append(li);
       }
    },
    //对搜索出来的商品实现点击事件
    handelSerach_menuClick:function(e){
        var target = e.target || e.srcElement;
        this.search.val($(target).text());
        var type = $(target).attr("data-type");
        this.serach_menu.hide();
        location.href = "../../html/list.html?type="+type;
    }
})