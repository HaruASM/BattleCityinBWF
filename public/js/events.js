//### // input management
//### events.js
//### 감수 : 정해균

/* global config값을 config.js에 둠*/

function Events(doc){
  'use strict';
  this.doc = doc; // 안쓰는 속성.
  this.cvs = document.getElementById('canvas');
  this.cvs.focus();
  
}


Events.prototype.cvsKeyBind = function(functor) {
  // this.cvs.addEventListener('keydown', function(e) {
  //   if(key_set_1p.indexOf(e.keyCode) >= 0 && functor[e.keyCode]) {
  //     functor[e.keyCode]();
  //   }
    
  //   e.stopPropagation();
  //   e.preventDefault();
  // });
  
  // this.cvs.addEventListener('keydown', function(e) {
  //   if(key_set_2p.indexOf(e.keyCode) >= 0 && functor[e.keyCode]) {
  //     functor[e.keyCode]();
  //   }
    
  //   e.stopPropagation();
  //   e.preventDefault();
  // })
  this.cvs.addEventListener('keydown', function(e) {
    if(functor[e.keyCode]) {
      functor[e.keyCode]();
    }
    
    e.stopPropagation();
    e.preventDefault();
  });
  
}