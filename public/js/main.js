//### // 메인로직 관리
//### main.js
//### 담당 : 이장희
//### 감수 : 최세준


function main() {
  console.log( 'running main frame!');
  try {
    var keyMgr = new Events(document);  // 해균
    keyMgr.cvsKeyBind({
      'p1':{
        'leftListener':function() {
          console.log('Player 1 left keydown');
        },
          'rightListener':function() {
            console.log('Player 1 right keydown');
        },
          'upListener':function() {
            console.log('Player 1 up keydown');
        },
          'downListener':function() {
            console.log('Player 1 down keydown');
          },
          'shotListener':function() {
            console.log('Player 1 shot keydown');
          }
        },
      'p2':{
        'leftListener':function() {
          console.log('Player 2 left keydown');
        },
        'rightListener':function() {
          console.log('Player 2 right keydown');
        },
        'upListener':function() {
          console.log('Player 2 up keydown');
        },
        'downListener':function() {
          console.log('Player 2 down keydown');
        },
        'shotListener':function() {
          console.log('Player 2 shot keydown');
        }
      }
    })
  }
  catch(err){
    console.log( err );
  }
    
  var objMgr = new ObjManage();
  
  objMgr.renderer();
}
