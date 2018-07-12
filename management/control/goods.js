const goodsModel = require("../model/goods");
//数据添加
const addData =(req,res)=>{
    const {title,market,price,type} = req.body;

    const img = req.files["img"][0].path;
 
    let arr=[];
    let maxarr=[];

    for(var i = 0;i<req.files["sImg"].length;i++){
        arr.push(req.files["sImg"][i].path);
    }
 
    for(var i = 0;i<req.files["maxImg"].length;i++){
        maxarr.push(req.files["maxImg"][i].path);
    }
 
    let data = {
        title:title,
        market:market,
        price:price,
        type:type,
        img:img,
        sImg:arr,
        maxImg:maxarr
    }

    goodsModel.addData(data,(result)=>{
        res.json({
            status:1,
            info:"添加成功"
        })
    })
}

//只修改文字

const updatetext = (req,res)=>{
    const {title,price,market,type,_id} = req.body
    let data = {
        title:title,
        market:market,
        price:price,
        type:type,
    }
   
    goodsModel.updatetext({_id},data,(result)=>{
        if(result.n>0){
            res.json({
                status:1,
                info:"修改成功！"
            })
        }else{
            res.json({
                status:0,
                info:"修改失败！"
            })
        }
      
    })
}

//修改数据中含有图片
const updategoods = (req,res)=>{
    const {title,market,price,type,_id} = req.body;

    const img = req.files["img"][0].path;
 
    let arr=[];
    let maxarr=[];

    for(var i = 0;i<req.files["sImg"].length;i++){
        arr.push(req.files["sImg"][i].path);
    }
 
    for(var i = 0;i<req.files["maxImg"].length;i++){
        maxarr.push(req.files["maxImg"][i].path);
    }
 
    let data = {
        title:title,
        market:market,
        price:price,
        type:type,
        img:img,
        sImg:arr,
        maxImg:maxarr
    }

    goodsModel.updategoods({_id},data,(result)=>{
        console.log(result);
        if(result.n>0){
            res.json({
                status:1,
                info:"修改成功！"
            })
        }else{
            res.json({
                status:0,
                info:"修改失败！"
            })
        }
    })
}

const getgoods = (req,res)=>{
    const {type} = req.query;
    const {_id} = req.query;
    const obj = type==undefined?{_id}:{type};
    goodsModel.getgoods(obj,(result)=>{
        if(result.length>0){
            res.json({
                status:1,
                data:result
            })
        }else{
            res.json({
                status:0,
                info:"获取数据失败！"
            })
        }
    })
}
const getAllgoods = (req,res)=>{
    goodsModel.getAllgoods((result)=>{
        if(result.length>0){
            res.json({
                status:1,
                data:result
            })
        }else{
            res.json({
                status:0,
                info:"获取数据失败！"
            })
        }
    })
}

const getlikegoods = (req,res)=>{
    const {title} = req.query;
    goodsModel.getlikegoods({title},(result)=>{
       if(result.length>0){
           res.json({
               status:1,
               data:result
           })
       }else{
           res.json({
               status:0,
               info:"获取数据失败！"
           })
       }
    })
}

const goodsSort = (req,res)=>{
    const {price,type} = req.query;
    goodsModel.goodsSort(type,{price},(result)=>{
        if(result.length>0){
            res.json({
                status:1,
                data:result
            })
        }else{
            res.json({
                status:0,
                info:"获取数据失败！"
            })
        }
    })
}
const removegoods = (req,res)=>{
    const {_id} = req.query;
    goodsModel.removegoods({_id},(result)=>{
        console.log(result);
        if(result.n>0){
            res.json({
                status:1,
                info:"删除成功！"
            })
        }else{
            res.json({
                status:0,
                info:"删除失败！"
            })
        }
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