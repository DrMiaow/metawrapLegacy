/*

	@file mw_lib_xml_action_flashconnector.js

	$Id: mw_lib_xml_vault_flashconnector.js,v 1.17 2006/07/04 13:17:59 james Exp $
          
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
 * $Log: mw_lib_xml_vault_flashconnector.js,v $
 * Revision 1.17  2006/07/04 13:17:59  james
 * Moved flash into Action namespace
 *
 * Revision 1.16  2006/07/01 08:02:10  james
 * Trying to fix Doxygen comments
 * --------------------------------------------------
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

/*! \page mw_javascript_lib_xml_action_flashconnector MetaWrap - JavaScript - XML - Action - FlashConnector
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
 
/*! \defgroup mw_javascript_lib_xml_vault_connector MetaWrap - JavaScript - XML - Action - FlashConnector
 *@{
 */ 
 
// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js"); 
MwUse("MetaWrap.XML.Vault","mw_lib_xml_vault.js"); 

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
    @class      MetaWrap.XML.Action.FlashConnector.getFlashObject = function()
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
    @class      MetaWrap.XML.Action.FlashConnector.doCall = function()
    @return     void
    @brief      Test function to test the flash connector
    @author     James Mc Parlane
    @date       8 May 2006
*/	
MetaWrap.XML.Action.FlashConnector.doCall = function()
{
	var l_sample = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n\r\
	<name>\n\r\
	<first>Bill</first>\n\r\
	<last>Gates</last>\n\r\
	</name>";
	
	var l_put = new MetaWrap.XML.Vault.put("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",l_sample,"test.xml");
	
//	var l_put_request = new MetaWrap.XML.Vault.put.request();
	
	var l_put_request_xml = MetaWrap.XML.Serialise(l_put,null,false);
	
	alert(l_put_request_xml);
	
	var l_fobj = MetaWrap.XML.Action.FlashConnector.getFlashObject();
	
	if (l_fobj == null)
	{
		alert("Unable to find 'XmlVault'");
	}
	else
	{
		alert("'XmlVault' exists");
	
		l_fobj.send("put",l_put_request_xml);
	}
}

/*!
    @class      MetaWrap.XML.Action.FlashConnector.receiveXml = function(p_xml)
    @return     void
    @brief      Test function to test the flash connector
    @author     James Mc Parlane
    @date       8 May 2006
*/	
MetaWrap.XML.Action.FlashConnector.receiveXml = function(p_xml)
{
	alert(p_xml);
	return "received";
}


/*!
    @brief      Add the flash object 
*/    

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
catch(e){}
	

// If we have "FlashObject"
if (l_has_flash_object)
{
	// Use it
	alert("Add Flash Using FlashObject")
	document.write('<div id="flashcontent"></div>');
	var l_flashobject = new FlashObject("./mw_flash_xml_action.swf", "XmlVault", MetaWrap.XML.Action.FlashConnector.m_width, MetaWrap.XML.Action.FlashConnector.m_height, "8", "#EEEEEE");
	l_flashobject.addParam("allowScriptAccess", "always");
	l_flashobject.write("flashcontent");
}
else
if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) 
{ 
	// netscape plugin architecture
	alert("Add Flash Using Generic Mozilla")
	document.write('<embed type="application/x-shockwave-flash" src="./mw_flash_xml_action.swf" width="' + MetaWrap.XML.Action.FlashConnector.m_width + '" height="' + MetaWrap.XML.Action.FlashConnector.m_height + '" id="XmlVault" name="XmlVault" bgcolor="#EEEEEE" quality="high" allowScriptAccess="always" />');
}
else
{
	alert("Add Flash Using Generic IE")
	document.write('<object id="XmlVault" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + MetaWrap.XML.Action.FlashConnector.m_width + '" height="' + MetaWrap.XML.Action.FlashConnector.m_height + '"><param name="movie" value="./mw_flash_xml_action.swf" /><param name="bgcolor" value="#EEEEEE" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" /></object>');
}

/*! 
 *@} endgroup mw_javascript_lib_xml_action_flashconnector MetaWrap - JavaScript - XML - Action - FlashConnector
 */ 

/*! 
 *@} end of MetaWrap.XML.Action.FlashConnector
 */ 