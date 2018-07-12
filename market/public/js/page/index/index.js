//添加首页页头页脚的函数
function Addhead(){
    this.ele = $("#header");
    this.foot = $("#foot");
    this.init();
}
//给函数扩展功能方法
$.extend(Addhead.prototype,{
    //初始化
    init:function(){
        this.createDom();
        this.Banner();
        this.clickPhone();
        this.clickClothes();
        this.clickSnacks();
        this.InitData();
        this.main = $("#main");
        //首页商品点击跳转到详情页面
        this.main.click($.proxy(this.handelClickLookDetail,this));
    },
    //创建dom节点
    createDom:function(){
        this.header = new Header(this.ele);
        this.register = new Register(this.ele);
        this.login = new Login(this.ele);
        this.footer = new Footer(this.foot);
    },
    //轮播图动画开启
    Banner:function(){
        new Swiper ('.swiper-container', {
            autoplay: {
                disableOnInteraction: false,
            },
            loop: true,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }) 
    },
    //点击首页手机类，跳转到手机类商品展示页面
    clickPhone:function(){
        var phoneBtn = $("#phone");
        phoneBtn.click($.proxy(this.handelPhoneType,this));
    },
    handelPhoneType:function(){
        location.href = "html/list.html?type=1";
    },
      //点击首页衣服类，跳转到衣服类商品展示页面
    clickClothes:function(){
        var phoneBtn = $("#clothes");
        phoneBtn.click($.proxy(this.handelClothesType,this));
    },
    handelClothesType:function(){
        location.href = "html/list.html?type=2";
    },
     //点击首页零食类，跳转到零食类商品展示页面
    clickSnacks:function(){
        var phoneBtn = $("#snacks");
        phoneBtn.click($.proxy(this.handelSnacksType,this));
    },
    handelSnacksType:function(){
        location.href = "html/list.html?type=3";
    },
    //点击商品跳转
    handelClickLookDetail:function(e){
        
        var target = e.target || e.srcElement;
        if(target.tagName == 'IMG' && target.className == 'shop' ||target.tagName == 'A' && target.className == 'look'){
              var id = $(target).attr("data-id");
          location.href = "html/details.html?id="+id;
        }
        
    },
    //初始化首页各类商品展示数据，向后台发出Ajax请求
    InitData:function(){
        $.ajax({
            type:"get",
            url:"/api/goods/getAllgoods",
            data:{},
            dataType:"json",
            success:$.proxy(this.handelInitData,this)
        })
    },
    //初始化请求数据成功回调
    handelInitData:function(data){
        var dataArr=data.data;
        var phoneModel = $(".phone");
        var clothesModel = $(".clothes");
        var snacksModel = $(".snacks");
      console.log(dataArr);
       for(var i = 0;i < dataArr.length; i++){
           //手机模块添加页面数据
            if(dataArr[i].type=='1'){
                const str = ` <li>
                <img src="${dataArr[i].img.substr(7)}" class="shop" data-id="${dataArr[i]._id}" alt="">
                <div class="img_text">
                    <p>
                        <span class="price">￥${dataArr[i].price}</span>
                        <em class="market">￥${dataArr[i].market}</em>
                    </p>
                    <h6>${dataArr[i].title}</h6>
                </div>
                <a href="##" class="look" data-id="${dataArr[i]._id}" >查看详情</a>
            </li>`;
            phoneModel.append(str);
            }
            //衣服模块添加页面数据
            if(dataArr[i].type=='2'){
                const str = ` <li>
                <img src="${dataArr[i].img.substr(7)}" class="shop" data-id="${dataArr[i]._id}"  alt="">
                <div class="img_text">
                    <p>
                        <span class="price">￥${dataArr[i].price}</span>
                        <em class="market">￥${dataArr[i].market}</em>
                    </p>
                    <h6>${dataArr[i].title}</h6>
                </div>
                <a href="##" class="look" data-id="${dataArr[i]._id}" >查看详情</a>
            </li>`;
            clothesModel.append(str);
            }
            //零食模块添加页面数据
            if(dataArr[i].type=='3'){
                const str = ` <li>
                <img src="${dataArr[i].img.substr(7)}" class="shop" data-id="${dataArr[i]._id}"  alt="">
                <div class="img_text">
                    <p>
                        <span class="price">￥${dataArr[i].price}</span>
                        <em class="market">￥${dataArr[i].market}</em>
                    </p>
                    <h6>${dataArr[i].title}</h6>
                </div>
                <a href="##" class="look" data-id="${dataArr[i]._id}" >查看详情</a>
            </li>`;
            snacksModel.append(str);
            }
       }
      
    }
})

new Addhead();