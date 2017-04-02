var p1,p2;
var bullet = [];
var blocks = mapMgr.getStages();

function ObjManage(){

    // 플레이어 객체
    // Enemy 2개
    var players = [];
    var enemys = [];

    p1 = new Player();
    p1.init(100, 100);
    p1.setPos(100, 100);
    p2 = new Player();
    p2.init(300, 300);
    p2.setPos(500, 500);
    players.push(p1);
    players.push(p2);
    e1 = new Enemy();
    e1.init(250, 250);
    e2 = new Enemy();
    e2.init(400, 400);
    
    enemys.push(e1);
    enemys.push(e2);
    
    var dirCount = 10;
    var dirStr = 'left';
    this.renderer = function(){
        // 화면내 오브젝트 모두 그리기
        // foreach
        p1.draw();
        p2.draw();
        if(bullet != 0) {
            bullet.forEach( function(piece) {
                piece.move(); //개발중 차후 옹립.
                piece.draw();
            });
        }
        
        if(enemys != 0) {
            enemys.forEach( function(enemy) {
                enemy.move(dirStr);
                enemy.draw();
                if(dirCount == 0) {
                    if(dirStr == 'left') {
                        dirStr = 'right';
                    }
                    else if(dirStr == 'right') {
                        dirStr = 'left';
                    }
                    
                    dirCount = 50;
                }
                
                dirCount--;
            })
        }
    }
}



// ######################
//## 플레이어 객체 생성자
//## 작성자 : 이장희
//## 일시 : 07 3 24
//  + position : structure
//     + x : int
//     + y : int

//  + speed  : float
//  + lives  : int
//  + direction : CONFIG.direction 상수

function Player(){
    this.position = {
        x : 0,
        y : 0
    };
    this.direction = CONFIG.direction['up'];
    this.sprite = new imgTank();
    this.lives = 1 | 0;
    this.speed = CONFIG.PLAYER.SPEED;
}

Player.prototype.init = function(playerPosX, playerPosY) {
  this.position.x = 10;
  this.position.y = 10;
  this.direction = CONFIG.direction['up'];
  this.sprite.setTankColor('yellow');
  this.sprite.setTankNumber(0);
};

Player.prototype.draw = function() {
    this.sprite.draw();
};

Player.prototype.setPos = function(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.sprite.setPos(this.position.x, this.position.y, CONFIG.direction['up']);
};

Player.prototype.setDir = function(dir) {
    this.direction = dir;
};

Player.prototype.move = function(dir) {
    //
    
    
    var tmpPosY, tmpPosX;
    
    switch (CONFIG.direction[dir]) {
        case CONFIG.direction['up']:
            tmpPosY = this.position.y - CONFIG.PLAYER.SPEED;
            tmpPosX = this.position.x;
            break;
        case CONFIG.direction['right']:
            tmpPosY = this.position.y;
            tmpPosX = this.position.x + CONFIG.PLAYER.SPEED;
            
            break;
        case CONFIG.direction['down']:
            
            tmpPosY = this.position.y + CONFIG.PLAYER.SPEED;
            tmpPosX = this.position.x ;
            
            break;
        case CONFIG.direction['left']:
            tmpPosY = this.position.y ;
            tmpPosX = this.position.x - CONFIG.PLAYER.SPEED;

            break;
        default:
            console.log( 'err054');
            // 문제발생
            // code
    }
    
    
    
    var col = false;
    
    blocks.forEach(function(elem) {
        
        
        if( !elem )
            return ;
            
        var sx1 = tmpPosX;
        var sx2 = tmpPosX + CONFIG.SPRITESIZE;
        
        var sy1 = tmpPosY;
        var sy2 = tmpPosY + CONFIG.SPRITESIZE;

        var dx1 = elem.col * CONFIG.SPRITESIZE;
        var dx2 = elem.col * CONFIG.SPRITESIZE + CONFIG.SPRITESIZE;
        
        var dy1 = elem.row * CONFIG.SPRITESIZE;
        var dy2 = elem.row * CONFIG.SPRITESIZE + CONFIG.SPRITESIZE;
        
        var res1 = (sx1 < dx1 && dx1 < sx2) || ( sx1 < dx2 && dx2 < sx2 );
        var res2 = false;
        if( res1 ) {
            res2 = (sy1 < dy1 && dy1 < sy2) || ( sy1 < dy2 && dy2 < sy2 );
            if( res2 ) {
                col = true;
                return ;
            }
        }   
        
    });
    
    
    if( col ){ // 충돌 발생시 처리
        
    } else { // 충돌 미 발생시 처리
        
        this.sprite.spriteChange();
        this.position.y = tmpPosY;
        this.position.x = tmpPosX;
    }
    
    // 상관없이 처리
    this.direction = CONFIG.direction[dir];
    this.sprite.setPos(this.position.x, this.position.y, this.direction);
    
    
};

