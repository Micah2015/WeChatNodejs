var msgResponser = require('./msgResponser');

//Text
exports.handleText = function (res, msg)
{
	var keyword = msg.Content;
	
	msgResponser.responseText(res, msg, "文本：" + keyword );
};

//Image
exports.handleImage = function (res, msg)
{
	var PicUrl = msg.PicUrl;
	var MediaId = msg.MediaId;

	var articles = [];

	articles[0] = 
	{
	    Title : "图片",
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
	
	if(!Recognition)//null
	{
		msgResponser.responseVoice(res, msg, MediaId);
	}
	else
	{
		msgResponser.responseText(res, msg, "语音识别：" + Recognition );
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
	var Location_X = msg.Location_X;
	var Location_Y = msg.Location_Y;
	var Scale = msg.Scale;
	var Label = msg.Label;
	
	msgResponser.responseText(res, msg, "地理位置: "+Location_X+" "+Location_Y);
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
	
	msgResponser.responseText(res, msg, "用户位置: "+Latitude+" "+Longitude);
};
exports.handleEvent_Menu = function (res, msg)
{
	var EventKey = msg.EventKey;
	
	if(EventKey=="Event_Upload_Begin")
	{
		msgResponser.responseText(res, msg, "Event_Upload_Begin" );
	}
	else if(EventKey=="Event_Upload_Process")
	{
		msgResponser.responseText(res, msg, "Event_Upload_Process" );
	}
	else if(EventKey=="Event_Upload_End")
	{
		msgResponser.responseText(res, msg, "Event_Upload_End" );
	}
	else if(EventKey=="Event_Sort_Project")
	{
		msgResponser.responseText(res, msg, "Event_Sort_Project" );
	}
	else if(EventKey=="Event_Sort_Time")
	{
		msgResponser.responseText(res, msg, "Event_Sort_Time" );
	}
	else if(EventKey=="Event_Sort_Name")
	{
		msgResponser.responseText(res, msg, "Event_Sort_Name" );
	}
	else
	{
		msgResponser.responseText(res, msg, "按键：这是个什么按键..." );
	}

};

