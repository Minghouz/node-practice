const goodModel = require("../model/goods");
//查询指定类型
const getgoods = (req,res)=>{
    const {type,_id} = req.query;
    //如果type值存在，查询类型
    if(type){
        goodModel.getgoods({type},(result)=>{
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
    //如果id值存在，查询id
    if(_id){
        goodModel.getgoods({_id},(result)=>{
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

}
//查询全部
const getAllgoods = (req,res)=>{
    goodModel.getAllgoods((result)=>{
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
//模糊查询
const getlikegoods = (req,res)=>{
    const {title} = req.query;
    goodModel.getlikegoods({title},(result)=>{
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
//商品排序
const goodsSort = (req,res)=>{
    const {price,type} = req.query;
    goodModel.goodsSort(type,{price},(result)=>{
        console.log("--------------control-------------");
        if(result.length>0){
            console.log(result);
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

module.exports = {
    getgoods,
    getlikegoods,
    getAllgoods,
    goodsSort
}