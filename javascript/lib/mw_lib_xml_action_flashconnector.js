/*

	@file mw_lib_xml_action_flashconnector.js

	$Id: mw_lib_xml_action_flashconnector.js,v 1.7 2008/06/03 09:36:58 james Exp $

	@author     James Mc Parlane

	PROJECT:    The MetaWrap Project

	COMPONENT:  -

	@date       22 May 2006


	GENERAL INFO:

		Massive Technologies
		PO Box 567
		Darlinghurst 2010
		NSW, Australia
		email:	james@massive.com.au
		tel:	(+61-2) 9331 8699
		fax:	(+61-2) 9331 8699
		mob:	(+61) 407-909-186


	LICENSE:

	Copyright (C) 2004  Massive Technologies, Pty Ltd.

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

	In addition, as a special exception, Massive Technologies
	gives permission for parties to develop 'Plugins' via the
	'PluginManager'. Said party is free to develop a proprietary
	'Plugin' and will not be forced to distribute source code for that
	'Plugin', but we of course encourage them to do so. You must obey the GNU
	General Public License in all respects for all of the code used
	other than interfacing with the 'PluginManager'.  If you modify this
	file, you may extend this exception to your version of the file, but
	you are not obligated to do so.  If you do not wish to do so, delete
	this exception statement from your version.

*/

/*
 * $Log: mw_lib_xml_action_flashconnector.js,v $
 * Revision 1.7  2008/06/03 09:36:58  james
 * Updated js lib
 *
 * Revision 1.6  2007/09/14 05:05:01  james
 * FTP issue resolved
 *
 * Revision 1.5  2006/07/16 22:16:18  james
 * Latest changes to getting the flash connector running properly
 * Flash can only be contacted after the document is loaded
 *
 * Revision 1.4  2006/07/11 13:06:05  james
 * Integrating flash into XML Actions.
 *
 * Revision 1.3  2006/07/10 07:22:52  james
 * Added two way handshake to validate that flash object is working.
 *
 * Revision 1.2  2006/07/04 13:17:59  james
 * Moved flash into Action namespace
 *
 * Revision 1.1  2006/07/04 12:57:12  james
 * Moved the flash into Action namespace instead of Action.XMLVault
 *
 * Revision 1.3  2006/07/04 12:24:22  james
 * Almost have Flash integrated into XML.Action
 *
 * Revision 1.2  2006/07/02 07:43:14  james
 * Renamed xml.action.xmlvault files and namespace for more conistency
 *
 * Revision 1.1  2006/07/02 07:41:28  james
 * *** empty log message ***
 *
 * Revision 1.6  2006/07/02 06:29:25  james
 * Latest update to XmlVault and flash connector
 *
 * Revision 1.5  2006/07/01 08:07:00  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.4  2006/07/01 06:51:34  james
 * Getting ready to integrate with current JavaScript action class
 *
 * Revision 1.3  2006/07/01 05:14:45  james
 * Latest update to XmlVault and flash connector
 *
 * Revision 1.2  2006/05/29 08:19:34  james
 * Latest changes
 *
 * Revision 1.1  2006/05/22 13:25:50  james
 * Import of original version of object written by Rob Muller (robert@massive.com.au)
 *
 * Revision 1.0  2006/04/10 13:25:50  james
 * Crazy idea to use flash to overcome limitations of browser sandbox.
 *
 */

/*! \page mw_javascript_lib_xml_action_flashconnector MetaWrap - JavaScript - XML - Action -  FlashConnector
 *
 * \subsection mw_javascript_lib_xml_action_flashconnector Overview
 *
 * \subsection mw_javascript_lib_xml_action_flashconnector Testing
 *
 * Works under
 *   Firefox 1.1 and above
 *   IE6
 *   Mozilla 1.7 and above
 */

/*! \defgroup mw_javascript_lib_xml_action_xmlvault_connector MetaWrap - JavaScript - XML - Action -  FlashConnector
 *@{
 */

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.Action","mw_lib_xml_action.js");
MwUse("MetaWrap.Page","mw_lib_page.js");


/*! @name  MetaWrap.XML.Action.FlashConnector */
//@{

/*!
    @namespace  MetaWrap.XML.Action.FlashConnector
    @brief      Declare the MetaWrap namespace
    @author     James Mc Parlane
    @date       10 April 2006
*/
MetaWrap.XML.Action.FlashConnector = {};

