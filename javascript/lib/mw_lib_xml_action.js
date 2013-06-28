/*

    @file mw_lib_xml_action.js

    $Id: mw_lib_xml_action.js,v 1.18 2008/08/05 02:05:10 james Exp $

    @author     James Mc Parlane

    PROJECT:    MetaWrap JavaScript Library

    COMPONENT:  -

    @date       11 September 2004


    GENERAL INFO:

        Massive Technologies
        PO Box 567
        Darlinghurst 2010
        NSW, Australia
        email:  james@massive.com.au
        tel:    (+61-2) 9331 8699
        fax:    (+61-2) 9331 8699
        mob:    (+61) 407-909-186


    LICENSE:

    Copyright (C) 2001  Massive Technologies, Pty Ltd.

    MetaWrap is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

*/

/*
 * $Log: mw_lib_xml_action.js,v $
 * Revision 1.18  2008/08/05 02:05:10  james
 * Fixed issue in recursive determineStates
 *
 * Revision 1.17  2004/01/06 00:43:24  james
 * Added activate and deactivate to statemachine
 * Added login via sms to example application.
 *
 * Revision 1.16  2004/01/04 23:41:24  james
 * Getting state view to make callouts
 *
 * Revision 1.15  2007/08/23 08:57:03  jeff
 * Action now contains 'transation' to get rid of m_action.m_action m_action.m_response
 * Now we have m_transaction.m_action and m_transaction.m_response
 *
 * Revision 1.18  2006/08/28 11:55:37  james
 * Latest updates
 *
 * Revision 1.14  2006/07/11 13:06:05  james
 * Integrating flash into XML Actions.
 *
 * Revision 1.13  2006/07/10 07:22:52  james
 * Added two way handshake to validate that flash object is working.
 *
 * Revision 1.12  2006/07/04 12:57:12  james
 * Moved the flash into Action namespace instead of Action.XMLVault
 *
 * Revision 1.11  2006/07/04 12:24:22  james
 * Almost have Flash integrated into XML.Action
 *
 * Revision 1.10  2006/07/04 11:48:12  james
 * Getting Flash integrated into XML.Action
 *
 * Revision 1.9  2006/07/02 06:29:25  james
 * Latest update to XmlVault and flash connector
 *
 * Revision 1.8  2006/07/01 08:07:00  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.7  2006/07/01 05:14:45  james
 * Latest update to XmlVault and flash connector
 *
 * Revision 1.6  2006/07/01 03:26:15  james
 * Adding ability to control maximum number of paralell connections.
 *
 * Revision 1.5  2006/06/20 13:41:15  james
 * Improved Action AJAX so that it can be executed asyncronously, either serially or in parallel
 *
 * Revision 1.4  2006/05/26 07:06:33  james
 * Added spamge project
 *
 * Revision 1.3  2006/05/17 11:48:59  james
 * Macro recorder fixes
 *
 * Revision 1.2  2006/05/16 04:56:31  james
 * Created simple cypher object and testcases
 *
 * Revision 1.1  2006/05/14 07:36:23  james
 * *** empty log message ***
 *
 */

/*! \page mw_lib_xml_action MetaWrap - JavaScript - XML - Action
 *
 * \subsection mw_javascript_lib_xml_vault Overview
 *
 * This action class allows you to call MetaWrap actions.
 * You can specify if you want it done asynronously.
 * You can futher specify if you want to call each action in parallel or in serial
 *
 */

//alert("$Id: mw_lib_xml_action.js,v 1.18 2008/08/05 02:05:10 james Exp $");

/*! \defgroup mw_javascript_lib_xml_action  MetaWrap - JavaScript - XML - Action
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.Network","mw_lib_network.js");

/*! @name  MetaWrap.XML.Action */
//@{

/*!
    @namespace  MetaWrap.XML.Action
    @brief      Register the namespace and main class for MetaWrap.XML.Action
*/
MetaWrap.XML.Action = function(p_action,p_url)
{
	this.m_transaction = p_action;
	this.m_result = null;
	this.m_response_string = "";
	this.m_response_xml = null;
	this.m_url = p_url;
	this.m_queued = false;
	this.m_async = false;
	this.m_parallel = false;
	this.m_requested = false;
	this.m_queue_index = 0;
	this.m_completed = false;
	this.m_onresponse = null;
	this.m_timer = null;
}


/*!
    @brief      The single threaded default HTTP Client
*/
MetaWrap.XML.Action.m_client = new MetaWrap.Network.Client.HTTP();


/*!
    @brief      Collection Of Actions
*/
MetaWrap.XML.Action.m_transactions = [];
MetaWrap.XML.Action.m_transaction = 0;
MetaWrap.XML.Action.m_current_parallel = 0;
MetaWrap.XML.Action.m_max_parallel = 4;


MetaWrap.XML.Action.m_deferring_callbacks = false;
MetaWrap.XML.Action.m_deferred_callbacks = [];


