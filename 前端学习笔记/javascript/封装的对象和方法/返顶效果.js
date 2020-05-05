let timerid=null;
    obj.onclick=function(){
        clearInterval(timer);
          timerid=setInterval(function(){
              let begin=getPageScroll().y;
              let target=0;
              let step=(target-begin)*0.3;
              begin+=step;
              if(Math.abs(Math.floor(step))<=1){
                  clearInterval(timer);
                  window.scrollTo(0,0);
                  return;
              }
              window.scrollTo(0,begin);
          },50); 
      }