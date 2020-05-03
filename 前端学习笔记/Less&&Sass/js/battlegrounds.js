window.onload=function(){
    let oToolbar=this.document.querySelector(".toolbar");
    let oNav=this.document.querySelector(".nav");
    let oMyMenu=this.document.querySelector("#myMenu");
    let oMyMenuUp=this.document.querySelector(".menuup");
    let oMyMenuDown=this.document.querySelector(".menudown");
    let oTips=document.querySelector(".tip");
    new fullpage('#fullpage', {
        //fullpage常用属性:(参考主页的[参数])
        sectionsColor: ['#c7adc8', '#edb3bf', '#fbd6b9', '#88d64a','tomato','#c8adc8', '#000'],//sectionsColor设置每一屏的背景颜色
        navigation:true,//navigation显示侧边的圆点指示器
        navigationTooltips:["绝","地","求","生","吃","鸡","喽"],//设置指示器的提示信息
        showActiveTooltip:true, //（默认为 false）指示器的提示信息主动显示。
        continuousVertical:true,//实现无线循环滚动[若要使用这个key,需要关闭上面的loop+key]
        //fullpage常用回调函数:(参考主页的[回调函数])
        onLeave (origin, destination, direction){//origin:前置页面;destination:目标(当前)页面;direction:目前移动的方向;
            //一旦用户离开 section ，过渡到新 section ，就会触发此回调。 返回 “false” 将在移动发生之前取消移动。
            if(destination.isFirst){
                oToolbar.style.display="block";
                oNav.style.top="40px";
                oMyMenu.style.display="none";
            }else{
                oToolbar.style.display="none";
                oNav.style.top="0px";
                oMyMenu.style.display="block";
            }
            if(destination.isLast){
                oTips.style.display="none";
            }else{
                oTips.style.display="block";
            }
        },
        afterLoad (origin, destination, direction){//origin:前置页面;destination:目标(当前)页面;direction:目前移动的方向;
            // 滚动结束之后，一旦加载了 section ，就会触发回调。第一次进入页面也会触发该事件,但只返回destination对象;
            if(origin!==null){
                origin.item.className=origin.item.className.replace("current","");//滚出当前屏时删除current类
            }
            destination.item.className=destination.item.className+" current";//滚动到当前屏时添加current类
        },
        //自定义菜单:需要配合相应的结构代码使用
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],
        menu: '#myMenu',

        verticalCentered:false,//清楚默认的垂直居中样式;
    });
    /* 监听上下固定菜单的点击事件 */
    oMyMenuUp.onclick=function(){
        fullpage_api.moveSectionUp();//滚动到上一屏
    }
    oMyMenuDown.onclick=function(){
        fullpage_api.moveSectionDown();//滚动到下一屏
    }
    /* 初始化第四屏的动画 */
    initSection4Animation();
}
function initSection4Animation(){
    let oLis=document.querySelectorAll(".section-four>ul>li");
    let oImages=document.querySelectorAll(".section-four>ul>li>img");
    let oDays=document.querySelectorAll(".section-four>ul>li>h3");
    for(let i=0;i<oLis.length;i++){
        let item=oLis[i];
        item.onmouseenter=function(){
            oLis[0].style.width="20%";
            oLis[1].style.width="20%";
            oLis[2].style.width="20%";
            oLis[i].style.width="60%";
            oImages[i].style.left="0";
            oImages[i].style.opacity="1";
            oDays[i].style.opacity="0";
        }
        item.onmouseleave=function(){
            oLis[0].style.width="33%";
            oLis[1].style.width="34%";
            oLis[2].style.width="33%";
            oImages[i].style.left="-250px";
            oImages[i].style.opacity="0.6";
            oDays[i].style.opacity="block";
        }
    }
}