/*!
    @fn     MetaWrap.XML.Action.deferCallbacks = function()
    @return     void
    @brief     Starts defering  callbacks - these are all executed after a call to MetaWrap.XML.Action.completedDeferrdedCallbacks()
    @author     James Mc Parlane
    @date       8 May 2006

*/
MetaWrap.XML.Action.deferCallbacks = function()
{
	MetaWrap.XML.Action.m_deferring_callbacks = true;
	MetaWrap.XML.Action.m_deferred_callbacks = [];
}


/*!
    @fn    MetaWrap.XML.Action.completedDeferrdedCallbacks = function()
    @return     void
    @brief      Runs an action. It will either run the action immediately or schedule it to be run, depending on inputs.
    @author     James Mc Parlane
    @date       8 May 2006

*/
MetaWrap.XML.Action.completedDeferrdedCallbacks = function()
{
	MetaWrap.XML.Action.m_deferring_callbacks = false;
	
	if (MetaWrap.XML.Action.m_deferred_callbacks.length != 0)
	{
		for(var i = 0;i<MetaWrap.XML.Action.m_deferred_callbacks.length;i++)
		{
			var l_action = MetaWrap.XML.Action.m_deferred_callbacks[i];
			
			l_action.m_onresponse.call(l_action);			
		}
	}
	
	MetaWrap.XML.Action.m_deferred_callbacks = [];
}



/*!
    @class      MetaWrap.XML.Action.prototype.run = function(p_onresponse,p_async,p_parallel)
    @param      p_onresponse If this is a reference to the function to call once the action is finished.
    @param      p_async If true then this is an asynchronous request
    @param      p_parallel If this is true then this action is allowed to run in paralelle with others
    @return     void
    @brief      Runs an action. It will either run the action immediately or schedule it to be run, depending on inputs.
    @author     James Mc Parlane
    @date       8 May 2006

    This runs an action.

    If p_async is false, then this function wait until the request is made.
    If p_onresponse is not null, a callback to p_onresponse will be made
    as soon as the request is complete.

    If p_async is true, then this function will return immediately
    and the request will be made. If p_onresponse is not null a Callback to
    p_onresponse will be  made as soon as the request is complete.

	If p_async and p_parallel are true then the requests will be made in
	parallel.

*/
MetaWrap.XML.Action.prototype.run = function(p_onresponse,p_async,p_parallel)
{
	// Make sure we have a non null default
	this.m_async = p_async||false;
	
	if (this.m_async)
	{
		warn("async request");
	}
		
	// Make sure we have a non null default
	//this.m_parallel = p_parallel||false;
	
	this.m_parallel = true;

	// Make sure we have a non undefined default
	this.m_onresponse = p_onresponse||null;

	// Default to the global HTTP Client client
	var l_client = 	MetaWrap.XML.Action.m_client;	
	//var l_client = new MetaWrap.Network.Client.HTTP();

	// By default we are not going to to defer
	var l_defer = false;

	//
	// Do we have Flash support included
	//

	var l_flash_support = ((MetaWrap.XML.Action.FlashConnector != null) && MetaWrap.XML.Action.FlashConnector.test());

	//alert("l_flash_support = " + l_flash_support);

	if (!this.m_parallel)
	{
		// If we are not in parallel and we still have pending actions
		if (MetaWrap.XML.Action.m_transaction != MetaWrap.XML.Action.m_transactions.length)
		{
  		   // then defer this action till later so we can run it when the current one completes
  		   l_defer = true;
		}
	}

	
	
	// This request is now pending
	this.m_queued = true;
	this.m_queue_index = MetaWrap.XML.Action.m_transactions.length;
	MetaWrap.XML.Action.m_transactions[MetaWrap.XML.Action.m_transactions.length] = this;
	
	

	// only make the request if we are not defering,
	if (!l_defer)
	{
		// If we have flash support
		if (l_flash_support)
		{
			// Call using flash instead of via MetaWrap.Network.Client.HTTP
			MetaWrap.XML.Action.FlashConnector.run(this,p_onresponse)
		}
		else
		{
			

			if (this.m_parallel)
			{
				// For parallel we create a new client.
				l_client = new MetaWrap.Network.Client.HTTP();

				// We are running one more request in parallel
				MetaWrap.XML.Action.m_current_parallel++;
			}

			// Make the request
			return this.request(l_client);
		}
	}
	
	return true;
		
}

