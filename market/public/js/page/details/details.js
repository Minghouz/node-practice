//详情页的功能方法模块
function DetailFunc(){
        this.init();
}
//扩张功能方法
$.extend(DetailFunc.prototype,{
    init:function(){
        this.main_left = $(".main_left");
        this.main_right = $(".main_right");
        this.box = $("#box");
        this.boxImg = $("#box img");
        this.filter = $("#filter");
        this.small = $("#small");
        this.maxBox = $("#maxBox");
        this.smallImgs = $(".smallImg");
        this.maxImg = $(".maxImg");
        //鼠标移入 显示放大镜和放大图片的盒子
        this.box.mouseover($.proxy(this.handelBoxMouseover,this));
        //鼠标移除 隐藏
        this.box.mouseout($.proxy(this.handelBoxMouseout,this));

        //移动
        this.box.mousemove($.proxy(this.handelMousemove,this));
        //小图切换大图
        this.small.mouseover($.proxy(this.handelSmallMouseover,this));
        //请求商品详情数据
        this.getGoodsDetail();
    },
    //执行显示
    handelBoxMouseover:function(){
        this.filter.show();
        this.maxBox.show();     
        //获取鼠标进入的初始坐标 
    }, //移动位置
    handelMousemove:function(e){
       
        let moveX = e.pageX- this.filter.innerWidth()/2-this.box.offset().left;
        let moveY = e.pageY-this.filter.innerHeight()/2-this.box.offset().top;
            //移动最大距离
        var maxLeft = this.box.innerWidth() - this.filter.innerWidth();
        var maxTop = this.box.innerHeight() - this.filter.innerHeight();   
        //限制移动边界     
        moveX = moveX >maxLeft ? maxLeft : moveX < 0 ? 0 : moveX;
        moveY = moveY >maxTop ? maxTop : moveY < 0 ? 0 : moveY;

        this.filter.css({
            top:moveY,
            left:moveX 
        }) 

        var imgLeft =-moveX * maxLeft /(this.maxImg.innerWidth() - this.maxBox.innerWidth());
        var imgTop =-moveY *maxTop /(this.maxImg.innerHeight()-this.maxBox.innerHeight());
        this.maxImg.css({
            top:imgTop,
            left:imgLeft 
        }) 
    },
    //执行隐藏
    handelBoxMouseout:function(){
        this.filter.hide();
        this.maxBox.hide();
    },
    handelSmallMouseover:function(e){
        var target = e.target || e.srcElement;
        
        if(target.tagName == "IMG" && target.className == "smallImg"){
           var src = $(target).attr("data-src");
           this.boxImg.attr("src",src);
           this.maxImg.attr("src",src);
           console.log("ok");
        }
    },
    //商品详细信息请求
    getGoodsDetail:function(){
        var id = location.href.split("?")[1].split("=")[1];
            $.ajax({
                type:"get",
                url:"/api/goods/getgoods",
                data:{
                    _id:id
                },
                dataType:"json",
                success:$.proxy(this.handelGoodsDetailSuccessCallBack,this)
            })
    },
    //信息请求成功回调
    handelGoodsDetailSuccessCallBack:function(data){
       var goodsInfo = data.data;
       var simgArr = [];
       var mimgArr = [];
       for(var i = 0; i < goodsInfo.length; i++){
           this.boxImg.attr("src","../"+goodsInfo[i].img.substr(7));
           this.maxImg.attr("src","../"+goodsInfo[i].maxImg[i].substr(7));
            simgArr=[...goodsInfo[i].sImg];
            mimgArr=[...goodsInfo[i].maxImg];
           var str = `
               <h3>${goodsInfo[i].title}</h3>
               <p>市场价：<span>￥<b class="market">${goodsInfo[i].market}</b></span></p>
               <p>现价：<span>￥<b class="market">${goodsInfo[i].price}</b></span></p>
               <div class="number">数量：<span class="add">+</span><span class="num">1</span><span class="reduce">-</span>
               </div>
               <div class="aButton">
                   <a href="##" class="buy">立即购买</a>
                   <a href="##" class="addBox">加入购物车</a>
               </div>`;
       }
       this.main_right.html(str);
       for(var i = 0; i < simgArr.length; i++){
            var li = $("<li></li>");
            var img = $("<img/>")
            img.attr("src","../"+simgArr[i].substr(7));
            img.attr("data-src","../"+mimgArr[i].substr(7));
            img.attr("class","smallImg");
            li.html(img);
            this.small.append(li);
       }
    }
})

new DetailFunc();