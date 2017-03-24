//### // 메인로직 관리
//### main.js
//### 담당 : 이장희
//### 감수 : 최세준

var loadList = [
    'js/1.js',
    'js/2.js',
    'js/3.js'];

function init_system(){ // 동기적으로 순서대로
    Promise.all(loadList)
        .then (function(){console.log('load end');})
        .catch(function(){console.log('load fail');});
}

window.onload = function() {
    
    console.log('hi');
    
    init_system();
    
    
    try {
        var keyMgr = new Events();  // 해균
    }
    catch(err){
        console.log( err );
        
    }
    
    var tank01 = new Tank();
    tank01.init(100, 100);
    tank01.draw(2);
    

    
    //var imageMgr = new ImagesManage(); // 장희
    
    //imageMgr.drawTank(0, 100, 100);
    
    
    // var sheet = new Image();
    // sheet.src = './images/BattleCityResource.png';
    
    // init_system();
    
    // sheet.onload = function(){
        
    // }
    
    
    
    // [0, 1].forEach(function(element, index, array) {
    //     ctx.drawImage(image, index*spriteWidth, 0, spriteWidth + (index*spriteWidth), spriteHeight, TankPosX, TankPosY, spriteWidth, spriteHeight );
    // }
    // );
    // ctx.drawImage(image, 0, 0, 16, 16, 100, 100, 16, 16);
    // ctx.drawImage(image, 16, 0, 32, 0, 117, 117, 16, 16);
}

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyupHandler, false);

var seqLoad = (function(){
  function load(tag){
      return function(url) {
          return new Promise( function(res, rej){
            var attr, parent;
            var elm = document.createElement(tag);
            elm.onload = function(){console.log('on');                res( url );            };// onload
            elm.onerror = function(){console.log('off');                rej( url );            };
            
            switch( tag ){
              case 'script': 
                elm.async = true;
                attr = 'src';
                parent = 'body';
                break;
              case 'link':
                elm.type = 'text/css';
                elm.rel = 'stylesheet';
                attr = 'href';
                parent = 'head';
                break;
            }// switch
            
            elm[attr] = url;
            document[parent].appendChild(elm);
          }); // return Promise
      }; // return ( url )
  } // load
  
  return {
    css: load('link'),
    js: load('script'),
    img: load('img')
  } // return {}
})(); //seqLoad
