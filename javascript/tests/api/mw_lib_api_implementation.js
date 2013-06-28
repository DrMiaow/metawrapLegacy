//
// Request Portion
//

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
    // Do the XHR thing
    var l_xhr = new MetaWrap.Network.Client.HTTP(); 
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
	
		warn("RESPONSE= " + l_xhr.responseXML.xml);
	
        return new MetaWrap.API.Response(p_url,this,l_xhr.responseXML,200);
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
    // Used inside the closure
    var l_request = this;

    // Do the XHR thing
    var l_xhr = new MetaWrap.Network.Client.HTTP(); 
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
				warn("RESPONSE= " + l_xhr.responseXML.xml);
			
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
    var l_xhr = new MetaWrap.Network.Client.HTTP(); 
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
    var l_xhr = new MetaWrap.Network.Client.HTTP(); 
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
    //log("selectSingleNode " + p_xpath);

    return p_node.selectSingleNode(p_xpath);
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
    //log("selectNodes " + p_xpath);
    
    return p_node.selectNodes(p_xpath);
}
