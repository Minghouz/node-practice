function Adddata(){
    this.submitBtn = $("#submitBtn");
    this.init();
}
$.extend(Adddata.prototype,{
    init:function(){
        this.submitBtn.click($.proxy(this.submitAjax,this));
    },
    submitAjax:function(){
        var title = $("#title");
        var market = $("#market");
        var price = $("#price");
        var types = $("#types").find("input[type='radio']");
        var img = $("#img");
        var sImg = $("#sImg");
        var maxImg = $("#maxImg");
        var type;
        for(var i = 0;i<types.length;i++){
            if($(types[i]).prop("checked")){
                type = $(types[i]).attr("value");
            }
        }

        var formdata = new FormData();
        formdata.append("title",title.val());
        formdata.append("market",Number(market.val()));
        formdata.append("price",Number(price.val()));
        formdata.append("type",type);
        formdata.append("img",img[0].files[0]);

        for(var i = 0;i<sImg[0].files.length;i++){
            formdata.append("sImg",sImg[0].files[i]);
        }
        for(var i = 0;i<maxImg[0].files.length;i++){
            formdata.append("maxImg",maxImg[0].files[i]);
        }
        console.log(formdata);
        $.ajax({
            type:"post",
            url:"/api/goods/Addgoods",
            cache:false,
            processData:false,
            contentType:false,
            data:formdata,
            dataType:"json",
            success:$.proxy(this.succCb,this)
        })
    },
    succCb:function(data){
        if(data.status){
            alert("添加成功！");
            location.reload();
        }
    }
})
new Adddata();