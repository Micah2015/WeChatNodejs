var JSON = require('JSON');
var base64Code = require('./base64Code/base64Code');

var g1 = require('./globalTest');

//Text
exports.handleText = function (res, msg)
{
	var keyword = msg.Content;
	
	switch(keyword)
	{
		case '0':
		{
			msgResponser.responseText(res, msg, "usr 文本：暂停！");
			global.sock.write(keyword);
		}break;
 
		case '1':
		{
			msgResponser.responseText(res, msg, "usr 文本：点亮白灯！");
			global.sock.write(keyword);
		}break;

	    case '2':
		{
			msgResponser.responseText(res, msg, "usr 文本：点亮红灯！");
			global.sock.write(keyword);
		}break;
 		 
		case '3':
		{
			msgResponser.responseText(res, msg, "usr 文本：点亮绿灯！");
			global.sock.write(keyword);
		}break;
 
		case '4':
		{
			msgResponser.responseText(res, msg, "usr 文本：点亮蓝灯！");
			global.sock.write(keyword);
		}break;

	    case '5':
		{
			msgResponser.responseText(res, msg, "usr 文本：点亮黃灯！");
			global.sock.write(keyword);
		}break;
 		 
		case '6':
		{
			msgResponser.responseText(res, msg, "usr 文本：点亮青灯！");
			global.sock.write(keyword);
		}break;

		case '7':
		{
			msgResponser.responseText(res, msg, "usr 文本：关灯！");
			global.sock.write(keyword);
		}break;
 
 		case '8':	//查询下位机Led灯的颜色
		{
			//msgResponser.responseText(res, msg, "下位机当前状态：暂停！"); 	
			switch(global.fromMCU)
			{
				case '0': msgResponser.responseText(res, msg, "下位机当前状态：暂停！"); break;
				case '1': msgResponser.responseText(res, msg, "下位机当前状态：白灯！"); break; 
				case '2': msgResponser.responseText(res, msg, "下位机当前状态：红灯！"); break; 
				case '3': msgResponser.responseText(res, msg, "下位机当前状态：绿灯！"); break; 
				case '4': msgResponser.responseText(res, msg, "下位机当前状态：蓝灯！"); break; 
				case '5': msgResponser.responseText(res, msg, "下位机当前状态：黃灯！"); break; 
				case '6': msgResponser.responseText(res, msg, "下位机当前状态：青灯！"); break; 
				case '7': msgResponser.responseText(res, msg, "下位机当前状态：已关灯！"); break; 	

				case 0xff: msgResponser.responseText(res, msg, "下位机当前状态：接收有误！"); break; 
					
				default: ;	
			}
		}break; 		 
		default: ;
	}
//	console.log("global.fromMCU: " + global.fromMCU);
	

//	if(keyword > '7')
//	{
//		msgResponser.responseText(res,msg,"From MCU：" + global.fromMCU );	
//		global.fromMCU = '0';
//	}
};

//Image
exports.handleImage = function (res, msg)
{
	var PicUrl = msg.PicUrl;
	var MediaId = msg.MediaId;

	console.log("MediaId:"+MediaId);

	var articles = [];
	articles[0] = 
	{
	    Title : "usr图片",
	    Description : "图片链接",
	    PicUrl : PicUrl,
	    Url : PicUrl
	};

	msgResponser.responseNews(res, msg, articles);
};

//Voice
exports.handleVoice = function (res, msg)
{
	var MediaId = msg.MediaId;
	var Format = msg.Format;
	var Recognition = msg.Recognition;
	
	console.log("MediaId:"+MediaId);

	if(!Recognition)//null
	{
		msgResponser.responseVoice(res, msg, MediaId);
	}
	else
	{
		msgResponser.responseText(res, msg, "usr 语音识别：" + Recognition );
		switch(Recognition)
		{
			case "白灯！":
			{
				global.DataTest = '1';
			}break;
			case "红灯！":
			{
				global.DataTest = '2';
			}break;
			case "绿灯！":
			{
				global.DataTest = '3';
			}break;
			case "蓝灯！":
			{
				global.DataTest = '4';
			}break;
			case "黄灯！":
			{
				global.DataTest = '5';
			}break;
			case "青灯！":
			{
				global.DataTest = '6';
			}break;
			case "关灯！":
			{
				global.DataTest = '7';
			}break;
			default: ;
		}
	}
};

//Video
exports.handleVideo = function (res, msg)
{
	var MediaId = msg.MediaId;
	var ThumbMediaId = msg.ThumbMediaId;
	
	msgResponser.responseImage(res, msg, ThumbMediaId);
};

