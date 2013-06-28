/*

    @file mw_lib_macro_recorder_event.js

    $Id: mw_lib_macrorecorder_event.js,v 1.9 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_event.js,v $
 * Revision 1.9  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:44  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.8  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.7  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.6  2006/05/06 10:02:43  james
 * Ready to start next phase of refactoring
 *
 * Revision 1.5  2006/05/06 09:33:03  james
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


/*! \page mw_javascript_lib_macrorecorder_event MetaWrap - JavaScript - MacroRecorder - Event
 *
 * \subsection mw_javascript_lib_macrorecorder_event Overview
 
 * \subsection mw_javascript_lib_macrorecorder_event Web Applications - Event Streams
 */

//alert("$Id: mw_lib_macrorecorder_event.js,v 1.9 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_event  MetaWrap - JavaScript - MacroRecorder - Event
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name  MetaWrap.MacroRecorder.Event Namespace */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.Page = function(p_type,p_time,p_location,p_button,p_x,p_y,p_key,p_alt,p_ctrl,p_shift,p_selection)
    @param      p_type
    @return     void 
    @brief      MetaWrap.MacroRecorder.Event Class
    @author     James Mc Parlane
    @date       6 September 2004
    
    This is just a namespace wrapper
*/    
MetaWrap.MacroRecorder.Event = function(p_type,p_time,p_location,p_button,p_x,p_y,p_key,p_alt,p_ctrl,p_shift,p_selection_start_location,p_selection_start,p_selection_end_location,p_selection_end,p_scroll_top,p_scroll_left,p_option_select)
{      
    return new MetaWrap_MacroRecorder_Event(p_type,p_time,p_location,p_button,p_x,p_y,p_key,p_alt,p_ctrl,p_shift,p_selection_start_location,p_selection_start,p_selection_end_location,p_selection_end,p_scroll_top,p_scroll_left,p_option_select);
}

/*!
    @fn         function MetaWrap_MacroRecorder_Event(p_type,p_time,p_location,p_button,p_x,p_y,p_key,p_alt,p_ctrl,p_shift,p_selection_start_location,p_selection_start,p_selection_end_location,p_selection_end,p_scroll_top,p_scroll_left)
    @param      p_type The event type
    @param      p_time The time (integer/ms) at which the event happens, relative to first event.
    @param      p_location  A string describing the location of the element . eg: document.HTML.BODY.DIV[1].P.INPUT
    @param      p_button The state of the button
    @param      p_x The X location of the mouse
    @param      p_y The Y location of the mouse
    @param      p_key The current keycode being pressed
    @param      p_alt True if the ALT key is being held down
    @param      p_ctrl True if the CTRL key is being held down
    @param      p_shift True if the SHIFT key is being held down
    @param      p_selection_start_location,p_selection_start,p_selection_end_location,p_selection_end An object that describes the curent text selection
    @param      p_scroll_top,p_scroll_left An object that describes the scroll offsets for the element sepcified by p_location
    @param      p_option_select A string that describes the 'selected' state for all OPTION elements under the SELECTION element described by p_location
    @return     void 
    @brief      Create a MetaWrap.MacroRecorder.Event object
    @author     James Mc Parlane
    @date       6 September 2004
*/
function MetaWrap_MacroRecorder_Event(p_type,p_time,p_location,p_button,p_x,p_y,p_key,p_alt,p_ctrl,p_shift,p_selection_start_location,p_selection_start,p_selection_end_location,p_selection_end,p_scroll_top,p_scroll_left,p_option_select)
{

    //document.title = p_scroll_top + " " + p_scroll_left;    

    // Make sure that p_key is not undefined
    if (!p_key)
    {
        p_key = 0;
    }

    // Make sure the location is not null
    if (!p_location)
    {
        p_location = "";
    }

    // Give p_button some sane values
    if ((!p_button) || (p_button == 65535))
    {
        p_button = 0;
    }

    if (!p_x)
    {
        p_x = 0;
    }

    if (!p_y)
    {
        p_y = 0;
    }

    if (!p_key)
    {
        p_key = 0;
    }

    if (!p_alt)
    {
        p_alt = 0;
    }

    if (!p_ctrl)
    {
        p_ctrl = 0;
    }

    if (!p_shift)
    {
        p_shift = 0;
    }

    if (!p_selection_start_location)
    {
        p_selection_start_location = "";
    }

    if (!p_selection_start)
    {
        p_selection_start = 0;
    }

    if (!p_selection_end_location)
    {
        p_selection_end_location = "";
    }

    if (!p_scroll_top)
    {
        p_scroll_top = 0;
    }

    if (!p_scroll_left)
    {
        p_scroll_left = 0;
    }

    // The name of the Event
    this.m_type = p_type;

    // The time (milliseconds relative to start of recording) of the event
    this.m_time = p_time;

    // The element location path the event
    this.m_location = p_location;

    // The mouse button combo
    this.m_button = p_button;

    // The clientX location of the mouse click in pixels
    this.m_x = p_x;

    // The clientX location of the mouse click in pixels
    this.m_y = p_y;

    // The current keycode
    this.m_key = p_key;

    // The state of alt key
    this.m_alt = p_alt;

    // The state of control key
    this.m_ctrl = p_ctrl;

    // The state of shift key
    this.m_shift = p_shift;

    // Scroll Top
    this.m_scroll_top = p_scroll_top;

    // Scroll Left
    this.m_scroll_left = p_scroll_left;

    // The location of the element at the start of the selection
    this.m_selection_start_location = p_selection_start_location;                
    
    // Selection start
    this.m_selection_start = p_selection_start;

    // The location of the element at the end of the selection
    this.m_selection_end_location = p_selection_end_location;                

    // Selection end
    this.m_selection_end = p_selection_end;
    
    
    // The option selected from interaction with a select box
    this.m_option_select = p_option_select;                        
   
    // return this object
    return this;
}


