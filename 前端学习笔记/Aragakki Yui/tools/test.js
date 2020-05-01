(function(){
    let timer=null;
    function animation(i,screenHeight){//缓动动画
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

    window.animation=animation;
})()