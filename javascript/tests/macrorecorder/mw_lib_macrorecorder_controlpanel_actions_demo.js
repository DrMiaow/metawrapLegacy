/*

    @file mw_lib_macrorecorder_controlpanel_actions_demo.js

    $Id: mw_lib_macrorecorder_controlpanel_actions_demo.js,v 1.2 2006/09/21 05:19:37 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_actions_demo.js,v $
 * Revision 1.2  2006/09/21 05:19:37  james
 * Latest changes
 *
 * Revision 1.3  2006/09/20 02:47:25  james
 * Latest demo and mediamanager
 *
 * Revision 1.2  2006/09/18 08:37:03  james
 * Added latest macro recorder files...
 * Added macro recorder to index_demo.html
 *
 * Revision 1.1  2006/09/12 05:58:03  james
 * Latest release of the macro recorder
 *
 * Revision 1.1  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.5  2006/09/08 05:40:20  james
 * *** empty log message ***
 *
 * Revision 1.4  2006/09/08 05:38:40  james
 * Updated macro recorder demo mode
 *
 * Revision 1.3  2006/08/23 10:07:25  james
 * Added demo mode flow
 *
 * Revision 1.2  2006/08/23 05:27:39  james
 * added call to flash to signify demo mode
 *
 * Revision 1.1  2006/08/21 11:16:41  james
 * Added macro recorder
 *
 */


/*! \page mw_javascript_lib_macrorecorder_controlpanel_actions_demo MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - demo
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_demo Overview
 *
 * Plays a pre-recorded demo loop from the file macro.xml
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_demo Web Applications - Event Streams
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel_actions_demo.js,v 1.2 2006/09/21 05:19:37 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel_actions_demo  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - demo
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name MetaWrap.MacroRecorder.ControlPanel.Actions.demo Namespace */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.demo = function()
    @return     void 
    @brief      Impelements the demo control panel plugin
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Find another way to add this 
    @todo       Get the event started from main class
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.demo = function()
{
    var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel");        
    
    //l_element.style.visibility = "hidden";

	// before flash can run, set demo mode to be true
	g_demo_mode = true;
    
    // unhide everything - should start flash going
    //start();
    
    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();
    var l_xml_document = new MetaWrap.XML.Document();
    
    
    if (MetaWrap.XML.Document.Request(l_xml_document,l_xml_request,"./macro.xml","GET",false,false))
    {
        // load the macro    
        MetaWrap.MacroRecorder.m_recording = MetaWrap.XML.Deserialise(l_xml_document.xml,new MetaWrap.MacroRecorder.Recording());
        
        // display the demo total
        MetaWrap.MacroRecorder.ControlPanel.updateStatus();
    }
    

    // loop it    
    MetaWrap.MacroRecorder.m_loop = true;

    // play it    
    MetaWrap.MacroRecorder.startPlaying();    
    
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.demo.reset = function()
    @return     void 
    @brief      Resets the demo state
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Find another way to add this 
    @todo       Get the event started from main class
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.demo.reset = function()
{
    var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Actions.demo");        
    l_element.innerHTML = "[demo]";
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel_actions_demo  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Load
 */ 