/*!
    @fn         function MetaWrap_MacroRecorder_Event_makeReal()    
    @return     Reference to a 'real' MetaWrap.Page.Event browser event
    @brief      Take the MetaWrap.MacroRecorder.Event and produce a MetaWrap.Page.Event
    @author     James Mc Parlane
    @date       6 September 2004
    
    A MetaWrap.Page.Event contains all the sugar required by the browser for a real
    event that in theory (security changes bah) can be injected into the browsers
    event stream.
*/
function MetaWrap_MacroRecorder_Event_makeReal()
{
    // Build a selection object to populate our 'real' event
    var l_selection = {};
    l_selection.m_start = this.m_selection_start;
    l_selection.m_end = this.m_selection_end;
    l_selection.m_start_location = this.m_selection_start_location;
    l_selection.m_end_location = this.m_selection_end_location;

    // Build a scroll object to populate our 'real' event
    var l_scroll = {};
    l_scroll.m_top = this.m_scroll_top;
    l_scroll.m_left = this.m_scroll_left;

    // Create a real event - scroll and option updates are stored in the MetaWRap
    return MetaWrap.Page.Event(this.m_type,this.m_x,this.m_y,this.m_ctrl,this.m_alt,this.m_shift,this.m_button,this.m_key,l_selection,l_scroll,this.m_option_select);
}

// Wire Up the methods
MetaWrap_MacroRecorder_Event.prototype.run = MetaWrap_MacroRecorder_Event_run;
MetaWrap_MacroRecorder_Event.prototype.toString = MetaWrap_MacroRecorder_Event_toString;
MetaWrap_MacroRecorder_Event.prototype.makeReal = MetaWrap_MacroRecorder_Event_makeReal;

/*!
    @fn         function MetaWrap_MacroRecorder_Event_run()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
function MetaWrap_MacroRecorder_Event_run()
{    
    // Turn this macro recorder event into a real browser event
    var l_event = this.makeReal();

    // If we managed to create one        
    if (l_event)
    {
        // Frighten an element by sending it the event    
        MetaWrap.Page.Event.Simulate.simulate(l_event,MetaWrap.Page.m_selection,MetaWrap.Page.m_scroll,this.m_type,this.m_location,this.m_option_select);            
    }
}

/*!
    @fn         function MetaWrap_MacroRecorder_Event_toString()
    @return     string 
    @brief      Return the string representation of the object
    @author     James Mc Parlane
    @date       6 September 2004
*/    
function MetaWrap_MacroRecorder_Event_toString()
{
    return    "\"" + this.m_type + "\"," +
              this.m_time + "," +
              "\"" + this.m_location + "\"," +
              this.m_button + "," +
              this.m_x + "," +
              this.m_y + "," +
              this.m_key + "," +
              this.m_alt + "," +
              this.m_ctrl + "," +
              this.m_shift + "," +
              "\"" + this.m_selection_start_location + "\"," + 
              this.m_selection_start + "," +
              "\"" + this.m_selection_end_location + "\"," + 
              this.m_selection_end + "," +
              this.m_scroll_top + "," +
              this.m_scroll_left + "," +
              this.m_option_select;                   
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_event  MetaWrap - JavaScript - MacroRecorder - Event
 */ 