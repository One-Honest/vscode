class SnakeFood{
    constructor(width,height,img,snakeMap){
        this.width=width;
        this.height=height;
        this.img=img;
        this.snakeMap=snakeMap;

        //4.1随机生成水平方向和垂直方向上的值
        //4.2获取地图的宽高
        let style=getComputedStyle(this.snakeMap.oMap);
        let mapWidth=parseInt(style.width);
        let mapHeight=parseInt(style.height);
        //4.3计算水平和垂直方向分别能放多少食物;
        this.colNum=mapWidth/this.width;
        this.rowNum=mapHeight/this.height;
    }
    render(){//渲染;调用snakeMap对象
        //1.创造食物
        let oDiv=document.createElement("div");
        //2.设置食物的样式
        oDiv.style.width=this.width+"px";//注意设置样式需添加px
        oDiv.style.height=this.height+"px";
        oDiv.style.background=`url(${this.img})`;
        //4.1随机生成水平方向和垂直方向上的值
        let{x,y}=this.generateLocation();//解构赋值
        this.x=x;
        this.y=y;
        //4.4随机设置食物的位置;
        oDiv.style.position="absolute";
        oDiv.style.left=x*this.width+"px";
        oDiv.style.top=y*this.height+"px";
        //3.将食物添加到地图中
        this.snakeMap.oMap.appendChild(oDiv);
        this.oFood=oDiv;//保存这里的oDiv;
    }
    remove(){
        this.oFood.parentNode.removeChild(this.oFood);
    }
    generateLocation(){
            let x=getRandomIntInclusive(0,this.colNum-1);
            let y=getRandomIntInclusive(0,this.rowNum-1);
            return{x:x,y:y};//将获取的数值封装成一个对象返回;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
  }