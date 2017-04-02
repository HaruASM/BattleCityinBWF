const   http = require('http'),
        url = require('url'),
        path = require('path'),
        fs = require('fs');

//var pageIndex = fs.readFileSync('./public/index.html');
var favi = fs.readFileSync(path.join(__dirname,'/public/images' ,'favicon.png'))

var router = Object.create(null);
    router['/'] = 'index.html';
    router['/favicon.ico'] = function(res){
      res.writeHead(200,{'Content-Type':'image/x-icon'});
      res.end();
    };

// ## 멥 데이타 저장 반환 
// 1 : save 멥 데이타 front -> back   
//  {code:1 , stage: }
// 2 : load 멥데이타  back -> front
//  {code:2, []};  

// # blocks 데이터 테이블
// block.type = block; // string 으로 저장
// block.col = col | 0;
// block.row = row | 0;
// block.state = 0 | 0; // 상태 state

var streamHandler = Object.create(null);
streamHandler[1] = ( objs , callback)=>{
    // save to local
    console.log( objs.data);
    
    // ## 멥데이터 저장
    // ## 17. 04. 01 JSON으로 쓰기 -> 이후 binary로 write 되도록  예정
    fs.writeFile(`./public/maps/${objs.name}.txt`, JSON.stringify( objs.data), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`write :: ./public/maps/${objs.name}.txt`);
        callback(objs.name + " saved", "");
    }); 
}; // streamHandler

streamHandler[2] = (objs, callback)=>{
    // load from local
    
    
    fs.readFile(`./public/maps/${objs.name}.txt`,'utf8',(err, file)=>{
        console.log('read');
             if(err) throw err;
        callback(objs.name + " loaded", file);
    }); 
    return ;

};

    
var handler = (req, res )=> {
    
    if( req.method == 'POST') {
        var post_data = ''; 
        req.on('data', (str)=>{
            post_data += str;
        });
        req.on('end', ()=>{
            
            var pars = JSON.parse(post_data );
            streamHandler[pars.code](pars.datas, (message, resData )=>{
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(JSON.stringify({code:3, msg:message, data: resData }));
                res.end();
            });

            console.log( `reqPost:: -code: ${pars.code} -length: ${post_data.length}`)
            return ;
        });

        return ;
    }
    
    
    var uri = url.parse( req.url).pathname;
    if( router[uri]  ){ // URL 
        if( typeof router[uri] === 'function' )
            router[uri](res);  // specialize 함수 실행
        else { // html파일 serve
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200, {'Content-Type':'text/html'});
        
            fs.readFile(`./public/${router[uri]}`,(err, file)=>{
             if(err) throw err;
               res.write(file);
               res.end();
            }); 
            return ;
        }
            
    } // if (router)

    console.log(uri);
    
    serveFile(uri , res);

} //handler


function serveFile(filename, res){
    filename = `./public${filename}`;
    if( !fs.existsSync(filename)) {
        
        res.writeHead(404, {'Content-Type': 'text/html'});
        //res.write("404 파일 없음\n");
        res.end("404 파일 없음");
        return;
    }; // path.exists    
    
    fs.readFile( filename ,'binary',(err, file)=>{
        if(err){
            res.end(err);
            return ;
        }
        res.writeHead(200);
        res.write(file, 'binary');
        res.end();
    }); // readfile

} // serveFile


const server = http.createServer(handler);
server.listen(process.env.PORT , ()=>{
     console.log(`run server ${process.env.PORT}`);
 } );
 
 