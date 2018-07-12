function Header(container){
    this.container = container;
    this.init();
}

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
            商品后台管理系统
        </a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
            <li>
                <a href="/">商品添加</a>
            </li>
            <li>
                <a href="/list">商品展示区</a>
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

$.extend(Header.prototype,{
    init:function(){
        this.ele = $("<div></div>").append(Header.Template);
        this.container.append(this.ele);
        this.loginoutbtn = $("#userloginout");
        this.search = this.ele.find("#serach");
        this.serachBtn = this.ele.find("#serachBtn");
        this.serach_menu = this.ele.find("#serach_menu");
        this.loginoutbtn.on("click",$.proxy(this.loginoutAjax,this));
        this.serach_menu.click($.proxy(this.serach_menuclick,this));
        this.isLogin();
        this.goodsSerach();
        this.list = $("#list");
    },
    isLogin:function(){
        $.ajax({
            type:"get",
            url:"/api/users/islogin",
            dataType:"json",
            success:$.proxy(this.isloginCb,this)
        })
    },
    isloginCb:function(data){
        let uname = this.ele.find("#sec_show").children().eq(0).find("a");
        if(data.status == 1){
            uname.text(data.name);
            this.ele.find("#sec_hide").addClass("hide");
            this.ele.find("#sec_show").removeClass("hide");
        }
    },
    loginoutAjax:function(){
        $.ajax({
            type:"get",
            url:"/api/users/loginout",
            dataType:"json",
            success:$.proxy(this.successCb,this)
        })
    },
    successCb:function(data){
        if(data.status){
            alert("已退出登录！");
            location.reload(true);
        }
    },
    goodsSerach:function(){
        this.search.on("input",$.proxy(this.searchAjax,this));
        this.serachBtn.on("click",$.proxy(this.searchAjax,this));
    },
    searchAjax:function(){
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
                success:$.proxy(this.searchCb,this)
            })
        }  
    },
    searchCb:function(data){
        this.serach_menu.html("");
       let serachres= data.data;
       for(var i = 0;i<serachres.length;i++){
          var li = $("<li></li>");
          li.attr("data-id",serachres[i]._id);
          var txt = serachres[i].title;
          li.html(txt);
          this.serach_menu.append(li);
       }
    },
    serach_menuclick:function(e){
        var target = e.target || e.srcElement;
        this.search.val($(target).text());
        var id = $(target).attr("data-id");
        this.serach_menu.hide();
        this.getdata(id);
    },
    getdata:function(id){
       // var id = location.href.split("?").length>1 ? location.href.split("?")[1].split("=")[1]:"";
        if(id){
            $.ajax({
                type:"get",
                url:"/api/goods/getgoods",
                dataType:"json",
                data:{_id:id},
                success:$.proxy(this.succCb,this)
            })
        }else{
            $.ajax({
                type:"get",
                url:"/api/goods/getAllgoods",
                dataType:"json",
                data:{},
                success:$.proxy(this.succCb,this)
            })
        }    
    },
    succCb:function(data){
        let str = "";
        let list = data.data;
        console.log(data.data);
        console.log(data.data.length);
       if(data.status==1){
           for(let i=0;i<list.length;i++){
               str += `<li>
               <img src="../${list[i].img.substr(7)}" alt="">
               <div class="img_text">
                   <p>
                       <span class="price">￥${list[i].price}</span>
                       <em class="market">￥${list[i].market}</em>
                   </p>
                   <h6>${list[i].title}</h6>
               </div>
           </li>`;
           }
         this.list.html(str);
         this.serach.val("");
       }else{
           alert("服务器获取数据失败！")
       }
    }
})