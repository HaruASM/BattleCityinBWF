//## 세준: 여기는 저만 만집니데이

var seqLoad = (function(){
  function load(tag){
      return function(url) {
          return new Promise( function(res, rej){
            var attr, parent;
            var elm = document.createElement(tag);
            elm.onload = function(){  res( url );            };// onload
            elm.onerror = function(){ rej( url );            };
            
            switch( tag ){
              case 'script': 
                elm.async = true;
                attr = 'src';
                parent = 'body';
                break;
              case 'link':
                elm.type = 'text/css';
                elm.rel = 'stylesheet';
                attr = 'href';
                parent = 'head';
                break;
              case 'img':
                attr = 'src';
                parent = 'body';
                elm.display = 'none';
                break;
            }// switch
            
            elm[attr] = url;
            document[parent].appendChild(elm);
          }); // return Promise
      }; // return ( url )
  } // load
  
  return {
    css: load('link'),
    js: load('script'),
    img: load('img')
  } // return {}
})(); //seqLoad


function init_system(lists){ // 동기적으로 순서대로
    Promise.all(lists)
        .then (function(e){console.log('load end');
        main();
        })
        .catch(function(e){console.log('load fail\n' + e.stack);});
}

window.onload = function(){
      
    var progress = 0 | 0;

    function checkProgress( size ){
        progress += size;
        console.log( progress+ ' / '+ loadList.length ); // 로딩 progressBar 구현부분
    }
    
    var loadList = [
        seqLoad.img('images/BattleCityResource.png'),
        seqLoad.js('js/config.js'),
        seqLoad.js('js/events.js'),
        seqLoad.js('js/imagesManage.js'),
        seqLoad.js('js/objManage.js'),
        seqLoad.js('js/main.js')
    ];
    loadList.forEach(function(val,idx){val.then(function(){checkProgress(1);})});
    init_system(loadList);
    
}