/*!
    @brief Configuration of FlashConnector
*/

/// If this is true then we are in debug mode and it will be visible
MetaWrap.XML.Action.FlashConnector.m_debug = true;

// The width of the flash element
MetaWrap.XML.Action.FlashConnector.m_width = 1;

// The height of the flash element
MetaWrap.XML.Action.FlashConnector.m_height = 1;

/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.getFlashObject = function()
    @return     void
    @brief      Return a reference to the flash object.
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.FlashConnector.getFlashObject = function()
{
	var l_id = "XmlAction";
    var isIE = navigator.appName.indexOf("Microsoft") != -1;
    return (isIE) ? window[l_id] : document[l_id];
}

/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.run = function(p_action,p_onresponse)
    @param		p_action
    @param		p_onresponse
    @return     bool true if we ran the request, false if we failed.
    @brief      Test function to test the flash connector
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.FlashConnector.run = function(p_action,p_onresponse)
{
	// Serialise the object into an XML string
	var l_action_xml = MetaWrap.XML.Serialise(p_action.m_action,null,false);

	// Make sure we have a non undefined default for p_action.m_onresponse
	p_action.m_onresponse = p_onresponse||null;

	// Find the Flash object that will act as our proxy
	var l_fobj = MetaWrap.XML.Action.FlashConnector.getFlashObject();

	if (l_fobj == null)
	{
		error("MetaWrap.XML.Action.FlashConnector.run: getFlashObject() fails to find");
		return false;
	}
	else
	{
		// Send the action
		l_fobj.send(p_action,l_action_xml);
	}

	return true;
}

/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.ready = function()
    @return     bool - Returns true if the flash connector is ready
    @brief      Returns true if the flash connector is ready
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.FlashConnector.ready = function()
{
    return (MetaWrap.XML.Action.FlashConnector.getFlashObject() != null)
}


/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.action = function(p_action)
    @return     bool return true if we managed to send the function to flash
    @brief      Test function to test the flash connector
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.FlashConnector.run = function(p_action,p_onresponse)
{
	// Serialise the object into an XML string
	var l_action_xml = MetaWrap.XML.Serialise(p_action.m_transaction,null,false);

	// Make sure we have a non undefined default for p_action.m_onresponse
	p_action.m_onresponse = p_onresponse||null;

	// Get the flash object
	var l_fobj = MetaWrap.XML.Action.FlashConnector.getFlashObject();

	if (l_fobj == null)
	{
		alert("Unable to find 'XmlAction'");
		return false;
	}
	else
	{
		// send to it
		l_fobj.send(p_action,l_action_xml);
		return true;
	}
}

/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.receiveXml = function(p_action_id,p_action_response)
    @param		p_action_id The ID of the action called
	@param		p_action_response The XML response from calling the action
    @return     bool true to signify to flash that it managed to contact us
    @brief      Test function to test the flash connector
    @author     James Mc Parlane
    @date       8 May 2006
    @warning	This function or functions this calls should not call alert() or flash will kill this call - so we call callbacks on a timer
*/
MetaWrap.XML.Action.FlashConnector.receiveXml = function(p_action_queue_index,p_action_response)
{
	alert("receiveXml " + MetaWrap.typeOf(p_action_response));

	// Get an index to the scheduled action
	var l_action = MetaWrap.XML.Action.m_transactions[p_action_queue_index];

	// Save the response string
	l_action.m_response_string = p_action_response;
	

	// Call the callback on a timeout - we need to respond to flash ASAP - or flash will unhook itself
	// from this call and get a null return value.
	l_action.m_timer  = setTimeout("MetaWrap.XML.Action.FlashConnector.receiveXmlUnpack(" + p_action_queue_index + ")", 1);

	// This return simply signifies that we got what flash sent us.
	return true;
}

/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.receiveXmlUnpack = function(p_action_queue_index)
    @param		p_action_id The ID of the action called
    @return     void
    @brief      Test function to test the flash connector
    @author     James Mc Parlane
    @date       11 July 2006
