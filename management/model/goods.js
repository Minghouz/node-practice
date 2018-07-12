const mongoModel = require("../tool/database");

const Goods = mongoModel.mongoose.model("good",{
    title:String,
    market:Number,
    price:Number,
    type:String,
    img:String,
    sImg:Array,
    maxImg:Array
})
const addData = (goodInfo,successCb)=>{
    const good = new Goods(goodInfo);
    good.save().then((result)=>{
        successCb&&successCb(result)
    })
}
//修改文字
const updatetext = (conditions,goodInfo,successCb)=>{
    Goods.update(conditions,{$set:goodInfo}).then((result)=>{
        successCb&&successCb(result);
    })
}
//修改数据中含有图片
const updategoods = (conditions,goodInfo,successCb)=>{
    Goods.update(conditions,{$set:goodInfo}).then((result)=>{
        successCb&&successCb(result);
    })
}
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
//商品删除
const removegoods = (conditions,successCb)=>{
    Goods.remove(conditions).then((result)=>{
        successCb&&successCb(result);
    })
}

module.exports = {
    addData,
    getgoods,
    getAllgoods,
    getlikegoods,
    goodsSort,
    updatetext,
    updategoods,
    removegoods
}
