const userModel = require("../model/user");
const crypto = require('crypto');
//用户注册
const register = (req,res)=>{
    //前端------post请求的参数在---------req.body中
    //前端------get请求的参数在---------req.query中
    //-----接收--->---前端页面传来的参数信息
    const {username,password} = req.body;
    /*
    向后端----传递-->---需要存储的信息
    */
//    console.log({username,password});
    userModel.dataFind({username:username},(result)=>{
        if(result.length>0){
            res.json({
                status:0,
                info:"用户名已存在"
            })
        }else{
            //创建一个加密算法
                const hash = crypto.createHash('sha256');
                //数据加密
                hash.update(password);  
                const pwd = hash.digest("hex");
            userModel.registerSave({username:username,password:pwd},()=>{
                res.json({
                    status:1,
                    info:"成功"
                })
            })
        }
    })
}
//用户登录
const login = (req,res)=>{
    const {username,password} = req.body;
    //创建一个加密算法
    const hash = crypto.createHash('sha256');
    //数据加密
    hash.update(password);  
    const pwd = hash.digest("hex");

    userModel.dataFind({username:username},(result)=>{
        // console.log(result);
       if(result.length > 0){  
            userModel.dataFind({username:username,password:pwd},(result)=>{
                if(result.length>0){
                    req.session.status = true;
                    req.session.uname = username;
                    res.json({
                        status:1,
                        info:"登陆成功",
                        uname:req.session.uname,
                        userstatus:req.session.status
                    })
                }else{
                    res.json({
                        status:2,
                        info:"密码错误"
                    })
                }
            })      
       }else{
           res.json({
               status:0,
               info:"用户名不存在"
           })
       }
    })

}
 //判断用户是否登录
const islogin = (req,res)=>{
    if(req.session.status){
        res.json({
            status:1,
            info:"ok",
            name:req.session.uname,
            userstatus:req.session.status
        })
    }else{
        res.json({
            status:0,
            info:"登录失败"
        })
    }
}

//退出登录

const loginout = (req,res)=>{
    req.session.status =false;
    res.json({
        status:1,
        info:"退出登录"
    })
}

//将定义好的注册传递信息模块 导出去model层存储信息
module.exports ={
    register,
    login,
    islogin,
    loginout
}