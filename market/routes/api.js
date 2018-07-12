const express = require('express');
const router = express.Router();
const userControler = require("../control/user");
const goodControler = require("../control/goods");
/* GET home page. */

/*
当访问/api这个路径的时候，去走api这个路由----》请求地址/users/register
*/
// router.post("/users/register",(req,res)=>{
//     console.log(req.body);
// })
router.post("/users/register",userControler.register);
router.post("/users/login",userControler.login);
router.get("/users/islogin",userControler.islogin);
router.get("/users/loginout",userControler.loginout);
//条件查询
router.get("/goods/getgoods",goodControler.getgoods);
//模糊查询
router.get("/goods/getlikegoods",goodControler.getlikegoods);
//查询全部
router.get("/goods/getAllgoods",goodControler.getAllgoods);

router.get("/goods/goodsSort",goodControler.goodsSort);

module.exports = router;