Player.prototype.fire = function() {
        var b1 = new Bullet();
        b1.setPos(this.position.x, this.position.y, this.direction);
        bullet.push(b1);
        
};

// ###################### Player 생성자 마침

// ######################
//## 불렛 객체 생성자
//## 작성자 : 이장희
//## 일시 : 07 3 25
//  + position : structure
//     + x : int
//     + y : int

//  + speed  : float
//  + lives  : int
//  + direction : CONFIG.direction 상수

function Bullet() {
  this.position = {
    x : 0,
    y : 0
  };
  this.direction = CONFIG.direction['up'];
  this.sprite = new imgBullet();
  this.speed = CONFIG.PLAYER.SPEED;
}

Bullet.prototype.draw = function() {
    this.sprite.draw();
};


Bullet.prototype.setPos = function(x, y, dir) {
    this.position.x = x;
    this.position.y = y;
    this.direction = dir;
};

Bullet.prototype.move = function() {
  switch (this.direction) {
      case CONFIG.direction['up']:
          this.position.y -= CONFIG.PLAYER.SPEED;
          this.sprite.setPos(this.position.x, this.position.y, this.direction);
          break;
      case CONFIG.direction['right']:
          this.position.x += CONFIG.PLAYER.SPEED;
          this.sprite.setPos(this.position.x, this.position.y, this.direction);
          break;
      case CONFIG.direction['down']:
          this.position.y += CONFIG.PLAYER.SPEED;
          this.sprite.setPos(this.position.x, this.position.y, this.direction);
          break;
      case CONFIG.direction['left']:
          this.position.x -= CONFIG.PLAYER.SPEED;
          this.sprite.setPos(this.position.x, this.position.y, this.direction);
          break;
    };
};

// ###########################

function Enemy() {
    this.position = {
        x : 0,
        y : 0
    };
    this.direction = CONFIG.direction['up'];
    this.sprite = new imgTank();
    this.lives = 1 | 0;
    this.speed = CONFIG.PLAYER.SPEED;
}

Enemy.prototype.init = function(playerPosX, playerPosY) {
  this.position.x = playerPosX;
  this.position.y = playerPosY;
  this.direction = CONFIG.direction['up'];
  this.sprite.setTankColor('puple');
  this.sprite.setTankNumber(2);
};

Enemy.prototype.move = function(dir) {
    this.sprite.spriteChange();
    switch (CONFIG.direction[dir]) {
        case CONFIG.direction['up']:
            this.position.y -= CONFIG.PLAYER.SPEED;
            this.direction = CONFIG.direction['up'];
            this.sprite.setPos(this.position.x, this.position.y, this.direction);
            break;
        case CONFIG.direction['right']:
            this.position.x += CONFIG.PLAYER.SPEED;
            this.direction = CONFIG.direction['right'];            
            this.sprite.setPos(this.position.x, this.position.y, this.direction);
            break;
        case CONFIG.direction['down']:
            this.position.y += CONFIG.PLAYER.SPEED;
            this.direction = CONFIG.direction['down'];
            this.sprite.setPos(this.position.x, this.position.y, this.direction);
            break;
        case CONFIG.direction['left']:
            this.position.x -= CONFIG.PLAYER.SPEED;
            this.direction = CONFIG.direction['left'];
            this.sprite.setPos(this.position.x, this.position.y, this.direction);
            break;
        default:
            // code
    }
};

Enemy.prototype.draw = function() {
    this.sprite.draw();
};
