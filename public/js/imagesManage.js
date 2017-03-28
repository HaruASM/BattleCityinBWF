// var spriteWidth = 16;
// var spriteHeight = 16;
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// var imageRepository = new function() {
//   this.resource = new Image();
//   this.resource.src = "./images/BattleCityResource.png";
// }


// function Drawable() {
//   this.init = function( x, y, dir) {
//     this.x = x;
//     this.y = y;
//     this.dir = dir;
//   }

//   this.canvasWidth = 0;
//   this.canvasHeight = 0;

//   this.draw = function() {

//   };
// }

// // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

// // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
// function Tank() {
  
//   this.draw = function (tankNum) {
//     if(this.dir == CONFIG.direction['up']){
//       [0, 1].forEach(function (element) {
//         ctx.drawImage(imageRepository.resource, element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
//       }, this);
//     }
//     else if(this.dir == CONFIG.direction['right']) {
//       [0, 1].forEach(function (element) {
//         ctx.drawImage(imageRepository.resource, 32 + element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
//       }, this);
//     }
//     else if(this.dir == CONFIG.direction['down']) {
//       [0, 1].forEach(function (element) {
//         ctx.drawImage(imageRepository.resource, 64 + element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
//       }, this);
//     }
//     else if(this.dir == CONFIG.direction['left']) {
//       [0, 1].forEach(function (element) {
//         ctx.drawImage(imageRepository.resource, 96 + element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
//       }, this);
//     }
//   };
// }

// function Wall() {
//   this.draw = function() {
//     ctx.drawImage(imageRepository.resource, 252, 0, 16, 16, this.x, this.y, 32, 32);
//   };
// }

// function Bullet() {
//   this.draw = function() {
    
//   };
// }

// function Explosion() {
//   this.draw = function() {
    
//   };
// }

// Explosion.prototype = new Drawable();
// Bullet.prototype = new Drawable();
// Wall.prototype = new Drawable();
// Tank.prototype = new Drawable();

var spriteWidth = 16;
var spriteHeight = 16;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var spriteDirValue = [0, 32, 64, 96];
var tankColor = {
  yellow : {x : 0, y : 0},
  white : {x : 128, y : 0},
  green : {x : 0, y : 128},
  puple : {x : 128, y : 128}
};

var spriteSize = CONFIG.SPRITESIZE;

var imageRepository = {};
imageRepository.resource = document.getElementById('resource');
//function() {
  
  //return document.getElementById('resource');
  
  // this.resource = new Image();
  // this.resource.src = "./images/BattleCityResource.png";
//}

/*
  함수명 : Drawable
  기능 : Tank, Wall 등등 이미지가 그려질때 필요한 공통 분모들을 모아노은 상위 객체
*/
function Drawable() {
  this.spriteNum = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;
}


Drawable.prototype.setPos = function( spritePosX, spritePosY, spriteDir) {
  this.x = spritePosX;
  this.y = spritePosY;
  this.spriteDir = spriteDir;
};

Drawable.prototype.setSpriteDir = function(spriteDir) {
  this.spriteDir = spriteDir;
};

Drawable.prototype.draw = function() {
  // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


Explosion.prototype = new Drawable();

/*
  함수명 : imgTank
  기능 : Tank이미지를 색깔, 방향에 맞게 그린다.
*/

function imgTank() {
  this.tankNumber = 0;
  this.tankColor = 'yellow';
}

imgTank.prototype = new Drawable();


imgTank.prototype.setTankColor = function(tankColor) {
  this.tankColor = tankColor;
};

imgTank.prototype.setTankNumber = function(tankNumber) {
  this.tankNumber = tankNumber * spriteHeight;
};

imgTank.prototype.spriteChange = function() {
  if(this.spriteNum == 1) this.spriteNum = 0;
  else this.spriteNum++;
}

imgTank.prototype.draw = function () {
  ctx.drawImage(
    imageRepository.resource, 
    tankColor[this.tankColor].x + spriteDirValue[this.spriteDir] + (this.spriteNum * spriteWidth), 
    tankColor[this.tankColor].y + this.tankNumber, 
    spriteWidth, 
    spriteHeight, 
    this.x, 
    this.y, 
    spriteSize, 
    spriteSize);
};


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

/*
  함수명 : imgWall
  기능 : Wall이미지를 색깔, 방향에 맞게 그린다.
*/


function imgWall() {
  this.currentWall = 0;
  this.wallType = {
    brick : 0,
    steel : 1,
    water : 2
  };

  this.brokenWall = {
    leftBroken : 16,
    upBroken : 32,
    rightBroken : 48,
    leftBroken : 64
  };
}

imgWall.prototype = new Drawable();


imgWall.prototype.draw = function() {
  ctx.drawImage(imageRepository.resource, this.spritePosX, this.spritePosY + ( this.wallType[this.currentWall] * spriteHeight ), spriteWidth, spriteHeight, this.x, this.y, spriteSize, spriteSize);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function imgBullet() {
  this.spritePos = {
    x : 320,
    y : 96
  };
  this.direction = [0, 8, 16, 24];
}

imgBullet.prototype = new Drawable();

imgBullet.prototype.draw = function() {
  ctx.drawImage(imageRepository.resource, this.spritePos.x + this.direction[this.spriteDir], this.spritePos.y + 4, 8, 8, this.x + 8, this.y + 8, 24, 24);
};

function Explosion() {
  this.draw = function() {

  };
}

