//引入连接好的数据库
const mongoose = require("../tool/database");

    //创建表名为user的表以及定义字段
const User = mongoose.mongoose.model('user',{
    username:String,
    password:String
});


//增加用户
const registerSave = (userInfo,successCb)=>{

    console.log(userInfo,successCb);
  
        //表格实例化
        const user = new User(userInfo);
        //保存信息并成功回调
        user.save().then((result)=>{
            console.log(result);
            successCb&&successCb(result)
        });
}


//查询用户

const dataFind = (userInfo,successCb)=>{
    User.find(userInfo).then((result)=>{
        successCb&&successCb(result)
    });

}




//将模块导出到控制层使用
module.exports = {
    registerSave,
    dataFind
}
