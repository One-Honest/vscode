(function(){
    let timerId=null;
    function linearAnimation(ele,obj,fn){//缓动动画(传递参数分别为:元素名称,元素属性数组,动画结束后的其他操作的函数)
        clearInterval(timerId);
        timerId=setInterval(() => {//定时器的回调函数
            //定义flag用于标记是否所有的属性都执行完了动画
            let flag=true;
            for(let key in obj){//遍历数组
                let attr=key;//获取数组中的属性作为attr
                let destination=obj[key];//获取数组中的属性值;
                let style=getComputedStyle(ele);//定义一个变量存储元素,系统返回一个数组;
                let begin=parseInt(style[attr])||0;//直接设置一个attr形参,需要哪个属性变化,直接在运用函数时传参即可
                let step=(destination-begin)*0.5;
                /* console.log(destination);
                console.log(begin); */
                begin+=step;
                if(Math.abs(Math.floor(step))>1){//当动画未执行完时    
                    flag=false;//将flag变为false
                }else{
                    begin=destination;
                }
                ele.style[attr]=begin+"px";
            }
            if(flag){//此处代表flag=true
                clearInterval(timerId);//只有在flag为真时才关闭定时器
                fn&&fn();//并字符串表示只有前者为真才执行后者,若前者为假则不执行后者;
            }
        }, 200); 
    }

    function easeinAnimation(ele,obj,fn){//匀速动画
        clearInterval(timerId);
        timerId=setInterval(() => {//定时器的回调函数
            //定义flag用于标记是否所有的属性都执行完了动画
            let flag=true;
            for(let key in obj){//遍历数组
                let attr=key;//获取数组中的属性作为attr
                let destination=obj[key];//获取数组中的属性值;
                let style=getComputedStyle(ele);//定义一个变量存储元素,系统返回一个数组;
                let begin=parseInt(style[attr])||0;//直接设置一个attr形参,需要哪个属性变化,直接在运用函数时传参即可
                /*let step=(destination-begin)*0.1;
                console.log(destination);
                console.log(begin); */
                let step=(begin-destination)>0?-43:43;
                begin+=step;
                if(Math.abs(destination-begin)>Math.abs(step)){//当动画未执行完时    
                    flag=false;//将flag变为false
                }else{
                    begin=destination;
                }
                ele.style[attr]=begin+"px";
            }
            if(flag){//此处代表flag=true
                clearInterval(timerId);//只有在flag为真时才关闭定时器
                fn&&fn();//并字符串表示只有前者为真才执行后者,若前者为假则不执行后者;
            }
        }, 200); 
    }
    window.linearAnimation=linearAnimation;
    window.easeinAnimation=easeinAnimation;
}
)();