//location
exports.handleLocation = function (res, msg)
{
	var Latitude = msg.Location_X;
	var Longitude = msg.Location_Y;
	var Scale = msg.Scale;
	var Label = msg.Label;

	var convertUrl = "http://api.map.baidu.com/ag/coord/convert?x="+Longitude+"&y="+Latitude+"&from=2&to=4&mode=0";
	http.get(convertUrl, function(response)
	{
		var json = '';
		response.setEncoding('utf8');
		response.on('data', function (chunk)
		{
			json += chunk;
		});
		
		response.on('end', function ()
		{
			var data=JSON.parse(json);
			var xCode=data.x;
			var yCode=data.y;
			Longitude=base64Code.base64decode(xCode.toString());
			Latitude=base64Code.base64decode(yCode.toString());
			
			var renderUrl = "http://api.map.baidu.com/telematics/v3/reverseGeocoding?&location="+Longitude+","+Latitude+"&coord_type=bd09ll&output=json&ak=KmVaLtYGzplEZOk0Wvy3ZXHK";
			http.get(renderUrl, function(response1)
			{
				var json1 = '';
				response1.setEncoding('utf8');
				response1.on('data', function (chunk1)
				{
					json1 += chunk1;
				});
				
				response1.on('end', function ()
				{
					var data1=JSON.parse(json1);
					var description=data1.description;
					
					var mapPic = "http://api.map.baidu.com/staticimage?center="+Longitude+","+Latitude+"&width=360&height=640&zoom=16&scale=2&markers="+Longitude+","+Latitude+"&markerStyles=l,";
					var mapUrl = "http://api.map.baidu.com/marker?location="+Latitude+","+Longitude+"&title=手动上报位置&output=html&src=汉擎定位";
					
					var articles = [];
					articles[0] = 
					{
					    Title : "手动上报地理位置",
					    Description : description.toString(),
					    PicUrl : mapPic,
					    Url : mapUrl
					};
				
					msgResponser.responseNews(res, msg, articles);
				});
			});

		});
	});
};

//event
exports.handleEvent_Subscribe = function (res, msg)
{
	msgResponser.responseText(res, msg, "欢迎订阅汉擎服务!");
};
exports.handleEvent_Scan = function (res, msg)
{
	var EventKey = msg.EventKey;
	msgResponser.responseText(res, msg, "扫描二维码："+EventKey);
};
exports.handleEvent_Location = function (res, msg)
{
	var Latitude = msg.Latitude;
	var Longitude = msg.Longitude;
	var Precision = msg.Precision;

	var convertUrl = "http://api.map.baidu.com/ag/coord/convert?x="+Longitude+"&y="+Latitude+"&from=0&to=4&mode=0";

	http.get(convertUrl, function(response)
	{
		var json = '';
		response.setEncoding('utf8');
		response.on('data', function (chunk)
		{
			json += chunk;
		});
		
		response.on('end', function ()
		{
			var data=JSON.parse(json);
			var xCode=data.x;
			var yCode=data.y;
			Longitude=base64Code.base64decode(xCode.toString());
			Latitude=base64Code.base64decode(yCode.toString());
			
			var renderUrl = "http://api.map.baidu.com/telematics/v3/reverseGeocoding?&location="+Longitude+","+Latitude+"&coord_type=bd09ll&output=json&ak=KmVaLtYGzplEZOk0Wvy3ZXHK";
			http.get(renderUrl, function(response1)
			{
				var json1 = '';
				response1.setEncoding('utf8');
				response1.on('data', function (chunk1)
				{
					json1 += chunk1;
				});
				
				response1.on('end', function ()
				{
					var data1=JSON.parse(json1);
					var description=data1.description;
					
					var mapPic = "http://api.map.baidu.com/staticimage?center="+Longitude+","+Latitude+"&width=360&height=640&zoom=16&scale=2&markers="+Longitude+","+Latitude+"&markerStyles=l,";
					var mapUrl = "http://api.map.baidu.com/marker?location="+Latitude+","+Longitude+"&title=自动上报位置&output=html&src=汉擎定位";
					
					var articles = [];
					articles[0] = 
					{
					    Title : "自动上报地理位置",
					    Description : description.toString(),
					    PicUrl : mapPic,
					    Url : mapUrl
					};
				
					msgResponser.responseNews(res, msg, articles);
				});
			});

		});
	});
};
exports.handleEvent_Menu = function (res, msg)
{
	var EventKey = msg.EventKey;
	
	if(EventKey=="Event_Upload_Begin")
	{
		msgResponser.responseText(res, msg, "usr Event_Upload_Begin" );
	}
	else if(EventKey=="Event_Upload_Process")
	{
		msgResponser.responseText(res, msg, "usr Event_Upload_Process" );
	}
	else if(EventKey=="Event_Upload_End")
	{
		msgResponser.responseText(res, msg, "usr Event_Upload_End" );
	}
	else if(EventKey=="Event_Sort_Project")
	{
		msgResponser.responseText(res, msg, "usr Event_Sort_Project" );
	}
	else if(EventKey=="Event_Sort_Time")
	{
		msgResponser.responseText(res, msg, "usr Event_Sort_Time" );
	}
	else if(EventKey=="Event_Sort_Name")
	{
		msgResponser.responseText(res, msg, "usr Event_Sort_Name" );
	}
	else
	{
		msgResponser.responseText(res, msg, "usr 按键：这是个什么按键..." );
	}

};

