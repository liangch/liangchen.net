//Pop-it menu
var menuOffX=0    //菜单距连接文字最左端距离
var menuOffY=18    //菜单距连接文字顶端距离

var fo_shadows=new Array()
var linkset=new Array()

////No need to edit beyond here

var ie4=document.all&&navigator.userAgent.indexOf("Opera")==-1
var ns6=document.getElementById&&!document.all
var ns4=document.layers

function showmenu(e,vmenu,mod){
    if (!document.all&&!document.getElementById&&!document.layers)
        return
    which=vmenu
    clearhidemenu()
    ie_clearshadow()
    menuobj=ie4? document.all.popmenu : ns6? document.getElementById("popmenu") : ns4? document.popmenu : ""
    menuobj.thestyle=(ie4||ns6)? menuobj.style : menuobj
    
    if (ie4||ns6)
        menuobj.innerHTML=parseHTML(which)
    else{
        menuobj.document.write('<layer name=gui bgColor=#E6E6E6 width=165 onmouseover="clearhidemenu()" onmouseout="hidemenu()">'+which+'</layer>',"gl")
        menuobj.document.close()
    }
    menuobj.contentwidth=(ie4||ns6)? menuobj.offsetWidth : menuobj.document.gui.document.width
    menuobj.contentheight=(ie4||ns6)? menuobj.offsetHeight : menuobj.document.gui.document.height
    
    eventX=ie4? event.clientX : ns6? e.clientX : e.x
    eventY=ie4? event.clientY : ns6? e.clientY : e.y
    
    var rightedge=ie4? document.body.clientWidth-eventX : window.innerWidth-eventX
    var bottomedge=ie4? document.body.clientHeight-eventY : window.innerHeight-eventY
        if (rightedge<menuobj.contentwidth)
            menuobj.thestyle.left=ie4? document.body.scrollLeft+eventX-menuobj.contentwidth+menuOffX : ns6? window.pageXOffset+eventX-menuobj.contentwidth : eventX-menuobj.contentwidth
        else
            menuobj.thestyle.left=ie4? ie_x(event.srcElement)+menuOffX : ns6? window.pageXOffset+eventX : eventX
        
        if (bottomedge<menuobj.contentheight&&mod!=0)
            menuobj.thestyle.top=ie4? document.body.scrollTop+eventY-menuobj.contentheight-event.offsetY+menuOffY-23 : ns6? window.pageYOffset+eventY-menuobj.contentheight-10 : eventY-menuobj.contentheight
        else
            menuobj.thestyle.top=ie4? ie_y(event.srcElement)+menuOffY : ns6? window.pageYOffset+eventY+10 : eventY
    menuobj.thestyle.visibility="visible"
    ie_dropshadow(menuobj,"#999999",3)
    return false
}

function ie_y(e){  
    var t=e.offsetTop;  
    while(e=e.offsetParent){  
        t+=e.offsetTop;  
    }  
    return t;  
}  
function ie_x(e){  
    var l=e.offsetLeft;  
    while(e=e.offsetParent){  
        l+=e.offsetLeft;  
    }  
    return l;  
}  
function ie_dropshadow(el, color, size)
{
    var i;
    for (i=size; i>0; i--)
    {
        var rect = document.createElement('div');
        var rs = rect.style
        rs.position = 'absolute';
        rs.left = (el.style.posLeft + i) + 'px';
        rs.top = (el.style.posTop + i) + 'px';
        rs.width = el.offsetWidth + 'px';
        rs.height = el.offsetHeight + 'px';
        rs.zIndex = el.style.zIndex - i;
        rs.backgroundColor = color;
        var opacity = 1 - i / (i + 1);
        rs.filter = 'alpha(opacity=' + (100 * opacity) + ')';
        //el.insertAdjacentElement('afterEnd', rect);
        fo_shadows[fo_shadows.length] = rect;
    }
}
function ie_clearshadow()
{
    for(var i=0;i<fo_shadows.length;i++)
    {
        if (fo_shadows[i])
            fo_shadows[i].style.display="none"
    }
// document.getElementById('newemailsound').innerHTML=parseHTML('');
    fo_shadows=new Array();
}


function contains_ns6(a, b) {
    while (b.parentNode)
        if ((b = b.parentNode) == a)
            return true;
    return false;
}

function hidemenu(){
    if (window.menuobj)
        menuobj.thestyle.visibility=(ie4||ns6)? "hidden" : "hide"
    ie_clearshadow()
}

function dynamichide(e){
    if (ie4&&!menuobj.contains(e.toElement))
        hidemenu()
    else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
        hidemenu()
}

function delayhidemenu(){
    if (ie4||ns6||ns4)
        delayhide=setTimeout("hidemenu()",1000);
}

function clearhidemenu(){
    if (window.delayhide)
        clearTimeout(delayhide)
}

