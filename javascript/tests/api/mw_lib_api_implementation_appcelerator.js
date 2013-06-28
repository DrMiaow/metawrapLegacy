//
// Request Portion
//

var MetaWrap = MetaWrap || {};
MetaWrap.API = MetaWrap.API || {};
MetaWrap.API.Request = MetaWrap.API.Request || {};
MetaWrap.API.Request.timeoutMs = 30*1000;

/*!
    @fn         MetaWrap.API.Request.prototype.postSynchronous
    @param      p_url
    @param      p_xml    
    @brief      Make a HTTP POST call syncronously.
    @author     James Mc Parlane
    @date       6 June 2009    
*/
MetaWrap.API.Request.prototype.postSynchronous = function(p_url,p_xml)
{   
	S.log('REQUEST = ' + p_xml);
    	
	
	//alert("postSynchronous");
    // Do the XHR thing
    //var l_xhr = new MetaWrap.Network.Client.HTTP();
    var l_xhr = Titanium.Network.createHTTPClient(); 
    l_xhr.setTimeout(MetaWrap.API.Request.timeoutMs);
	this.XHR = l_xhr;

    l_xhr.open("POST",p_url,false);
    l_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // make damn sure we don't repeat
    l_xhr.onreadystatechange = function(){};

    // Punch it rico
    l_xhr.send(p_xml);   
    
    // Wait for the response
    if (l_xhr.status == 200)
    {
    	//alert("200");
    	S.log('RESPONSE = ' + l_xhr.responseText);
    	
    	l_xhr.responseXml = Ti.XML.parseString(l_xhr.responseText);
    	
    	//alert(l_xhr.responseXml);
        return new MetaWrap.API.Response(p_url,this,l_xhr.responseXml,200);
    }
    else
    {
        throw("Request to '" + p_url + "' failed, status '" + l_xhr.status);
    }
	
	return this;
}

/*!
    @fn         MetaWrap.API.Request.prototype.postAsynchronous
    @param      p_url
    @param      p_xml    
    @brief      Make a POST call asyncronously.
    @author     James Mc Parlane
    @date       6 June 2009    
*/
MetaWrap.API.Request.prototype.postAsynchronous = function(p_url,p_xml,p_fn)
{
	
	//alert("postAsynchronous");
	
    // Used inside the closure
    var l_request = this;

    // Do the XHR thing
    //var l_xhr = new MetaWrap.Network.Client.HTTP(); 
    var l_xhr = Titanium.Network.createHTTPClient(); 
    l_xhr.setTimeout(MetaWrap.API.Request.timeoutMs);

	this.XHR = l_xhr;
    l_xhr.open("POST",p_url,true);
    l_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // make damn sure we don't repeat
    l_xhr.onreadystatechange = function()
    {

        if (l_xhr.readyState == 4)
        {
            if (l_xhr.status == 200)
            {
    			S.log('RESPONSE = ' + l_xhr.responseText);
    	
    			l_xhr.responseXml = Ti.XML.parseString(l_xhr.responseText);
    	
                var l_response = new MetaWrap.API.Response(p_url,l_request,l_xhr.responseXML,200);

                p_fn.call(l_response);  
            }
            else
            {
                throw("Request to " + p_url + " failed, status " + l_xhr.status);
            }
        }        
    };
        
    // Punch it rico
    l_xhr.send(p_xml);	
}


//
// Feed Portion
//

/*!
    @fn         MetaWrap.API.Request.prototype.getSynchronous
    @param      p_url    
    @brief      Make a HTTP GET call asyncronously.
    @author     James Mc Parlane
    @date       6 June 2009    
*/
MetaWrap.API.Request.Feed.prototype.getSynchronous = function(p_url)
{    
    // Do the XHR thing
    //var l_xhr = new MetaWrap.Network.Client.HTTP(); 
    var l_xhr = Titanium.Network.createHTTPClient(); 
    l_xhr.setTimeout(MetaWrap.API.Request.timeoutMs);

    this.XHR = l_xhr;
    l_xhr.open("GET",p_url,false);
    //l_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // make damn sure we don't repeat
    l_xhr.onreadystatechange = function(){};

    // Punch it rico
    l_xhr.send();   
    
    // Wait for the response
    if (l_xhr.status == 200)
    {
    	S.log('RESPONSE = ' + l_xhr.responseText);
    	
    	l_xhr.responseXml = Ti.XML.parseString(l_xhr.responseText);   
    	 	
        return new MetaWrap.API.Response(p_url,this,l_xhr.responseXML,200);
    }
    else
    {
        throw("Request to '" + p_url + "' failed, status '" + l_xhr.status);
    }
    
    return this;
}

MetaWrap.API.Request.Feed.prototype.getAsynchronous = function(p_url,p_fn)
{
    // Used inside the closure
    var l_request = this;

    // Do the XHR thing
    //var l_xhr = new MetaWrap.Network.Client.HTTP(); 
    var l_xhr = Titanium.Network.createHTTPClient(); 
    l_xhr.setTimeout(MetaWrap.API.Request.timeoutMs);

    this.XHR = l_xhr;
    l_xhr.open("GET",p_url,true);
    //l_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // make damn sure we don't repeat
    l_xhr.onreadystatechange = function()
    {

        if (l_xhr.readyState == 4)
        {
            if (l_xhr.status == 200)
            {
                var l_response = new MetaWrap.API.Response(p_url,l_request,l_xhr.responseXML,200);

                p_fn.call(l_response);  
            }
            else
            {
                throw("Request to " + p_url + " failed, status " + l_xhr.status);
            }

        }
        
    };
        
    // Punch it rico
    l_xhr.send();
    
}

//
// Xpath portion
//

/*!
    @fn         MetaWrap.API.selectSingleNode
    @param      p_document The document containing p_node
    @param      p_node The node we would like to be searching from (should match p_prefix)
    @param      p_xpath The XPATH we are searching. 
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.selectSingleNode = function(p_document,p_node,p_xpath)
{
    //alert("selectSingleNode " + p_xpath);
    
    //alert("p_node.tagName " + p_node.tagName);
    //alert("p_document.documentElement.tagName " + p_document.documentElement.tagName);
    
    var l_result =  p_node.evaluate(p_xpath);////p_document.evaluate(p_xpath,p_node);
    //alert('length = ' + l_result.length);
    //alert('length2 = ' + p_node.evaluate(p_xpath).length);
    
    if (l_result.length > 0)
    {
    	return l_result.item(0);
    }

    return null;
}

/*!
    @fn         MetaWrap.API.selectSingleNode
    @param      p_document The document containing p_node    
    @param      p_node The node we would like to be searching from (should match p_prefix)
    @param      p_xpath The XPATH we are searching. 
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009

    XPATH braindead = Does not allow queries from nodes, only document roots
*/
MetaWrap.API.selectNodes = function(p_document,p_node,p_xpath)
{
    //alert("selectNodes " + p_xpath);
    
    var l_result = p_node.evaluate(p_xpath);
    
    //alert('length = ' + l_result.length);
    
    var l_results = [];
    
    for(var i = 0;i<l_result.length;i++)
    {
    	l_results.push(l_result.item(i));
    }
    
    return l_results;
}
