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

var handler = (req, res )=> {
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
 
 