function highlightmenu(e,state){
    if (document.all)
        source_el=event.srcElement
    else if (document.getElementById)
        source_el=e.target
    if (source_el.className=="menuitems"){
        source_el.id=(state=="on")? "mouseoverstyle" : ""
    }
    else{
        while(source_el.id!="popmenu"){
            source_el=document.getElementById? source_el.parentNode : source_el.parentElement
            if (source_el.className=="menuitems"){
                source_el.id=(state=="on")? "mouseoverstyle" : ""
            }
        }
    }
}

if (ie4||ns6)
document.onclick=hidemenu
function doSClick() {
    var targetId, srcElement, targetElement, imageId, imageElement;
    srcElement = window.event.srcElement;
    targetId = srcElement.id + "content";
    targetElement = document.all(targetId);
    imageId = srcElement.id;
    imageId = imageId.charAt(0);
    imageElement = document.all(imageId);
    if (targetElement.style.display == "none") {
        imageElement.src = parseURL("Skins/Default/minus.gif")
        targetElement.style.display = "";
    } else {
        imageElement.src = parseURL("Skins/Default/plus.gif")
        targetElement.style.display = "none";
    }
}
function doClick() {
    var targetId, srcElement, targetElement;
    srcElement = window.event.srcElement;
    targetId = srcElement.id + "_content";
    targetElement = document.all(targetId);
    if (targetElement.style.display == "none") {
        srcElement.src = parseURL("Skins/Default/minus.gif")
        targetElement.style.display = "";
    } else {
        srcElement.src = parseURL("Skins/Default/plus.gif")
        targetElement.style.display = "none";
    }
}


function imgload(e){
//var oImg = document.images;
//var oClientSreen=screen.width-333;
//var oClientSreen=600;
//    for(var i=0;i<oImg.length;i++) {
//        if(oImg[i].height>500 && oImg[i].width<oClientSreen)
//        {oImg[i].style.height=300;}
//        if(oImg[i].width>oClientSreen){oImg[i].style.width=oClientSreen-200;}
//    }
}
//HTML过滤函数
function HTMLEncode(text)
{
    text = text.replace(/&/g, "&amp;") ;
    text = text.replace(/"/g, "&quot;") ;
    text = text.replace(/</g, "&lt;") ;
    text = text.replace(/>/g, "&gt;") ;
    text = text.replace(/'/g, "&#146;") ;

    return text ;
}

//悄悄话提示使用(asilas添加)
function pause(millisecondi)
{
    var now = new Date();
    var exitTime = now.getTime() + millisecondi;

    while(true)
    {
        now = new Date();
        if(now.getTime() > exitTime) return;
    }
}

var divTop,divLeft,divWidth,divHeight,docHeight,docWidth,objTimer,i = 0;
function getMsg()
{
//    pause(1000);
    i=0
    try{
    divTop = parseInt(document.getElementById("eMeng").style.top,10)
    divLeft = parseInt(document.getElementById("eMeng").style.left,10)
    divHeight = parseInt(document.getElementById("eMeng").offsetHeight,10)
    divWidth = parseInt(document.getElementById("eMeng").offsetWidth,10)
    docWidth = document.body.clientWidth-300;
    docHeight = document.body.clientHeight;
    document.getElementById("eMeng").style.top = parseInt(document.body.scrollTop,10) + docHeight + 10;//  divHeight
    document.getElementById("eMeng").style.left = parseInt(document.body.scrollLeft,10) + docWidth/2 - divWidth/2 // - divWidth
    document.getElementById("eMeng").style.visibility="visible"
    objTimer = window.setInterval("moveDiv()",10)
    }
    catch(e){}
}

function resizeDiv()
{
    i+=1
    if(i>3000) closeDiv()
    try{
    divHeight = parseInt(document.getElementById("eMeng").offsetHeight,10)
    divWidth = parseInt(document.getElementById("eMeng").offsetWidth,10)
    docWidth = document.body.clientWidth - 300;
    docHeight = document.body.clientHeight;
    document.getElementById("eMeng").style.top = docHeight - divHeight + parseInt(document.body.scrollTop,10);
    document.getElementById("eMeng").style.left = parseInt(document.body.scrollLeft,10) + docWidth/2 - divWidth/2; // docWidth - divWidth + parseInt(document.body.scrollLeft,10)
    }
    catch(e){}
}

function moveDiv()
{
    try
    {
    if(parseInt(document.getElementById("eMeng").style.top,10) <= (docHeight - divHeight + parseInt(document.body.scrollTop,10)))
    {
    window.clearInterval(objTimer)
    objTimer = window.setInterval("resizeDiv()",1)

    divWidth = parseInt(document.getElementById("eMeng").offsetWidth,10)
    docWidth = document.body.clientWidth - 300;
    document.getElementById("eMeng").style.left = parseInt(document.body.scrollLeft,10) + docWidth/2 - divWidth/2; // docWidth - divWidth + parseInt(document.body.scrollLeft,10)
    }
    divTop = parseInt(document.getElementById("eMeng").style.top,10)
    document.getElementById("eMeng").style.top = divTop - 1
    }
    catch(e){}
}
function closeDiv()
{
    document.getElementById('eMeng').style.visibility='hidden';
    if(objTimer) window.clearInterval(objTimer)
}
