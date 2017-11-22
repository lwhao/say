const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const server = http.createServer();
server.on('request',(req,res)=>{
    let pathStr = url.parse(req.url).pathname;
    if(pathStr=="/index"){
        fs.readFile('./index.html',(err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            res.end(data)
        })
    }
    else{
        let filePath = path.join(__dirname,'static',pathStr);
        fs.readFile(filePath,(err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            if(path.extname(filePath)=='js'){
                res.setHeader('Content-Type','application/x-javascript')
            }else if(path.extname(filePath)=='css'){
                res.setHeader('Content-Type','text/css')
            }else if(path.extname(filePath)=='mp3'){
                res.setHeader('Content-Type','audio/mpeg')
            }else if(path.extname(filePath)=='avi'){
                res.setHeader('Content-Type','video/x-msvideo')
            }else if(path.extname(filePath)=='jpg'){
                res.setHeader('Content-Type','image/jpeg')
            }
            res.end(data)
        })
    }

})


server.listen(9999,()=>{
    console.log('服务器开启成功!')
})