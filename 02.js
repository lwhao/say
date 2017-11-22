const http =require('http');
const server = http.createServer();
server.on('request',(req,res)=>{
	console.log('header是:'+req.headers);
	console.log('url是:'+req.url);
	res.write('1');
	res.end('2');
})
server.listen(9999,()=>{
	console.log('已成功开启服务器')
})
