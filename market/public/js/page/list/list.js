//商品列表页功能函数
function getList(){
    this.list = $("#list");
    this.sortBtn = $("#sortBtn");
    this.init();
}
//给函数扩展功能方法
$.extend(getList.prototype,{
    //初始化
    init:function(){
        this.getdata();
        this.dataSort();
         //列表页商品点击跳转到详情页面
         this.list.click($.proxy(this.handelClickLookDetail,this));
    },
    //查询商品
    getdata:function(){
        //获取要查询的商品类类型id
        var id = location.href.split("?").length>1 ? location.href.split("?")[1].split("=")[1]:"";
        //如果商品类型存在，查询指定类型商品数据，如果不存在，查询所有商品数据
        if(id){
            //查询指定类型商品
            $.ajax({
                type:"get",
                url:"/api/goods/getgoods",
                dataType:"json",
                data:{type:id},
                success:$.proxy(this.handelGetDataSuccessCallBack,this)
            })
        }else{
            //查询全部商品
            $.ajax({
                type:"get",
                url:"/api/goods/getAllgoods",
                dataType:"json",
                data:{},
                success:$.proxy(this.handelGetDataSuccessCallBack,this)
            })
        }    
    },
    //查询数据成功回调
    handelGetDataSuccessCallBack:function(data){
        let str = "";
        let list = data.data;
       if(data.status==1){
           for(let i=0;i<list.length;i++){
               //将获取到的数据添加到页面展示出来
               str += `<li>
               <img src="../${list[i].img.substr(7)}"  class="shop" data-id="${list[i]._id}"  alt="">
               <div class="img_text">
                   <p>
                       <span class="price">￥${list[i].price}</span>
                       <em class="market">￥${list[i].market}</em>
                   </p>
                   <h6>${list[i].title}</h6>
               </div>
               <a href="##" class="look" data-id="${list[i]._id}" >查看详情</a>
           </li>`;
           }
         this.list.html(str);
       }else{
           alert("服务器获取数据失败！")
       }
    },
    //给页面商品进行排序
     dataSort:function(){
        this.sortBtn.on("click",$.proxy(this.handelSortClick,this));
     },
     //点击排序的事件代理
     handelSortClick:function(e){
        var target = e.target || e.srcElement;
        var flag;
        if(target.tagName=="BUTTON" && target.id == "asc"){
            //升序
            var type = location.href.split("?").length>1 ?location.href.split("?")[1].split("=")[1]:"";
            flag = 1;
            this.sortAjax(flag,type);
        }else if(target.tagName=="BUTTON" && target.id == "des"){
            //降序
            var type = location.href.split("?").length>1 ?location.href.split("?")[1].split("=")[1]:"";
            flag = -1;
            this.sortAjax(flag,type);
        }

    },
      //点击商品跳转
      handelClickLookDetail:function(e){
        
        var target = e.target || e.srcElement;
        if(target.tagName == 'IMG' && target.className == 'shop' || target.tagName == 'A' && target.className == 'look'){
              var id = $(target).attr("data-id");
          location.href = "details.html?id="+id;
        }
    },
    //发出排序的Ajax请求
    sortAjax:function(flag,type){ 
        $.ajax({
            type:"get",
            url:"/api/goods/goodsSort",
            data:{
                price:flag,
                type:type
            },
            dataType:"json",
            success:$.proxy(this.handelSortCallBack,this)
        })
        console.log(flag,type);
    },
    handelSortCallBack:function(data){
    console.log(data);
        //得到排序好的数据后，再次调用一下数据回调，添加到页面展示
        this.handelGetDataSuccessCallBack(data);
    }
})
new getList();