


        

var mapMgr = function (){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    
    // private
    var blocks = [];
    // state : 0 -> 완전체
    // state : 1 -> 위쪽 1칸 , .... state : 3 -> 위쪽 3칸, state : 4 -> 없어짐..
    // state : 5 -> 오른쪽 1칸, ... state : 7 -> 오른쪽 4칸, state : 8 -> 없어짐..
    // state : 9 -> 
    blocks['dummy'] = { state: 1,  color: "yellow"}; // 
    blocks['selected'] = { state: 1,  color: "red"}; //
    blocks['dummy2'] = { state: 1,  color: "blue"}; //
    
    stageList = [];
    stageList['stage1'] = new Array(10*10); // 14// 14
    stageList['stage2'] = new Array(10*10); // 14// 14
    stageList['stage3'] = new Array(10*10); // 14// 14
    stageList['hidden'] = new Array(10*10); // 14// 14
    
    var curStage = stageList['stage1'];

    function renderer(){
        
        drawLineAll(ctx); // 개발용 
        
        curStage.forEach(function(block, idx){
            
            if( block ){
            
                ctx.fillStyle = blocks[block.type].color;
                ctx.fillRect(block.col*CONFIG.SPRITESIZE,block.row*CONFIG.SPRITESIZE,CONFIG.SPRITESIZE,CONFIG.SPRITESIZE);
            }
        }); // forEach

    } //renderer
    function generator(){} //generator
    
    
    function releaseBlocks(map, row, col, block ){ // block에 값이 있으면 change 
        
        if( block ){
             map[row*10+col].type = block; // change를 함수로 만들지 않고 인라인 처리 
        }
        else 
            map[row*10+col] = null; // Object.create(null);
        
    }
    
   
    function setBlocks(map, row, col, block ){
        if(!map[row*10+col])
            map[row*10+col] = Object.create(null)
        var tmp = map[row*10+col] ;
        tmp.type = block; // string 으로 저장
        tmp.col = col | 0;
        tmp.row = row | 0;
        tmp.state = 0 | 0; // 상태 state
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
    },

    // 편집된 멥데이터를 서버로 송신
    devSaveStage : function(){ // 개발용
          
        return 0;
    },
    
    // devLoadStage: function( arrData ){ // 객체지향 원칙 위반 
    //     curStage = arrData;
    // },
    devSynStage : function(stageName){
        // cur stage 기준
        db.loadMapData(2, stageName, function(mapData){
            
            console.log( mapData );
            
            stageList[stageName] =  JSON.parse(mapData);
            curStage = stageList[stageName];
        }); 
        
    }
    ,
    devReleaseBlocks : function(stname, row, col, blockname){
        // curStage에서만 작업
        var _stage = stageList[stname];
        releaseBlocks(_stage, row, col, blockname);
        
        
        
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