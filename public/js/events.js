//### // input management
//### events.js
//### 감수 : 정해균
/* global config값을 config.js에 둠*/

function Events(doc){
  'use strict';
  this.doc = doc; // 안쓰는 속성.
  this.cvs = document.getElementById('canvas');
  this.cvs.focus();
  
  // 마우스 이벤트관련 속성
  this.downX = undefined; // 마우스가 클릭되는 X
  this.downY = undefined; // 마우스가 클릭되는 Y
  this.mouseEventFlag = undefined; // 현재 마우스로 클릭 중인가?? 드래그 중인가??
  this.curX = undefined; // 드래그할 때 현재 X
  this.curY = undefined; // 드래그할 때 현재 Y
  
  // 드래그 박스에 대한 정보.
  this.dragRect = {
    x:0,y:0,
    w:0,h:0
  };
}

// 내용 게임내 버튼 액션 이벤트 바인딩
Events.prototype.cvsKeyBind = function(functor) {
  this.cvs.addEventListener('keydown', function(e) {
    if(functor[e.keyCode]) {
      functor[e.keyCode]();
    }
    
    e.stopPropagation();
    e.preventDefault();
  });
}

// 드래그 박스를 그리는 메서드, renderLoop에서 호출됨
Events.prototype.dragBoxRenderer = function() {
  if(this.mouseEventFlag === CONFIG.MOUSE_EVENT.DRAG) {
    var ctx = this.cvs.getContext('2d');
    var dragRect = this.dragRect;
    
    ctx.strokeStyle = 'white';
    ctx.strokeRect(dragRect.x, dragRect.y, dragRect.w, dragRect.h); 
  }
}

// 맵 에디터 마우스 이벤트 바인딩
Events.prototype.cvsMouseBind = function(funcObj) {
  var canvas = this.cvs;
  
  canvas.addEventListener('mousedown', function(e) {
    this.downX = e.offsetX;
    this.downY = e.offsetY;

    this.mouseEventFlag = CONFIG.MOUSE_EVENT.CLICK;
  }.bind(this));
  
  canvas.addEventListener('mousemove', function(e) {
    if(this.downX && this.downY) {
      var diff = 10,
          curX = e.offsetX,
          curY = e.offsetY,
          conditionA, conditionB;
      
      conditionA = (curX-diff <= this.downX && this.downX <= curX+diff);
      conditionB = (curY-diff <= this.downY && this.downY <= curY+diff);

      // downX, downY를 기준으로 curX, curY가 일정 범위(10)안에 있으면 클릭
      if(conditionA && conditionB) {
        this.mouseEventFlag = CONFIG.MOUSE_EVENT.CLICK;
      // 아니면 드래그 중인 걸로 간주
      } else {
        this.mouseEventFlag = CONFIG.MOUSE_EVENT.DRAG;  
        this.dragRect.x = this.downX;
        this.dragRect.y = this.downY;
        this.dragRect.w = curX-this.downX;
        this.dragRect.h = curY-this.downY;
      }
    }
  }.bind(this));
  
  canvas.addEventListener('mouseup', function(e) {
    var selectedBlocks = [],
        releasedX = e.offsetX, // 마우스가 릴리즈되는 X
        releasedY = e.offsetY, // 마우스가 릴리즈되는 Y
        // 드래그 박스를 그리기 위한 정보들.
        leftTopX, leftTopY, rightBotX, rightBotY,
        leftTopRow, leftTopCol, rightBotRow, rightBotCol;
    
    if(this.mouseEventFlag === CONFIG.MOUSE_EVENT.CLICK) {
      selectedBlocks.push({
        row:parseInt(releasedY/CONFIG.SPRITESIZE),
        col:parseInt(releasedX/CONFIG.SPRTIESIZE)
      })
    }
    else if(this.mouseEventFlag === CONFIG.MOUSE_EVENT.DRAG) {
      // 좌측 상단 모서리와 우측 하단 모서리의의 x, y 계산
      leftTopX = this.downX < releasedX ? this.downX : releasedX;
      leftTopY = this.downY < releasedY ? this.downY : releasedY;
      rightBotX = this.downX < releasedX ? releasedX : this.downX;
      rightBotY = this.downY < releasedY ? releasedY : this.downY;
      
      // 좌측  상단 모서리와 우측 하단 모서리의 row, col 계산.
      leftTopCol = parseInt(leftTopX / CONFIG.SPRITESIZE);
      leftTopRow = parseInt(leftTopY / CONFIG.SPRITESIZE);
      rightBotCol = parseInt(rightBotX / CONFIG.SPRITESIZE);
      rightBotRow = parseInt(rightBotY / CONFIG.SPRITESIZE);
      
      // 두 지점을 기준으로 그린 드래그 박스안에 있는 블록 저장.
      for(var i = leftTopRow; i <= rightBotRow; i++) {
        for(var j = leftTopCol; j <= rightBotCol; j++) {
          selectedBlocks.push({row:i, col:j});
        }
      }
    }
    
    console.log(selectedBlocks);
    
    selectedBlocks.forEach(function(elem) {
      funcObj.mouseup(elem.row, elem.col);
    });
    
    this.mouseEventFlag = this.downX = this.downY = undefined;
  }.bind(this));
}

// 게임 시스템 관련 마우스 이벤트 바인딩
