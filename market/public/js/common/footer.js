//创建页脚模块
function Footer(container){
    this.container = container;
    this.init();
}
//页脚的DOM结构
Footer.Template = ` <div class="footer">
<div class="footer_list">
    <div class="list_left">
        <img src="../img/common/jp-app-90.png" alt="">
        <p>随时逛  随时抢</p>
    </div>
    <div class="list_center">
        <ul class="list_center_ul">
            <dt>获取更新</dt>
            <li><a href="##"><span></span>/Android</a></li>
            <li><a href="##"><span></span>卷皮QQ空间</a></li>
            <li><a href="##"><span></span>卷皮新浪微博</a></li>
            <li><a href="##"><span></span>开放API</a></li>
        </ul>
        <ul class="list_center_ul">
            <dt>商务合作</dt> 
            <li><a href="##"><span></span>卖家免费报名</a></li>
            <li><a href="##"><span></span>商家入驻</a></li>
            <li><a href="##"><span></span>廉政邮箱</a></li>
            <li><a href="##"><span></span>开放平台</a></li>
        </ul>
        <ul class="list_center_ul">
            <dt>公司信息</dt>
            <li><a href="##"><span></span>关于卷皮</a></li>
            <li><a href="##"><span></span>媒体报道</a></li>
        </ul>
        <ul class="list_center_ul">
            <dt>帮助中心</dt>
            <li><a href="##"><span></span>新手上路</a></li>
            <li><a href="##"><span></span>网站地图</a></li>
        </ul>
    </div>
    <div class="list_right">
        <a href="##" class="list_right_kefu"></a>
        <div class="list_right_txt">
            <p>周一至周日</p>
            <p>9:00-21:00</p>
        </div>
    </div>
</div>
<div class="footer_info clearfix">
    <p>武汉奇米网络科技有限公司 鄂ICP备10209250号 | ICP许可证号：鄂B2-20150109 | 鄂公网安备42018502000390号 | 食品流通许可证 SP4201991510041888　</p>
    <p>Copyright © 2010 -2018 JuanPi.com All Rights Reserved</p>
</div>
<div class="footer_sign clearfix">
    <div class="sign_box">
        <a href="##"><img src="../img/common/r_315new.gif" alt=""></a>
        <a href="##"><img src="../img/common/r_cnnic.gif" alt=""></a>
        <a href="##"><img src="../img/common/r_gongshang.gif" alt=""></a>
        <a href="##"><img src="../img/common/sm_124x47.png" alt=""></a>
    </div>
</div>
</div>`;
//给页脚扩展功能
$.extend(Footer.prototype,{
    //初始化
    init:function(){
        this.ele = $("<div></div>").append(Footer.Template);
        this.container.append(this.ele);
    }
})