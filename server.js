const   http = require('http'),
        url = require('url'),
        path = require('path'),
        fs = require('fs');

//var pageIndex = fs.readFileSync('./public/index.html');

var router = [];
    router['/'] = 'index.html';

var handler = (req, res )=> {
    var uri = url.parse( req.url).pathname;
    if( router[uri]  ){ // URL 
        
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200, {'Content-Type':'text/html'});
        
        fs.readFile(`./public/${router[uri]}`,(err, file)=>{
             if(err) throw err;
            res.write(file);
            res.end();
        }); 
        return ;
    } // if (router)

    console.log(uri);
    
    serveFile(uri , res);

} //handler


function serveFile(filename, res){
    filename = `./public${filename}`;
    if( !fs.existsSync(filename)) {
        console.log(1);
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write("404 파일 없음\n");
        res.end();
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
 
 