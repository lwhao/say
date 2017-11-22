const net = require('net');
const fs = require('fs');
const server = net.createServer((clientSocket)=>{
	fs.readFile('待着/index.html',(err,data)=>{
		if(err){
			console.log(err);
			return;
		}
		clientSocket.write(`HTTP/1.1 200 OK\r\nContent-Type:text/html;charset=utf-8\r\nContent-Length:${data.toString().length}\r\n\r\n${data.toString()}`)
	})
})
server.listen(8888,()=>{
	console.log('已成功开启服务器')
})
