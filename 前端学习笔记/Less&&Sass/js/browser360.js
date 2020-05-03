window.onload=function(){
    new fullpage('#fullpage', {
        //fullpage常用属性:(参考主页的[参数])
        sectionsColor: ['#c7adc8', '#edb3bf', '#fbd6b9', '#88d64a','tomato'],//sectionsColor设置每一屏的背景颜色
        navigation:true,//navigation显示侧边的圆点指示器
        navigationTooltips:["新","垣","结","衣","耶"],//设置指示器的提示信息
        showActiveTooltip:true, //（默认为 false）指示器的提示信息主动显示。
        continuousVertical:true,//实现无线循环滚动[若要使用这个key,需要关闭上面的loop+key]
        //fullpage常用回调函数:(参考主页的[回调函数])
        onLeave (origin, destination, direction){//origin:前置页面;destination:目标(当前)页面;direction:目前移动的方向;
            //一旦用户离开 section ，过渡到新 section ，就会触发此回调。 返回 “false” 将在移动发生之前取消移动。
        },
        afterLoad (origin, destination, direction){//origin:前置页面;destination:目标(当前)页面;direction:目前移动的方向;
            // 滚动结束之后，一旦加载了 section ，就会触发回调。第一次进入页面也会触发该事件,但只返回destination对象;
            if(origin!==null){
                origin.item.className=origin.item.className.replace("current","");//滚出当前屏时删除current类
            }
            destination.item.className=destination.item.className+" current";//滚动到当前屏时添加current类
        },
        //自定义菜单:需要配合相应的结构代码使用
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
        menu: '#myMenu',

        verticalCentered:false,//清楚默认的垂直居中样式;
    });
}