class Snake{
    constructor(parameter){
        parameter=parameter||{};//防止未传参报错
        this.width=parameter.width||62.5;
        this.height=parameter.height||62.5;
        this.headImg=parameter.headImg||"images/button5.jpg";
        this.bodyImg=parameter.bodyImg||"images/button4.jpg";
        this.snakeMap=parameter.snakeMap||{};
        this.bodies=[
            {x:2,y:1,type:1},//x代表left;y表示top;type表示头尾;
            {x:1,y:1,type:0},
            {x:0,y:1,type:0},
        ];
         //4.2获取地图的宽高
            let style=getComputedStyle(this.snakeMap.oMap);
            let mapWidth=parseInt(style.width);
            let mapHeight=parseInt(style.height);
        //4.3计算水平和垂直方向分别能放多少食物;
            this.colNum=mapWidth/this.width;
            this.rowNum=mapHeight/this.height;
        //给蛇对象设置onkeydown属性
        document.body.onkeydown=(event)=>{//使用箭头函数,确定this
            this.key=event.key;//key为按键名称;
        }
    }
    move(){
            //1.修改蛇身的位置
            for(let i=this.bodies.length-1;i>0;i--){
                this.bodies[i].x=this.bodies[i-1].x;
                this.bodies[i].y=this.bodies[i-1].y;
            }
            //2.修改蛇头的位置
            let head=this.bodies[0];
            switch(this.key){
                case "a":
                    head.x=head.x-1;
                    break;
                case "d":
                    head.x=head.x+1;
                    break;
                case "w":
                    head.y=head.y-1;
                    break;
                case "s":
                    head.y=head.y+1;
                    break;
                default:
                    head.x=head.x+1;
                    break;
            }
    }
    inspection(snakeFood){
        let head=this.bodies[0];
        //3.判断蛇有没有超出地图
        if(head.x<0||head.y<0||head.x>=this.colNum||head.y>this.rowNum){
            //1.提示用户
            alert("游戏结束!");
            //2.关闭定时器
            clearInterval(this.timer);
            return false;
        }
        //4.判断蛇有没有吃到食物
        if(head.x===snakeFood.x&&head.y===snakeFood.y){
            //删除已被吃掉的食物
            snakeFood.remove();
            //重新生成食物
            snakeFood.render();
            //1.获取最后一截蛇身的位置
            let lastBody=this.bodies[this.bodies.length-1];
            //2.新建一截蛇身
            let newBody={x:lastBody.x,y:lastBody.y,type:0};
            //根据当前移动的方向调整蛇身增加的位置
            switch(this.key){
                case "a":
                    newBody.x=newBody.x-1;
                    break;
                case "d":
                    newBody.x=newBody.x+1;
                    break;
                case "w":
                    newBody.y=newBody.y+1;
                    break;
                case "s":
                    newBody.y=newBody.y-1;
                    break;
                default:
                    newBody.x=newBody.x-1;
                    break;
            }
            //3.将新建的蛇身添加到数组中
            this.bodies.push(newBody);
        }
        return true;
    }
    update(snakeFood){
        this.timer=setInterval(()=>{
        //1.让蛇移动起来
        this.move();
        //2.检测边界和食物
        let flag=this.inspection(snakeFood);
        if(!flag){//如果触碰边界则return,后面的代码不执行
            return;
        }
        //3.重新绘制蛇
            this.render();
        
        },500);
        
    }
    render(){
        //1.删除过去的蛇
        let snakes=document.querySelectorAll(".snake");
        for(let i=snakes.length-1;i>=0;i--){
            let oDiv=snakes[i];
            oDiv.parentNode.removeChild(oDiv);
        }
        //2.重新绘制蛇
        for(let value of this.bodies){
            //1.创建蛇的某个组成部分
            let oDiv=document.createElement("div");
            //2设置某个组成部分的样式
            oDiv.style.width=this.width+"px";
            oDiv.style.height=this.height+"px";
            oDiv.className="snake";
            if(value.type===1){
                oDiv.style.background=`url(${this.headImg})`;
            }else{
                oDiv.style.background=`url(${this.bodyImg})`;
            }
            //3.设置某个组成部分的位置
            oDiv.style.position="absolute";
            oDiv.style.left=value.x*this.width+"px";
            oDiv.style.top=value.y*this.height+"px";
            //4.将某个部分添加到地图中;
            this.snakeMap.oMap.appendChild(oDiv);
        }
    }
}