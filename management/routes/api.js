var express = require('express');
var router = express.Router();
const userControler = require("../control/user");
const goodControler = require("../control/goods");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/load')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })
var cpUpload = upload.fields([{name:'img',maxCount:1},{name:'sImg',maxCount:6},{name:'maxImg',maxCount:8}])
/* GET users listing. */

router.post("/users/register",userControler.register);
router.post("/users/login",userControler.login);
router.get("/users/islogin",userControler.islogin);
router.get("/users/loginout",userControler.loginout);

router.post('/goods/Addgoods',cpUpload, goodControler.addData);
router.get("/goods/getgoods",goodControler.getgoods);
router.get("/goods/getlikegoods",goodControler.getlikegoods);
router.get("/goods/getAllgoods",goodControler.getAllgoods);

router.get("/goods/goodsSort",goodControler.goodsSort);

router.post("/goods/updatetext",goodControler.updatetext);
router.post("/goods/updategoods",cpUpload,goodControler.updategoods);

router.get("/goods/removegoods",goodControler.removegoods);



module.exports = router;
