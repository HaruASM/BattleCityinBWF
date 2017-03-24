var spriteWidth = 16;
var spriteHeight = 16;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var imageRepository = new function() {
  this.tank = new Image();
  this.tank.src = "./images/BattleCityResource.png";
}



function Drawable() {
  this.init = function( x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }

  this.canvasWidth = 0;
  this.canvasHeight = 0;

  this.draw = function() {

  };
}

// void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);


// void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
function Tank() {
  
  this.draw = function (tankNum) {
    if(this.dir == 0){
      [0, 1].forEach(function (element) {
        ctx.drawImage(imageRepository.tank, element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
      }, this);
    }
    else if(this.dir == 3) {
      [0, 1].forEach(function (element) {
        ctx.drawImage(imageRepository.tank, 32 + element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
      }, this);
    }
    else if(this.dir == 2) {
      [0, 1].forEach(function (element) {
        ctx.drawImage(imageRepository.tank, 64 + element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
      }, this);
    }
    else if(this.dir == 1) {
      [0, 1].forEach(function (element) {
        ctx.drawImage(imageRepository.tank, 96 + element*spriteWidth, 0 + (tankNum * spriteHeight), 16, 16, this.x, this.y, 32, 32);
      }, this);
    }
  };
}

Tank.prototype = new Drawable();
