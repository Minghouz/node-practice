//引入模块
const mongoMedel = require("../tool/database");
//定义商品存储表字段
const Goods = mongoMedel.mongoose.model("good",{
    title:String,
    market:Number,
    price:Number,
    type:String,
    img:String,
    sImg:Array,
    maxImg:Array
})

//查询某一类数据
const getgoods = (goodsInfo,successCb)=>{
    Goods.find(goodsInfo).then((result)=>{
        successCb&&successCb(result);
    })
}
//查询所有数据
const getAllgoods = (successCb)=>{
    Goods.find().then((result)=>{
        successCb&&successCb(result);
    })
}
//模糊查询
const getlikegoods = (goodsInfo,successCb)=>{  
    Goods.find({title:RegExp(goodsInfo.title)}).then((result)=>{  
        successCb&&successCb(result);
    })
}

//商品排序
const goodsSort = (goodsInfo,dre,successCb)=>{
    if(goodsInfo==""){
        Goods.find().sort(dre).then((result)=>{
            successCb&&successCb(result);
        })
    }else{
        Goods.find({type:goodsInfo}).sort(dre).then((result)=>{
            successCb&&successCb(result);
        })
    }
}
//导出模块
module.exports = {
    getgoods,
    getlikegoods,
    getAllgoods,
    goodsSort
}