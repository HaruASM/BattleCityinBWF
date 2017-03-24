//### // input management
//### events.js
//### 담당 : 이장희
//### 감수 : 정해균

// X ( 전체 , 캔버스 )
function Events( doc, cvs ){
    'use strict';
    
    doc = document;
    cvs = document.getElementById('canvas');
    
    var LEFT_KEY_CODE = 37;
    var RIGHT_KEY_CODE = 39;
    var UP_KEY_CODE = 38;
    var DOWN_KEY_CODE = 40;
    
    cvs.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case LEFT_KEY_CODE:
                console.log('canvas left keydown');
                break;
            case RIGHT_KEY_CODE:
                console.log('canvas right keydown');
                break;
            case UP_KEY_CODE:
                console.log('canvas up keydown');
                break;
            case DOWN_KEY_CODE:
                console.log('canvas down keydown');
                break;
        }
        
        e.stopPropagation();
        e.preventDefault();
    });
    
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case LEFT_KEY_CODE:
                console.log('document left keydown');
                break;
            case RIGHT_KEY_CODE:
                console.log('document right keydown');
                break;
            case UP_KEY_CODE:
                console.log('document up keydown');
                break;
            case DOWN_KEY_CODE:
                console.log('document down keydown');
                break;
            default: break;
        }
    })
    
    
}