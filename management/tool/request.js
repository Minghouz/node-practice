const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
//------------手机
// const url = "http://shop.juanpi.com/deal/84912122";
// const url = "http://shop.juanpi.com/deal/87502650";
// const url = "http://shop.juanpi.com/deal/86812552";
// const url = "http://shop.juanpi.com/deal/86612941";
// const url = "http://shop.juanpi.com/deal/82502640";
// const url = "http://shop.juanpi.com/deal/86442154";
//-------------衣服
// const url = "http://shop.juanpi.com/deal/70778610";
// const url = "http://shop.juanpi.com/deal/72148927";
// const url = "http://shop.juanpi.com/deal/89241036";
// const url = "http://shop.juanpi.com/deal/89941134";
// const url ="http://shop.juanpi.com/deal/88931737";
//-------------零食
// const url = "http://shop.juanpi.com/deal/84452800";
// const url = "http://shop.juanpi.com/deal/74202434";
// const url = "http://shop.juanpi.com/deal/72202034";
// const url ="http://shop.juanpi.com/deal/58157491";
// const url ="http://shop.juanpi.com/deal/87622733";

const dir = '../public/img/upload';
let arr=[];
let maxarr=[];
let detarr=[];
let reg = /(58)/g;

request(url,(err,res,body)=>{
    if(!err&&res.statusCode == 200){
        const $ = cheerio.load(body);
        //爬取小图
        let imgs = $(".deal-pic>ul>li img");
        
        for(var i = 0;i<imgs.length;i++){
            arr.push(imgs.eq(i).attr("src"));
            let str = imgs.eq(i).attr("src");
            let s = str.split("?");
         
            let msrc = s[1].replace(reg,"400");
            let dsrc = s[1].replace(reg,"285");
          
            maxarr.push(s[0]+"?"+msrc);
            detarr.push(s[0]+"?"+dsrc);
        }
        // console.log(arr);
        // console.log("----------------------------------------");
        // console.log(maxarr);
        //下载小图和大图
        for(var i=0;i<arr.length;i++){
            download(arr[i],dir,"58_"+Date.now()+i+".jpg");
            download(detarr[i],dir,"285_"+Date.now()+i+".jpg");
            download(maxarr[i],dir,"400_"+Date.now()+i+".jpg");
        }
    }
})

//封装下载的方法
let download = (url,dir,filename)=>{
    request.head(url,()=>{
        request(url).pipe(fs.createWriteStream(dir+"/"+filename))
    })
}