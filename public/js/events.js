//### // input management
//### events.js
//### 담당 : 이장희
//### 감수 : 정해균

/* global config */

// X ( 전체 , 캔버스 )
function Events(doc){
  'use strict';
  this.doc = doc; // 안쓰는 속성.
  this.cvs = document.getElementById('canvas');
  this.cvs.focus();
}

Events.prototype.cvsKeyBind = function(funcObj) {
  
    
  this.cvs.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case config.LEFT_KEY_1P:
          funcObj.p1.leftListener();
          break;
      case config.RIGHT_KEY_1P:
          funcObj.p1.rightListener();
          break;
      case config.UP_KEY_1P:
          funcObj.p1.upListener();
          break;
      case config.DOWN_KEY_1P:
          funcObj.p1.downListener();
          break;
      case config.SHOT_KEY_1P:
          funcObj.p1.shotListener();
          break;
      case config.LEFT_KEY_2P:
          funcObj.p2.leftListener();
          break;
      case config.RIGHT_KEY_2P:
          funcObj.p2.rightListener();
          break;
      case config.UP_KEY_2P:
          funcObj.p2.upListener();
          break;
      case config.DOWN_KEY_2P:
          funcObj.p2.downListener();
          break;
      case config.SHOT_KEY_2P:
          funcObj.p2.shotListener();
          break;
    }
        
    e.stopPropagation();
    e.preventDefault();
  });
}