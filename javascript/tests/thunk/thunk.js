// Get a HTTP Request Object
function GetHttpRequest()
{
	if ( window.XMLHttpRequest ) // Gecko
	return new XMLHttpRequest() ;
	else if ( window.ActiveXObject ) // IE
	return new ActiveXObject("MsXml2.XmlHttp") ;
}

// Perform the thunk
function Thunk(fname, mname)
{
	alert("Thunk " + fname + "     (" + mname + ")");
	var oXmlHttp = GetHttpRequest() ;
	oXmlHttp.onreadystatechange = function()
	{
		if ( oXmlHttp.readyState == 4 )
		{
			if ( oXmlHttp.status == 200 || oXmlHttp.status == 304 )
			{
				var oldClass = eval(fname);
				eval(oXmlHttp.responseText);
				var newClass = eval(fname);
				
				// We need to preserve any static objects declared in the stub by copying them into the new..
				MixInObjects(oldClass,newClass);				
			}
			else
			{
				alert( 'Request error: ' + oXmlHttp.statusText + ' (' + oXmlHttp.status + ')' ) ;
			}
		}
	}
	
	oXmlHttp.open('GET',fname + "_real.js", false);
	oXmlHttp.send(null);
	oXmlHttp = null;
}



function MixInObjects(src,dst)
{
	for(o in src)
	{		
		alert("sniff:"  + o + " ( " +  typeof(src[o]) + ")");
		
		if (typeof(src[o]) != "function")
		{
			if (dst[o] != null)
			{
				alert("clobber " + o);
			}
		
			dst[o] = src[o];
			src[o] = null;
		}
	}	
}

function MixinPrototype(src,dst)
{
	for(o in src.prototype)
	{		
		alert("sniff:"  + o);
		dst[o] = src.prototype[o];
	}	
}

function MixinPrototypePrototype(src,dst)
{
	var e;
	try
	{
		for(o in src.prototype)
		{		
			alert("MixinPrototypePrototype sniff:"  + o);
			dst.prototype[o] = src.prototype[o];
		}	
	}
	catch(e)
	{
		alert(e);
	}
}