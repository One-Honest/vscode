class SnakeMap{
    constructor(){
        //1.创建div
        let oDiv=document.createElement("div");
        //2.给div添加类名
        oDiv.className="map";
        //3.将div添加到body中
        document.body.appendChild(oDiv);
        this.oMap=oDiv;//提取地图的div
    }
}