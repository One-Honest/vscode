(function(){
    let timerId=null;
    function linearAnimation(ele,destination){//两个参数:移动的元素和终点位置
        //解决bug1:在每一次点击的开始将上一次的定时器删除,避免多个定时器同时设置元素;
        clearInterval(timerId);
       //定义终点位置的变量
       timerId=setInterval(() => {
           //拿到元素当前的位置
           let begin=parseInt(ele.style.marginLeft)||0;
           //定义一个变量来记录步长(每次移动的距离)
           let step=(begin-destination)>0?-13:13;
           //盒子的新位置
           begin+=step;
           //if(begin>=destination){判断方法1
            if(Math.abs(destination-begin)<=Math.abs(step)){//判断方法2//解决bug2:在终点停止
               clearInterval(timerId);
               begin=destination;//解决bug3:当步长不能被整除,停止后将终点位置的值赋值给begin(复位)
           }
           //将新位置的值传递给元素的属性
           ele.style.marginLeft=begin+"px";
       }, 100);
   }
   function easeinAnimation(ele,destination){//两个参数:移动的元素和终点位置
        //解决bug1:在每一次点击的开始将上一次的定时器删除,避免多个定时器同时设置元素;
        clearInterval(timerId);
       //定义终点位置的变量
       timerId=setInterval(() => {
           //拿到元素当前的位置
           let begin=parseInt(ele.style.marginLeft)||0;
           //定义一个变量来记录步长(每次移动的距离);匀减速动画公式:(begin-destination)*系数[0~1]
           let step=(destination-begin)*0.3;
           //盒子的新位置
           begin+=step;
           //if(begin>=destination){判断方法1
            if(Math.abs(Math.floor(step))<=1){//判断方法2//解决bug2:在终点停止
               clearInterval(timerId);
               begin=destination;//解决bug3:当步长不能被整除,停止后将终点位置的值赋值给begin(复位)
           }
           //将新位置的值传递给元素的属性
           ele.style.marginLeft=begin+"px";
       }, 100);
   }
   
   //给window对象绑定事件
   window.linearAnimation=linearAnimation;
   window.easeinAnimation=easeinAnimation;
})();