

function ObjManage(){
    
    // 플레이어 객체
    
    
    // Enemy 2개
    
    var players = [];
    var enemys = [];
    
    var p1 = new Player();
    p1.setPos(100, 100);
    var p2 = new Player();
    p2.setPos(700, 100);

    players.push(p1);
    players.push(p2);

    this.renderer = function(){
    
        // 화면내 오브젝트 모두 그리기 
        // foreach
        
        players.forEach(function(player) {
           var tank = new Tank();
           tank.init(player.position.x, player.position.y, 'left');
           tank.draw(2);
        });
        
    }   
}




function Player(){
    this.position = {
        x : 0,
        y : 0
    };
    this.direction = {
        'up' : 0,
        'left' : 1,
        'down' : 2,
        'right' : 3
    };
    
    this.speed = 1;
    this.lives = 1;
    
    // 위치,
    // hp
    // 속도
    
    //
}

Player.prototype.setPos = function(x, y) {
    this.position.x = x;
    this.position.y = y;
}

Player.prototype.setDir = function(dir) {
    this.direction = dir;
}