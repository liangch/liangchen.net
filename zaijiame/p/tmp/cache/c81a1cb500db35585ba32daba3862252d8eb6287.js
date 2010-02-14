// JavaScript Document
function $(id){
	return document.getElementById(id);
}

function showhide(s, h){
	hide(h);
	show(s);
}
function show(show){
	$(show).style.display='block';
}

function hide(hide){
	$(hide).style.display='none';
}

function showhidei(s,h){
	hide(h);
	$(s).style.display='inline';
}


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function hidetorrent(torrentid) {
	createCookie('torrent'+torrentid,1,30);
	hide('torrent'+torrentid);
}

function getpage(url){
	var page_request = null;
	if (window.XMLHttpRequest) // if Mozilla, Safari etc
		page_request = new XMLHttpRequest()
	else if (window.ActiveXObject){ // if IE
		try {
			page_request = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e){
			try{
				page_request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){}
		}
	}
	else
		return false;
	page_request.open('GET', url, false,"gl");
	page_request.send(null);
	if(page_request.readyState == 4 && page_request.status==200){
		return page_request.responseText;
	}else{
		return 0;
	}
}

function findPos(obj)
{
	var curleft = 0;
	var curtop = 0;
	if(obj.offsetParent){
		while(1) 
		{
		  curleft += obj.offsetLeft;
		  curtop += obj.offsetTop;
		  if(!obj.offsetParent)
			break;
		  obj = obj.offsetParent;
		}
	}else if(obj.x){
		curleft += obj.x;
		curtop += obj.y;
	}
	return {x:curleft, y:curtop};
}

function popUp(text,element,x,y,timeout){
	if(!x) { x = 20; y = -20;}
	if(!timeout){ timeout = 2500; }
	newpopup = document.createElement('div');
	newpopup.innerHTML = parseHTML(text);
	newpopup.className = 'popup';
	parentlocation = parseURL(findPos(element));
	newpopup.style.top = parentlocation.y+(y?y:0)+'px';
	newpopup.style.left = parentlocation.x+(x?x:0)+'px';
	newpopup.id = Math.random();
	document.body.appendChild(newpopup);
	setTimeout('$('+newpopup.id+').parentNode.removeChild($('+newpopup.id+'))',timeout);
}

/*e.g. jx.load('demo.php?dummy=text&lorem=ipsum',function(data){
	alert(data); // Do what you want with the 'data' variable.
},text/json,POST/GET);*/
jx={getHTTPObject:function(){var A=false;if(typeof ActiveXObject!="undefined"){try{A=new ActiveXObject("Msxml2.XMLHTTP")}catch(C){try{A=new ActiveXObject("Microsoft.XMLHTTP")}catch(B){A=false}}}else{if(window.XMLHttpRequest){try{A=new XMLHttpRequest()}catch(C){A=false}}}return A},load:function(url,callback,format,method){var http=this.init();if(!http||!url){return }if(!format){var format="text"};if(!method){var method='GET';}format=format.toLowerCase();var now="uid="+new Date().getTime();url+=(url.indexOf("?")+1)?"&":"?";url+=now;var parameters = null;if(method=="POST"){var parts = url.split("\?");url = parts.shift();parameters = parts.join('?');}http.open(method,url,true,"gl");if(method=="POST"){http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");http.setRequestHeader("Content-length", parameters.length);http.setRequestHeader("Connection", "close");}http.onreadystatechange=function(){if(http.readyState==4){if(http.status==200){var result="";if(http.responseText){result=http.responseText}if(format.charAt(0)=="j"){result=result.replace(/[\n\r]/g,"");result=eval(parseJS("("+result+")"))}if(callback){callback(result)}}else{alert(http.status)}}};http.send(parameters)},init:function(){return this.getHTTPObject()}}