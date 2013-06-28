/*

    @file mw_lib_macrorecorder_recording.js

    $Id: mw_lib_macrorecorder_recording.js,v 1.9 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_recording.js,v $
 * Revision 1.9  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:44  james
 * Added macro recorder
 *
 * Revision 1.16  2006/07/01 07:01:28  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.8  2006/07/01 06:59:05  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.7  2006/05/09 13:44:20  james
 * Can now create a set of tests
 *
 * Revision 1.6  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.5  2006/05/06 10:02:43  james
 * Ready to start next phase of refactoring
 *
 * Revision 1.4  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.3  2006/05/06 08:21:10  james
 * More refactoring
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
 */


/*! \page mw_javascript_lib_macrorecorder_recording MetaWrap - JavaScript - MacroRecorder - Recording
 *
 * \subsection mw_javascript_lib_macrorecorder_recording Overview
 */

//alert("$Id: mw_lib_macrorecorder_recording.js,v 1.9 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_recording  MetaWrap - JavaScript - MacroRecorder - Recording
 *@{
 */ 
 
//
// Ensure we have the namespaces we need
//
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.Serialise","mw_lib_xml_serialise.js");
MwUse("MetaWrap.Page","mw_lib_page.js");
MwUse("MetaWrap.Page.Event","mw_lib_page_event.js");
MwUse("MetaWrap.Page.Selection","mw_lib_page_selection.js");
MwUse("MetaWrap.Page.Event.Simulate","mw_lib_page_event_simulate.js");
MwUse("MetaWrap.MacroRecorder","mw_lib_macrorecorder.js");

//
// Now that we have the pre-requisite namespaces, then off we go
//
 
/*! @name  MetaWrap.MacroRecorder.Recording Namespace */
//@{

/*!
    @class      MetaWrap.MacroRecorder.Recording = function()
    @brief      Class for MetaWrap.MacroRecorder.Recording
    @author     James Mc Parlane
    @date       6 September 2004
*/  
MetaWrap.MacroRecorder.Recording = function()
{
    // Get the URL we are testing
    this.m_name = "Un-named Macro Recording";

    // A unique identfier for this macro
    this.m_id = 0;

    // Get the URL we are testing
    this.m_location = window.location.href;

    // Our collection of events
    this.m_pagestate = new Array();

    // Our collection of events
    this.m_events = new Array();
}

/*!
    @class      MetaWrap.MacroRecorder.ElementState = function(p_location,p_type,p_value)
    @param      p_location The location of the element we are saving state for
    @param      p_type The type of the element
    @param      p_value The value we have saved
    @brief      Class for MetaWrap.MacroRecorder.ElementState
    @author     James Mc Parlane
    @date       6 September 2004
*/  
MetaWrap.MacroRecorder.ElementState = function(p_location,p_type,p_value)
{
    // The location of the element
    this.m_location = p_location;

    // The location of the element
    this.m_type = p_type;

    // The value of this item
    this.m_value = p_value;
}

/*!
    @fn         MetaWrap.MacroRecorder.Recording.prototype.m_pagestate_create = function()
    @return		An ElementState object for storing PageState
    @brief      Wire up the constructor for the 'm_pagestate' array
    @author     James Mc Parlane
    @date       6 September 2004
*/  
MetaWrap.MacroRecorder.Recording.prototype.m_pagestate_create = function()
{
    var l_object = new MetaWrap.MacroRecorder.ElementState("","","");
    this.m_pagestate[this.m_pagestate.length] = l_object;
    return l_object;
}


/*!
    @fn         MetaWrap.MacroRecorder.Recording.prototype.m_events_create = function()
    @brief      Wire up the constructor for the 'm_events' array
    @author     James Mc Parlane
    @date       6 September 2004
*/ 
MetaWrap.MacroRecorder.Recording.prototype.m_events_create = function()
{
    var l_object = MetaWrap.MacroRecorder.Event();
    this.m_events[this.m_events.length] = l_object;
    return l_object;
}

/*!
    @fn         MetaWrap.MacroRecorder.Recording.prototype.savePageState = function(p_document)
    @param      p_document  The document that we are savign state for
    @brief      Wire up the constructor for the 'm_events' array
    @author     James Mc Parlane
    @date       6 September 2004
*/ 
MetaWrap.MacroRecorder.Recording.prototype.savePageState = function(p_document)
{
    // save the state of this document
    this.saveElementState(p_document.documentElement);
    
    // Find all the IFRAMEs    
    var l_iframes = p_document.getElementsByTagName("IFRAME");

    // Walk through all the IFRAMEs    
    for(var i = 0;i<l_iframes.length;i++)
    {
        // Find the window for this document
        var l_window = p_document.defaultView||p_document.parentWindow;
        
        // Find the frame based on its name from the IFRAME
        var l_frame = l_window.frames[l_iframes[i].name];
        
        // If this IFRAME is unhooked, then try and hook it and all its children
        this.savePageState(l_frame.document);
    }    
}

/*!
    @fn         MetaWrap.MacroRecorder.Recording.prototype.saveNodeState = function(p_node)
    @param      p_node  The node we are saving state for
    @brief      Wire up the constructor for the 'm_events' array
    @author     James Mc Parlane
    @date       6 September 2004
*/ 
MetaWrap.MacroRecorder.Recording.prototype.saveElementState = function(p_node)
{
    while(p_node != null)
    {
        // Get the node name
        var l_nn = p_node.nodeName;
    
        // These are the elements we are interested in
        if ((l_nn == "TEXTAREA") || (l_nn == "FRAME") || (l_nn == "IFRAME") || (l_nn == "INPUT") || (l_nn == "OPTION") || (l_nn == "SELECT"))
        {    
            // get the location
            var l_location = MetaWrap.getDOMLocationFromElement(p_node);
            
            var l_create = false;
            var l_value = "";
        
            switch(l_nn)
            {
                case "FRAME":        
                case "IFRAME":        
                    //alert(p_node.src);
                    l_value = p_node.src;
                    l_create = true;
                break;                
            
                case "TEXTAREA":        
                    l_value = p_node.value;
                    l_create = true;
                break;                
                
                case "OPTION":        
                    l_value = p_node.selected;
                    l_create = true;
                break;                
                
                case "INPUT":   
                    switch(p_node.type)
                    {
                        case "text":
                            l_value = p_node.value;
                            l_create = true;
                            
                        break;

                        case "checkbox":
                        case "radio":
                            l_value = p_node.checked;
                            l_create = true;                            
                        break;
                    }
                break;                                
            }
            
            // Make one if we got one
            if (l_create)
            {
                this.m_pagestate[this.m_pagestate.length] = new MetaWrap.MacroRecorder.ElementState(l_location,l_nn,l_value);
            }
        }
        
        // Have children?
        if (p_node.firstChild != null)
        {
            // Scan them..
            this.saveElementState(p_node.firstChild);
        }
    
        // get the next child
        p_node = p_node.nextSibling;  
    }    
}

/*!
    @fn         MetaWrap.MacroRecorder.Recording.prototype.loadPageState = function()
    @brief      Reload the page state
    @author     James Mc Parlane
    @date       6 September 2004
*/ 
MetaWrap.MacroRecorder.Recording.prototype.loadPageState = function()
{
    // Go through every item
    for(var l_item = 0;l_item < this.m_pagestate.length;l_item++)
    {
        // Get a reference to the pagestate
        var l_state = this.m_pagestate[l_item];
        
        // Get the element from the location string
        var l_element = MetaWrap.getDOMElementFromLocation(l_state.m_location);
        
        // If that element really exists
        if (l_element != null)
        {
            // Process it
            switch(l_state.m_type)
            {
                case "FRAME":        
                case "IFRAME":        
                    if (l_element.src != l_state.m_value)
                    {
                        l_element.src = l_state.m_value;
                    }
                break;                
            
                case "TEXTAREA":        
                    if (l_element.value != l_state.m_value)
                    {
                        l_element.value = l_state.m_value;
                    }
                break;                
                
                case "OPTION":  
                    if (l_element.selected != l_state.m_value)
                    {                  
                        l_element.selected = l_state.m_value;
                    }
                break;                
                
                case "INPUT":   
                    switch(l_element.type)
                    {
                        case "text":
                            if (l_element.value != l_state.m_value)
                            {                  
                                l_element.value = l_state.m_value;
                            }
                        break;

                        case "checkbox":
                        case "radio":
                            if (l_element.checked != l_state.m_value)
                            {                                      
                                l_element.checked = l_state.m_value;
                            }
                        break;
                    }
                break;                                
            }
        }        
    }
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_recording  MetaWrap - JavaScript - MacroRecorder - Recording 
 */ 