/*!
    @fn      MetaWrap.XML.Action.prototype.request = function(p_client)
    @param      p_client Reference to the client making the request
    @return     void
    @brief
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.prototype.request = function(p_client)
{
	// Serialise the command object into an XML string
	// var l_get_string = MetaWrap.XML.Serialise(this.m_transaction,null,this.m_async);
	var l_get_string = MetaWrap.XML.Serialise(this.m_transaction,null,false);
	
	try
	{		
		if (MetaWrap.eval("g_debug",false)) warn("calling " + this.m_url);
	
		p_client.open("POST",this.m_url,this.m_async);
		p_client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//p_client.setRequestHeader("Content-length", l_get_string.length);

		if (this.m_async)
		{
			// Call this this.readyStateChange when something responds to this request and redraws the display
			var l_this = this;
			p_client.onreadystatechange = function()
			{
				var l_this_client = p_client;
				
				//trace("onreadystatechange");											
			    l_this.respond(l_this_client)
			};
		}
		else
		{
			// make damn sure we don't repeat
			p_client.onreadystatechange = function(){};
		}

		// mark the command as requested
		this.m_requested = true;

		// Send the command, posting the xml string as content
		p_client.send(l_get_string);

		if (!this.m_async)
		{
			return this.respond(p_client);
		}
	}
	catch(l_e)
	{
		error("MetaWrap.XML.Action.request " + " '" + this.m_url + "' resulted in exception "+  MetaWrap.exceptionMessage(l_e));
		return false;
	}
	return true;
}


/*!
    @class      MetaWrap.XML.Action.prototype.complete = function()
    @return     void
    @brief
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.prototype.complete = function()
{
    //alert("MetaWrap.XML.Action.prototype.complete()");

    //alert(this.m_response_string);

    // generate a response object to populate
    //this.m_result = this.m_transaction.response();
    this.m_transaction = this.m_transaction.response();

    // Deserialise the xml into the new object
    //MetaWrap.XML.Deserialise(this.m_response_string,this.m_result.m_response);
	MetaWrap.XML.Deserialise(this.m_response_string,this.m_transaction.m_response);

    // We have completed one more action.
   	MetaWrap.XML.Action.m_transaction++;
	
   	this.m_completed = true;
	
	// If we need to do a callout
	if (this.m_onresponse != null)
	{
		
		if (MetaWrap.XML.Action.m_deferring_callbacks)
		{
			MetaWrap.XML.Action.m_deferred_callbacks[MetaWrap.XML.Action.m_deferred_callbacks.length] = this;
		}
		else
		{
			//alert("complete m_onresponse");
			this.m_onresponse.call(this);			
		}
		
    }	
}

/*!
    @class      MetaWrap.XML.Action.prototype.reschedule = function()
    @return     void
    @brief
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.prototype.reschedule = function()
{
	//alert("MetaWrap.XML.Action.reschedule()");

	// If we have a response
	/*
	if (this.m_onresponse != null)
	{
		alert("reschedule m_onresponse");
    	this.m_onresponse.call(this);
    }
	*/

   	// find the next Action that is not completed and has not been requested
   	for(var i = 0;i<MetaWrap.XML.Action.m_transactions.length;i++)
   	{
   		// if its not requested yet
   		if ((!MetaWrap.XML.Action.m_transactions[i].m_requested))
   		{
   			// if its not completed yet
       		if ((!MetaWrap.XML.Action.m_transactions[i].m_completed))
       		{
				var l_flash_support = ((MetaWrap.XML.Action.FlashConnector != null) && MetaWrap.XML.Action.FlashConnector.test());

				if (l_flash_support)
				{
					//alert("MetaWrap.XML.Action.FlashConnector.run " + i + " " + MetaWrap.XML.Action.m_transactions[i].m_queue_index);
					MetaWrap.XML.Action.FlashConnector.run(MetaWrap.XML.Action.m_transactions[i],MetaWrap.XML.Action.m_transactions[i].m_onresponse)
				}
				else
				{
					//alert("reuse - last - client");
					// reuse last p_client
					var l_client = p_client;

					// Unless we are requesting in parallel and this is the main client
					if (this.m_parallel && p_client == MetaWrap.XML.Action.m_client)
					{
						// In which case we need our own client
						l_client = new MetaWrap.Network.Client.HTTP();
					}

					// Make the request
					MetaWrap.XML.Action.m_transactions[i].request(p_client);
				}

				return;
			}
   		}
   	}

   	// no requests pending... reset array
   	MetaWrap.XML.Action.m_transactions = [];
   	MetaWrap.XML.Action.m_transaction = 0;
}


/*!
    @class      MetaWrap.XML.Action.prototype.respond = function(p_client)
    @param      p_client Reference to the client making the request
    @return     void
    @brief
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.prototype.respond = function(p_client)
{
	

	// 4 Means done...
    if (p_client.readyState == 4)
    {
		var l_return = false;
		
        // 200 is good :)
        if (p_client.status == 200)
        {
			// Get the result
			this.m_response_string = new String(p_client.responseText);
			
			this.m_response_xml = p_client.responseXML;
			
			//alert("p_client.responseXML = " +this.m_response_xml.firstChild.nodeName);

			// Complete the request
			this.complete();
			
			l_return = true;
        }
        else
        {
			error(p_client.status + " error " + this.m_url);
			
			var l_metawrap_action_onerror = null;
			try
			{
				l_metawrap_action_onerror  = MetaWrap.eval("MetaWrap_Action_onerror",null);
			}
			catch(l_e)
			{
				warn("MetaWrap_Action_onerror error handler has not been defined.");
			}
			
			
			if (l_metawrap_action_onerror != null)
			{
				l_metawrap_action_onerror();
			}
			else
			{
				alert('There was a problem with the request.');
			}										
        }

      	// reschedule the next request
		this.reschedule();
		
		return l_return;
    }
}

/*!
 *@} endgroup mw_javascript_lib_xml_action MetaWrap - JavaScript - XML - Action
 */

/*!
 *@} end of MetaWrap.XML.Action
 */





