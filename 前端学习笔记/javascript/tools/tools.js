(function(){
    function getPageScroll(){
        let x,y;
        if(window.pageXOffset){
            x=window.pageXOffset;
            y=window.pageYOffset;
        }else if(document.compatMode==="BackCompat"){
            x=document.body.scrollLeft;
            y=document.body.scrollTop;
        }else{
            x=document.documentElement.scrollLeft;
            y=document.documentElement.scrollTop;
        }
        return{
            x:x,
            y:y
        }
    }//获取网页的滚动距离
    function getScreen(){
        let width,height;
        if(window.innerWidth){
            width=window.innerWidth;
            height=window.innerHeight;
        }else if(document.compatMode==="BackCompat"){
            width=document.body.clientWidth;
            height=document.body.clientHeight;
        }else{
            width=document.documentElement.clientWidth;
            height=document.documentElement.clientHeight;
        }
        return{
            width:width,
            height:height
        }
    }//获取网页可视区域的宽高
    function addEvent(ele,name,fn){
        if(ele.attachEvent){
            ele.attachEvent("on"+name,fn);
        }else{
            ele.addEventListener(name,fn);
        }
    }//添加事件,name为事件名称,例如""click";
    function getStyleAttribute(obj,name){
        if(obj.currentStyle){
            return obj.currentStyle[name];
        }else{
            return getComputedStyle(obj)[name];
        }
    }//获取元素的样式,传入的name为样式名,需要""包裹起来":比如""width";

    let timerId=null;
    function linearAnimation(ele,obj,fn){//缓动动画
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
        }, 100); 
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
        }, 100); 
    }
    function animation(i,screenHeight){//页面滚动缓动动画
        clearInterval(timer);
        timer=setInterval(function(){
            let begin=document.documentElement.scrollTop;
            let target=i*screenHeight;
            let step=(target-begin)*0.3;
            begin+=step;
            if(Math.abs(Math.floor(step))<=1){
                clearInterval(timer);
                document.documentElement.scrollTop=i*screenHeight;
                return;
            }
            document.documentElement.scrollTop=begin;
        },50); 
    }
    function debounce(fn,delay){//函数防抖(十次只执行一次)
        let timerId=null;
        return function(){
            let self=this;
            let args=arguments;
            timerId&&clearTimeout(timerId);
            timerId=setTimeout(function(){
                fn.apply(self,args);//将self和args中的this改为oInput(调用函数的对象)
            },delay||1000);
        }
    }
    function throttle(fn,delay){//函数节流(十次执行3-4次)
        let timerId=null;
        let flag=true;
        return function(){
            if(!flag) return;
            flag=false;
            let self=this;
            let args=arguments;
            timerId&&clearTimeout(timerId);
            timerId=setTimeout(function(){
                flag=true;
                fn.apply(self,args);//将self和args中的this改为oInput(调用函数的对象)
            },delay||1000);
        }
    }
    function depCopy(target,source){//数据的深拷贝
        //1.通过遍历拿到source中的所有属性和方法;
        for(let key in source){
        //取出当前遍历到的属性和方法的取值;
        let sourceValue=source[key];
            if (sourceValue instanceof Object){//判断sourceValue是否是Object的实例对象;[所有对象都是Object的实例对象]
//这里是为了避免p2从p1中复制过来的数组或者函数会一起存储在p2的原型对象中;
                let subTarget=new sourceValue.constructor;//通过constructor属性可以找到实例对象的构造函数,从而判断该实例对象是对象还是数组;
                                                        //再通过new来创造一个新的对象,这样就会创造出一个新的存储空间
                                                        //从而让p2中的数据存储在新的存储空间中,不影响p1存储空间中的数据;
                depCopy(subTarget,sourceValue);//将遍历到的属性或者方法的值传递给新建的对象中;
                target[key]=subTarget;//将新建的对象或数组放入target[key]中; 
            }else{
                target[key]=sourceValue;//将基本类型数据直接放入target[key]中;
            }
        }
    }

    window.throttle=throttle;
    window.debounce=debounce;
    window.animation=animation;
    window.linearAnimation=linearAnimation;
    window.easeinAnimation=easeinAnimation;

    window.getPageScroll=getPageScroll;
    window.getScreen=getScreen;
    window.addEvent=addEvent;
    window.getStyleAttribute=getStyleAttribute;
    window.depCopy=depCopy;
})()


//兼容性问题解决工具集