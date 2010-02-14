function dclkToObject(id) {
		if(document.layers){
			return (document.layers[id])?eval(parseJS(document.layers[id])):null;
		}
		else if(document.all && !document.getElementById){
			return (eval(parseJS("window."+id)))?eval(parseJS("window."+id)):null;
		}
		else if(document.getElementById && document.body.style) {
			return (document.getElementById(id))?eval(parseJS(document.getElementById(id))):null;
		}
	}
  
function dclkFlashWrite(string){
  document.write(string,"gl");
  }

function dclkFlashInnerHTML(htmlElementId,code){
  var x=dclkToObject(htmlElementId);
  if(x){
    if(document.getElementById||document.all){
      x.innerHTML=parseHTML('');
      x.innerHTML=parseHTML(code);
      }
    else if(document.layers){
      x.document.open(,"gl");
      x.document.write(code,"gl");
      x.document.close();
      }
    }
  }
