//## 상수객체 모음
//## 작성 : 정해균
//## 감수 : 이준택

var CONFIG = Object.create(null);

// ## 상수 - 키패드
// ## 작성자 정해균
// ## 일시 : 17 03 25
// ## targ : main.js, events.js
// ## 주의, CONFIG.KEYPAD는 Object.prototype의 속성을 상속받음
CONFIG.KEYPAD = {
  'LEFT_KEY_1P':65,
  'RIGHT_KEY_1P':68,
  'UP_KEY_1P':87,
  'DOWN_KEY_1P':83,
  'SHOT_KEY_1P':32,
  
  'LEFT_KEY_2P':37,
  'RIGHT_KEY_2P':39,
  'UP_KEY_2P':38,
  'DOWN_KEY_2P':40,
  'SHOT_KEY_2P':13
};

// ## 상수 - 마우스 이벤트
// ## 작성자 정해균
// ## 일시 : 07 04 01
// ## targ : events.js
// ## 속성
// CLICK, DRAG : 현재 맵 에디터에서 일어나는 마우스 이벤트 Flag
CONFIG.MOUSE_EVENT = {
  CLICK:0,
  DRAG:1
};



// ## 상수 - 방향용 
// ## 작성자 이장희 
// ## 일시 : 17 03 24
// ## targ : objManage.js
CONFIG.direction = {
  up : 0,
  left : 1,
  down : 2,
  right : 3
   
};


// ## 플레이어 상태값
// ## 작성자 이장희
// ## 일시 : 17 03 24
// targ : 플레이어 객체 생성자 Player 에서 사용되는 static 값 
//   - 런타임중 변동 없음

CONFIG.PLAYER = {
  SPEED : 5,
  '1P' : 1,
  '2P' : 2
}

// ## 스프라이트 크기 보정
// ## 작성자 이장희
CONFIG.SPRITESIZE = 64;