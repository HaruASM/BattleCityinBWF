


        

var mapMgr = function (){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    
    // private
    var blocks = [];
    // state : 0 -> 완전체
    // state : 1 -> 위쪽 1칸 , .... state : 3 -> 위쪽 3칸, state : 4 -> 없어짐..
    // state : 5 -> 오른쪽 1칸, ... state : 7 -> 오른쪽 4칸, state : 8 -> 없어짐..
    // state : 9 -> 
    blocks['dummy'] = { state: 1,  color: "yellow"};
    
    stageList = [];
    stageList['stage1'] = new Array(10*10); // 14// 14
    stageList['stage2'] = new Array(10*10); // 14// 14
    stageList['stage3'] = new Array(10*10); // 14// 14
    stageList['hidden'] = new Array(10*10); // 14// 14
    
    var curStage = stageList['stage1'];

    function renderer(){
        
        drawLineAll(ctx); // 개발용 
        
        curStage.forEach(function(block, idx){

            ctx.fillStyle = block.type.color;
            ctx.fillRect(block.col*CONFIG.SPRITESIZE,block.row*CONFIG.SPRITESIZE,CONFIG.SPRITESIZE,CONFIG.SPRITESIZE);
        }); // forEach
        //
        

        
    } //renderer
    function generator(){} //generator
    
    
    function setBlocks(map, row, col, block ){
        map[row*10+col] = Object.create(null);
        map[row*10+col].type = blocks['dummy'];
        map[row*10+col].col = col;
        map[row*10+col].row = row;
    }
    
  return {
    renderer :  renderer,
    generator : generator,
    setBlocks : function(stname, row, col, blockname){
        var _stage = stageList[stname];
         setBlocks( _stage, row, col, blockname );
    },
    changeStage : function(nextName){
        curStage = stageList[nextName];
    },
    getStages: function() {
        return curStage;
    }
  }  // return
}(); // mapMgr 


//  개발용 함수 
function drawLineAll(ctx){
    var col, row;
        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.setLineDash( [2,2] );
        ctx.lineWidht = 0.5;
        for( row = 0; row < 10 ; ++row ){
            ctx.moveTo(0,row*CONFIG.SPRITESIZE);
            ctx.lineTo(14*CONFIG.SPRITESIZE,row*CONFIG.SPRITESIZE);
        }// row
        
        for(col =0; col < 10; ++col ){
            ctx.moveTo(col*CONFIG.SPRITESIZE,0);
            ctx.lineTo(col*CONFIG.SPRITESIZE,14*CONFIG.SPRITESIZE);
        }// col
        
        ctx.stroke();
}