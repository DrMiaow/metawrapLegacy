/*

    @file mw_lib_macrorecorder_controlpanel_actions_load_xml.js

    $Id: mw_lib_macrorecorder_controlpanel_actions_load_xml.js,v 1.9 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_actions_load_xml.js,v $
 * Revision 1.9  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:42  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.8  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.7  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.6  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.5  2006/05/06 08:28:28  james
 * More refactoring
 *
 * Revision 1.4  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.3  2006/05/06 08:08:46  james
 * More code tidy up.
 * Getting control panel to implement the visitor class.
 *
 * Revision 1.2  2006/05/05 14:25:00  james
 * solved loading isssue - now need to edit each file with correct
 * dependencies
 *
 * Revision 1.1  2006/05/04 15:28:27  james
 * Moved code
 *
 * Revision 1.2  2006/05/04 15:25:05  james
 * Adjusting code
 *
 * Revision 1.1  2006/05/04 14:55:42  james
 * Reorganised code - preparing to release into public. Need to
 * provide an obvious way to extend this so that there is a
 * clear place for people to play with it.
 *
 */


/*! \page mw_javascript_lib_macrorecorder_controlpanel_actions_load_xml MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Load - Xml
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_load_xml Overview
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel_actions_load_xml.js,v 1.9 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel_actions_load_xml  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Load - Xml
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name MetaWrap.MacroRecorder.ControlPanel.load.xml plugin */
//@{

window.LoadAsXML = function(p_document)
{
    var l_textarea = p_document.getElementById("xml");
    
    var l_xml_string = l_textarea.value;
    
    MetaWrap.MacroRecorder.m_recording = MetaWrap.XML.Deserialise(l_xml_string,new MetaWrap.MacroRecorder.Recording());
    
    MetaWrap.MacroRecorder.m_save_window.close();
}

MetaWrap.MacroRecorder.ControlPanel.Actions.load.xml = function()
{
    
    // Open window
    MetaWrap.MacroRecorder.m_save_window = window.open("","_blank","top=100,left=100,height=300,width=400,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes",true);
    
    // http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/methods/open_1.asp
    // text/html Default. Currently the only MIME type supported for this method.  :(
    //this.m_save_window.document.open("text/xml", "replace");
    
    MetaWrap.MacroRecorder.m_save_window.document.write("<textarea id='xml' rows='13' cols='44'></textarea>");
    MetaWrap.MacroRecorder.m_save_window.document.write("<input type='button' value='Load XML' onclick='window.opener.LoadAsXML(document)'>");
    
    MetaWrap.MacroRecorder.m_save_window.document.close();
}

// Register a loader
MetaWrap.MacroRecorder.registerLoader('Load As XML',MetaWrap.MacroRecorder.ControlPanel.Actions.load.xml,'Loads macro as an XML document');


//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel_actions_load_xml  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Load - Xml
 */ 