*/
MetaWrap.XML.Action.FlashConnector.receiveXmlUnpack = function(p_action_queue_index)
{
	var l_action = MetaWrap.XML.Action.m_transactions[p_action_queue_index];
	
	//debugger;

	// Call the timeout in one m
	clearTimeout(l_action.m_timer);
	l_action.m_timer = null;

	// Complete the action
	l_action.complete();

   	// reschedule the next request
	l_action.reschedule();

	return true;
}

/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.error = function(p_string)
    @param		p_string The error string
    @return     void
    @brief      Reports an error back to JavaScript
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.FlashConnector.error = function(p_string)
{
	alert("MetaWrap.XML.Action.FlashConnector.error " + p_string);
}

/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.error = function(p_string)
    @param		p_string The error string
    @return     void
    @brief      Reports an error back to JavaScript
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.FlashConnector.test = function()
{
	// Get the flash object
	var l_fobj = MetaWrap.XML.Action.FlashConnector.getFlashObject();

	if (l_fobj == null)
	{
		return false;
	}
	else
	{
		//try
		{
			l_fobj.test();
		}
		//catch(l_e)
		{
			//return false;
		}
	}

	return true;
}


/*!
    @fn      	MetaWrap.XML.Action.FlashConnector.error = function(p_string)
    @param		p_string The error string
    @return     void
    @brief      Reports an error back to JavaScript
    @author     James Mc Parlane
    @date       8 May 2006
*/
MetaWrap.XML.Action.FlashConnector.init = function()
{
	alert("MetaWrap.XML.Action.FlashConnector.init");

	// If we are in debug mode
	if (MetaWrap.XML.Action.FlashConnector.m_debug)
	{
		// Make it big
		MetaWrap.XML.Action.FlashConnector.m_width = 400;
		MetaWrap.XML.Action.FlashConnector.m_height = 400;
	}

	// Work out if we have the industry "flashobject" script included
	var l_has_flash_object = false;
	try
	{
		l_has_flash_object = (com.deconcept.FlashObjectUtil != null);
	}
	catch(e)
	{
	}

    // Create the main 'div' attribute
    var l_div = document.createElement("div");

    // Create the 'id' element
    var l_id = document.createAttribute("id");

    // Set its value to our required id in p_id
    l_id.value = "flashcontent";

    // Set the main container to use absolute positioning
//	l_div.style.position = "absolute";

    // Set the main container to start as hidden
//	l_div.style.visibility = "hidden";

    // Add 'id' to our 'div'
    l_div.setAttributeNode(l_id);

    // Find me some 'body' to love.
    var l_body = document.getElementsByTagName("body");

    // Add the lovechild.
    l_body[0].appendChild(l_div);

	// If we have "FlashObject" - then use it
	if (l_has_flash_object)
	{
		alert("Flash Object");
		// Use it
		//document.write('<div id="flashcontent"></div>');


		var l_flashobject = new FlashObject("mw_flash_xml_action.swf", "XmlAction", MetaWrap.XML.Action.FlashConnector.m_width, MetaWrap.XML.Action.FlashConnector.m_height, "8", "#EEEEEE");
		l_flashobject.addParam("allowScriptAccess", "always");
		l_flashobject.write("flashcontent");
	}
	else
	if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length)
	{
		// Netscape plugin architecture
		alert("Netscape Embed");
		document.write('<embed type="application/x-shockwave-flash" src="./mw_flash_xml_action.swf" width="' + MetaWrap.XML.Action.FlashConnector.m_width + '" height="' + MetaWrap.XML.Action.FlashConnector.m_height + '" id="XmlAction" name="XmlAction" bgcolor="#EEEEEE" quality="high" allowScriptAccess="always" />');
	}
	else
	{
		// IE Plugin architecture
		document.write('<object id="XmlAction" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + MetaWrap.XML.Action.FlashConnector.m_width + '" height="' + MetaWrap.XML.Action.FlashConnector.m_height + '"><param name="movie" value="./mw_flash_xml_action.swf" /><param name="bgcolor" value="#EEEEEE" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" /></object>');
	}

	alert(l_div.innerHTML);
}

// Make sure that the onload is called when page unloads
MetaWrap.Page.addOnLoad(MetaWrap.XML.Action.FlashConnector.init);


/*!
 *@} endgroup mw_javascript_lib_xml_action_flashconnector MetaWrap - JavaScript - XML - Action - XMLVault - FlashConnector
 */

/*!
 *@} end of MetaWrap.XML.Action.FlashConnector
 */