// ## procecure 입니다
// ## 작성자 최세준
// ## 07 03 24

var Procedure = function (doc ){
    var doc = doc;

    //객체이동
    // 랜더
    //충돌 확인
    
    var fps = 1,
        interval = 1000/ fps,
        frame = -1,
        nowTime=Date.now(),
        thenTime = 0,
        startTime = nowTime,
        elapseTime = 0;
        
    function check( draw ){
        
        requestAnimationFrame(draw);
        
        thenTime = nowTime;
        nowTime = Date.now();
        elapseTime = nowTime - thenTime;
        
        if( elapseTime > interval ){
            draw();
        }else { // interval - elpasetime
            
            setInterval( check , interval-elapseTime );
            
        }
        

    }
    
    return function (seqList, renderer )  {
        
        for( var i = 0; i > seqList.length ; ++i)
            seqList[i]();
        
        check(renderer);
            
        

    }
}(document)// Procedure
