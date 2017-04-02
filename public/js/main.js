//### // 메인로직 관리
//### main.js
//### 담당 : 이장희
//### 감수 : 최세준


// db 관리
var db = function(window){
  var window = window;
  
  return {
  syncDB : function(){
    
  },
  saveMapData : function(code, name ,mapdataObjs ){
    // 1 : save 멥 데이타 front -> back
    // 2 : load 멥데이타  back -> front
    // 3 : 1 -> ok 
    // 4 : 2 -> ok
    var params = { code : code ,
      datas : { name : name,
      data : mapdataObjs }
    };
    
    console.log( params);
    
    window.sendData( params , function(res){
      var tmp = JSON.parse(res);
      console.log( tmp );
      
    });// sendData
  }, 
    loadMapData : function(code, name, callback ){
      var params = { code : code ,
        datas : { name : name }
      };
      window.sendData( params, function(res){
        var tmp = JSON.parse(res);
        console.log( tmp.msg );
      
        callback(tmp.data);

      });
      
    }
  }; // 인터페이스 선언부
}(window);


function main() {
  console.log( 'running main frame!');
  try {
    // 초기 설정값 부분 - 이후 이동
    
    var objMgr = new ObjManage();
    
    var keyListener = {};
    keyListener[CONFIG.KEYPAD.UP_KEY_1P] = function(){   p1.move('up'); };
    keyListener[CONFIG.KEYPAD.LEFT_KEY_1P] = function(){      p1.move('left'); console.log('Player 1 keydown LEFT');    };
    keyListener[CONFIG.KEYPAD.RIGHT_KEY_1P] = function(){     p1.move('right'); console.log('Player 1 keydown RIGHT');    };
    keyListener[CONFIG.KEYPAD.DOWN_KEY_1P] = function(){      p1.move('down'); console.log('Player 1 keydown DOWN');    };
    keyListener[CONFIG.KEYPAD.SHOT_KEY_1P] = function(){      p1.fire(); console.log('Player 1 keydown SHOT');    };
    keyListener[CONFIG.KEYPAD.UP_KEY_2P] = function(){       p2.move('up'); console.log('Player 2 keydown UP');    };
    keyListener[CONFIG.KEYPAD.LEFT_KEY_2P] = function(){      p2.move('left'); console.log('Player 2 keydown LEFT');    };
    keyListener[CONFIG.KEYPAD.RIGHT_KEY_2P] = function(){     p2.move('right');  console.log('Player 2 keydown RIGHT');    };
    keyListener[CONFIG.KEYPAD.DOWN_KEY_2P] = function(){      p2.move('down'); console.log('Player 2 keydown DOWN');    };
    keyListener[CONFIG.KEYPAD.SHOT_KEY_2P] = function(){      p2.fire(); console.log('Player 2 keydown SHOT');    };

    var eventMgr = new Events(document);  // 해균
    eventMgr.cvsKeyBind(keyListener);
    
    // 마우스 이벤트 바인딩 위치
    // 작성자 정해균 
    var mouseListener = Object.create(null);
    mouseListener.mouseup = function(row, col) {
      mapMgr.devReleaseBlocks('stage1', row, col, 'selected');
    }
    eventMgr.cvsMouseBind(mouseListener);
    
  }
  catch(err){
    console.log( err );
  }
  
  //임시 코딩 - 테스트
    // mapMgr.setBlocks( 'stage1', 5, 2, 'dummy');
    // mapMgr.setBlocks( 'stage1', 5, 3, 'dummy');
    // mapMgr.setBlocks( 'stage1', 5, 4, 'dummy');
    // mapMgr.setBlocks( 'stage1', 5, 5, 'dummy');
    // mapMgr.setBlocks( 'stage1', 4, 4, 'dummy');
    // mapMgr.setBlocks( 'stage1', 3, 4, 'dummy');
    // mapMgr.setBlocks( 'stage1', 2, 4, 'dummy');

    // mapMgr.devReleaseBlocks( 'stage1', 2, 4);
    // mapMgr.devReleaseBlocks( 'stage1', 5, 2, 'dummy2');
    // //
    
    //ctx.fillStyle="#FF0000";
    
  // 랜더링 처리부
  var aniFrame ;
  (function renderLoop(){
    
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    //
    //ctx.fillRect(x1,y1,w1,h1);
    mapMgr.renderer();
    objMgr.renderer();
    eventMgr.dragBoxRenderer();
    //
    aniFrame = window.requestAnimationFrame(renderLoop);  
  })(); 
  
  var collisionMgr = new CollisionManage();
  // collisionMgr.start();
  
  
  // while(1){ 
  //   objMgr.renderer();
    
  
  //Procedure.start();


  // } //while


 //Procedure([],function(){console.log('render');});
  
  
}
