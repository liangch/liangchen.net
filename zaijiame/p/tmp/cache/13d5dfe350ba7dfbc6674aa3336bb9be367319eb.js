var objnum= $(".col1 .post");
var num= objnum.length;

function closeAb(n){
	$(objnum[n]).children(".replace").remove();
	$(objnum[n]).children(".cap").html('<span class="show" title="展开" onclick="loadAb(&quot;'+n+'&quot;);">展开</span>');
}
var ajaxCache=new Object;
function loadAb(n){
	var id = objnum[n].id.split("_");
	var toLoadUrl=urlh+"?p="+id[1];
	$('<div class="replace"><div style="padding-top:1em; font-size:1.2em; line-height:1.6em">正在读入文章内容，请稍等！</div></div>').insertBefore($(objnum[n]).children(".metadata"));
	if(ajaxCache[toLoadUrl]==null){
		$(objnum[n]).children(".replace").load(toLoadUrl+" .post .entry",function(){
			ajaxCache[toLoadUrl]=$(objnum[n]).children(".replace").html();
		});
	}else{
		$(objnum[n]).children(".replace").html(ajaxCache[toLoadUrl]);
	}
	$(objnum[n]).children(".cap").html('<span title="收缩" class="hide" onclick="closeAb(&quot;'+n+'&quot;);">收缩</span>');
}

$(document).ready(function(){
//设置展开按钮
	for(a=0;a<num;a++){
		$('<div class="cap"><span class="show" title="展开" onclick="loadAb(&quot;'+a+'&quot;);">展开</span></div>').insertBefore($(objnum[a]).children(".metadata"));
		//$('<div class="cap"><span class="show" title="展开" onclick="loadAb(&quot;'+objnum[a].id+'&quot;);">展开</span></div>').insertBefore("#"+objnum[a].id+" .metadata");
	}

//展开文章	
	if (nowpage==1){
		var tal=3;
		if (num<tal){tal=num;}
		//for(i=0;i<tal;i++){
		//	loadAb(i);
		//}
		loadAb(0);
	}
//个性设置
	var setwebbt=$("#setwebbt");
	var setwebbtc=$("#setwebbt span");
	$(setwebbt).css("display","inline");
	$(setwebbtc).css("cursor","pointer");
	
	$(setwebbtc).toggle(
		  function () {
			$(".header .exp").append($('<div class="setwebpar"></div>'));
			$(".header .exp .setwebpar").html("<div class='setweb'><div class='arrow'></div><div class='form'>设置表单载入中，请稍等……</div></div>");
			$(".header .exp .setwebpar").load(urlh+"/wp-content/themes/163ued/webedit.html .setweb");
			$(setwebbtc).html("关闭设置");
		  },
		  function () {
			$(".header .exp .setwebpar").slideUp('',function(){$(".header .exp .setwebpar").remove();});
			$(setwebbtc).html("页面设置");
		  }
	);
	$("div:has(img)").attr("target","_blank");
});
