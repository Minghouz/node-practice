function getList(){
    this.list = $("#list");
    this.sortBtn = $("#sortBtn");
    this.init();
}
$.extend(getList.prototype,{
    init:function(){
        this.getdata();
        this.dataSort();
        this.updateOrRemove();
    },
    getdata:function(){
        var id = location.href.split("?").length>1 ? location.href.split("?")[1].split("=")[1]:"";
        if(id){
            $.ajax({
                type:"get",
                url:"/api/goods/getgoods",
                dataType:"json",
                data:{type:id},
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
       if(data.status==1){
           for(let i=0;i<list.length;i++){
               str += `<li>
               <img src="../${list[i].img.substr(7)}" alt="">
               <div class="img_text">
                   <p>
                       <span class="price">￥<span>${list[i].price}</span></span>
                       <em class="market">￥<span>${list[i].market}</span></em>
                   </p>
                   <h6>${list[i].title}</h6>
               </div>
                <div class="btn-group" role="group" id = "sortBtn">
                    <button type="button" class="btn btn-info deleteBtn" data-id="${list[i]._id}" data-toggle="modal">删除</button>
                    <button type="button" class="btn btn-success updateBtn" data-toggle="modal" data-type="${list[i].type}" data-id="${list[i]._id}" data-target="#updateModal">修改</button>
                </div>
           </li>`;
           }
         this.list.html(str);
       }else{
           alert("服务器获取数据失败！")
       }
    },
     dataSort:function(){
        this.sortBtn.on("click",$.proxy(this.sortClick,this));
     },
    sortClick:function(e){
        var target = e.target || e.srcElement;
        var flag;
        if(target.tagName=="BUTTON" && target.id == "asc"){
            var type = location.href.split("?").length>1 ?location.href.split("?")[1].split("=")[1]:"";
            flag = 1;
            this.sortAjax(flag,type);
        }else if(target.tagName=="BUTTON" && target.id == "des"){
            var type = location.href.split("?").length>1 ?location.href.split("?")[1].split("=")[1]:"";
            flag = -1;
            this.sortAjax(flag,type);
        }

    },
    sortAjax:function(flag,type){ 
        $.ajax({
            type:"get",
            url:"/api/goods/goodsSort",
            data:{
                price:flag,
                type:type
            },
            dataType:"json",
            success:$.proxy(this.sortCb,this)
        })
        console.log(flag,type);
    },
    sortCb:function(data){
    console.log(data);
        this.succCb(data);
    },
    updateOrRemove:function(){
        this.list.click($.proxy(this.updateAndremoveProxy,this));
    },
    updateAndremoveProxy:function(e){
      var target = e.target || e.srcElement;
      //修改数据
      if(target.tagName=="BUTTON"&&target.className == "btn btn-success updateBtn"){
          //获取页面上的数据值
        const _id = $(target).attr("data-id");
        const child = $(target).parent().prev().children();
         const pri = child.eq(0).children().eq(0).find("span").text();
         const mar = child.eq(0).children().eq(1).find("span").text();
         const tit = child.eq(1).text();

         const title = $("#title");
         const market = $("#market");
         const price = $("#price");
         var type;
         type = $(target).attr("data-type"); 
         title.val(tit);
         market.val(mar);
         price.val(pri);
       
        const subBtn = $("#submitBtn");
        subBtn.attr("data-type",type);
        subBtn.attr("data-id",_id);
        subBtn.on("click",$.proxy(this.updatedataAjax,this));
      }
      //删除数据

      if(target.tagName=="BUTTON"&&target.className == "btn btn-info deleteBtn"){
        let id = $(target).attr("data-id");
          $.ajax({
              type:"get",
              url:"/api/goods/removegoods",
              dataType:"json",
              data:{_id:id},
              success:$.proxy(this.removeCb,this)
          })
      }

    },
    updatedataAjax:function(e){
        const target = e.target || e.srcElement;
        var title = $("#title");
        var market = $("#market");
        var price = $("#price");
        var types = $("#types").find("input[type='radio']");
        var img = $("#img");
        var sImg = $("#sImg");
        var maxImg = $("#maxImg");
        var _id = $(target).attr("data-id");
        var type;
        for(var i = 0;i<types.length;i++){
            if($(types[i]).prop("checked")){
                type = $(types[i]).attr("value");
            }
        }
        if(!type){
            type = $(target).attr("data-type"); 
        }

       if(img[0].files.length==0&&sImg[0].files.length==0&&maxImg[0].files.length==0){
            const data = {
               title:title.val(),
               price:price.val(),
               market:market.val(),
               type:type,
               _id:_id
           }
          
            $.ajax({
                type:"post",
                url:"/api/goods/updatetext",
                data:data,
                dataType:"json",
                success:$.proxy(this.updateCb,this)
            })
       }else if(img[0].files.length>0&&sImg[0].files.length>0&&maxImg[0].files.length>0){
            var formdata = new FormData();
            formdata.append("title",title.val());
            formdata.append("market",Number(market.val()));
            formdata.append("price",Number(price.val()));
            formdata.append("type",type);
            formdata.append("_id",_id);
            formdata.append("img",img[0].files[0]);

            for(var i = 0;i<sImg[0].files.length;i++){
                formdata.append("sImg",sImg[0].files[i]);
            }
            for(var i = 0;i<maxImg[0].files.length;i++){
                formdata.append("maxImg",maxImg[0].files[i]);
            }

            $.ajax({
                type:"post",
                url:"/api/goods/updategoods",
                cache:false,
                processData:false,
                contentType:false,
                data:formdata,
                dataType:"json",
                success:$.proxy(this.updateCb,this)
            })
       }

    },
    updateCb:function(data){
       if(data.status==1){
           alert("修改成功！");
           this.getdata();
       }else{
           alert("修改失败！");
       }
    },
    removeCb:function(data){
        console.log(data);
        if(data.status==1){
            alert("删除成功！");
            this.getdata();
        }else{
            alert("删除失败！");
        }
    }
})
new getList();