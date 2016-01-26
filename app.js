var http = require('http');
var url = require('url');
var wechat = require('./wechat/wechat');
var usrMsgHandler = require('./usrMsgHandler');

//var express = require('express');

var g = require('./globalTest');
var net = require('net');
var HOST = 'localhost';
//var HOST = '121.42.182.224';
var PORT = 6969;

//var expressServ=express.createServer();

var server = net.createServer();
server.listen(PORT, HOST);
console.log('Server listening on ' +HOST+ ':' + PORT);

//var gSock;

server.on('connection', function(sock) {
	var firstConnect = 0;
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);	//print MCU Address
	
	global.sock = sock;

	global.sock.on('data', function(data) {
    	console.log('DATA ' + global.sock.remoteAddress + ': ' + data);  //print data from MCU
	
		global.fromMCU = data;

		//console.log("global.fromMCU: " + global.fromMCU);
		
		/*if(firstConnect == 0)
		{
			firstConnect = 1;
		}
		else
		{
			msgResponser.responseText(global.res, global.msg, "usr 文本：" + data);//暂时未对数据进行处理
		}
		console.log(firstConnect);*/
    });

});


/*net.createServer(function(sock) {

    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);


    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);

	if(global.DataTest != '')
	{
		sock.write(global.DataTest);
		global.DataTest = '';
	}

    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);*/

http.createServer(function (req, res)
{	
	var path = url.parse(req.url).pathname;
	
	if (path.indexOf('/wechat') == 0)
	{
		console.log("wechat");
		wechat.process(req, res, usrMsgHandler);
		return;
	}
	else
	{
		console.log("else");
	}

}).listen(process.env.PORT || 80, null);

