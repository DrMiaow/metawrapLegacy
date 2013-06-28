/*

    @file mw_lib_page_event_simulate.js

    $Id: mw_lib_page_event_simulate.js,v 1.60 2007/07/30 08:25:04 james Exp $

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
 * $Log: mw_lib_page_event_simulate.js,v $
 * Revision 1.60  2007/07/30 08:25:04  james
 * Getting macro recordre to work with panasonic iBrowser
 *
 * Revision 1.59  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:45  james
 * Added macro recorder
 *
 * Revision 1.58  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.57  2006/06/04 14:40:14  james
 * Latest update to testcases
 *
 * Revision 1.56  2006/06/01 12:04:41  james
 * Fixed issue with order of selection
 *
 * Revision 1.55  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.54  2006/05/17 11:48:29  james
 * Macro recorder fixes
 *
 * Revision 1.53  2006/05/09 10:04:56  james
 * 'jsunit' is taken - now called 'tester'
 *
 * Revision 1.52  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.51  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.50  2006/05/06 08:08:46  james
 * More code tidy up.
 * Getting control panel to implement the visitor class.
 *
 * Revision 1.49  2006/05/03 13:11:33  james
 * Working on getting tester testing framework up and running again.
 *
 * Revision 1.48  2006/05/02 14:09:15  james
 * Editing all now good and propper
 *
 * Revision 1.47  2006/05/01 13:40:04  james
 * Single text input is working.
 * Next - need to get highlighted text input working
 *
 * Revision 1.46  2006/04/24 13:46:26  james
 * *** empty log message ***
 *
 * Revision 1.45  2006/04/24 11:58:38  james
 * *** empty log message ***
 *
 * Revision 1.44  2006/04/24 11:02:08  james
 * Tidied up code
 *
 * Revision 1.43  2006/04/23 13:39:52  james
 * Added better playback syn to recodred speed, and a fast playback option
 *
 * Revision 1.42  2006/04/23 09:48:44  james
 * Document selection now working and consistent
 *
 * Revision 1.41  2006/04/23 06:41:41  james
 * Getting page select working
 *
 * Revision 1.40  2006/04/22 23:53:32  james
 * Better dropdown playback in mozilla
 *
 * Revision 1.39  2006/04/22 14:02:49  james
 * Working on in browser detection now
 *
 * Revision 1.38  2006/04/22 12:45:12  james
 * *** empty log message ***
 *
 * Revision 1.37  2006/04/22 12:43:57  james
 * dropdowns and multiple selects can record and playback now
 *
 * Revision 1.36  2006/04/22 06:15:42  james
 * Getting option/select working
 *
 * Revision 1.35  2006/04/21 02:28:45  james
 * Mouse pointer now tracks scroll
 *
 * Revision 1.34  2006/04/18 07:59:54  james
 * Got scrolling working on playback - now for document wide selection
 *
 * Revision 1.33  2006/04/18 06:34:45  james
 * Expanded macro format to allow for end selections
 *
 * Revision 1.32  2006/04/09 14:02:12  james
 * Getting in page selection happening
 *
 * Revision 1.31  2006/04/09 06:26:38  james
 * Fixed issue in Mozilla where select event does not always get focus
 *
 * Revision 1.30  2006/04/09 06:19:07  james
 * Got selection playback working within TEXTAREA and INPUT
 *
 * Revision 1.29  2006/04/07 13:18:20  james
 * Got whole window scrolling working in FireFox/Mozilla
 * Tidied up code
 *
 * Revision 1.28  2006/04/07 08:48:51  james
 * *** empty log message ***
 *
 * Revision 1.27  2006/03/30 07:37:44  james
 * *** empty log message ***
 *
 * Revision 1.26  2006/03/29 06:41:23  james
 * Latest macro recorder
 *
 * Revision 1.25  2006/03/29 03:17:35  james
 * Fixed bug in detecting sub frames
 * Starting adding keyboard input
 *
 * Revision 1.24  2006/03/28 12:30:23  james
 * One bug remaining - when an IFRAME is loaded with an href, its not being loaded
 * into a new frame object
 *
 * Revision 1.23  2006/03/25 06:20:16  james
 * Moved onclick into generic handlers
 *
 * Revision 1.22  2006/03/25 05:56:52  james
 * generic example handler
 *
 * Revision 1.21  2006/03/25 05:35:51  james
 * Added generic event handlers
 *
 * Revision 1.20  2006/03/25 05:17:23  james
 * Added example element/event handler to handle
 * the target/href for the simulation of a click on an
 * A element.
 *
 * Revision 1.19  2006/03/25 04:39:24  james
 * Made macro recorder more stable
 * Made event hooks multiple document aware
 * Added per element/event event handlers for simulation
 *
 * Revision 1.18  2006/03/21 07:11:06  james
 * Tidy up of code
 * Fixed issue under Firefox with mouse animation
 *
 * Revision 1.17  2006/03/07 06:51:48  lela
 * onKeypress inserts text into INPUT for:
 * - empty input field
 * - insert point at end of existing text
 * - insert point within existing text
 *
 * Fails for:
 * - insert point at start of field with existing text
 *
 * Revision 1.16  2006/03/03 02:59:37  lela
 * Simulate keypress event for INPUT text fields in IE.
 *
 * Revision 1.15  2006/03/02 06:13:25  lela
 * Playback text selection
 *
 * Revision 1.14  2006/03/02 05:53:34  james
 * Doh! Fixed issue in passing selection from module to module
 *
 * Revision 1.13  2006/03/02 02:57:22  james
 * Starting on selection playback
 *
 * Revision 1.12  2006/02/27 12:58:38  james
 * Experimenting with javascript text selection
 *
 * Revision 1.11  2006/02/26 13:48:20  james
 * Added mouse activity and keyboard activity icons to macro recorder
 *
 * Revision 1.10  2006/02/06 07:56:55  james
 * Renamed variables to be consistent with naming standard.
 *
 * Revision 1.9  2006/02/06 07:01:05  lela
 * Added "ghost cursor" to display mousemove on Macro playback.
 *
 * Revision 1.8  2006/02/06 04:14:59  james
 * Adding event simulation to MetaWrap.Page.Event
 *
 * Revision 1.7  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.6  2005/08/22 13:35:52  james
 * Working out what key codes can be sent.
 *
 * Revision 1.5  2005/08/21 15:10:47  james
 * Getting middle level events working
 * in Firefox.
 *
 * Revision 1.4  2005/08/21 13:53:24  james
 * Managed to completely simulate middle layer.
 * Front end layer is obviously not driven by this
 * so now need to simulate this top level layer.
 *
 * Revision 1.3  2005/08/20 06:26:03  james
 * Now able to simulate events under both IE and Firefox
 *
 * Revision 1.2  2005/08/13 15:28:38  james
 * getting macro playback happening
 *
 * Revision 1.1  2005/08/03 08:33:57  james
 * Adding event simulation code.
 * Added some timple javascript profiling tests
 *
 */


/*! \page mw_javascript_lib_page_event_simulate MetaWrap - JavaScript - Page -  Event - Simulate
 *
 */

//alert("$Id: mw_lib_page_event_simulate.js,v 1.60 2007/07/30 08:25:04 james Exp $");

/*! \defgroup mw_javascript_lib_page_event_simulate  MetaWrap - JavaScript - Page -  Event - Simulate
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");
MwUse("MetaWrap.Page.Event","mw_lib_page_event.js");

/*! @name  MetaWrap.Page.Event.Simulate */
//@{

/*! @namespace  MetaWrap.Page.Event.Simulate */
MetaWrap.Page.Event.Simulate = new Object()

/*! @brief Simulation mode

    0 = Send raw events and hope that the browser will let them through
    1 = Simulate only the events that don't work on the browser
    2 = Simulate everything.
*/
MetaWrap.Page.Event.Simulate.m_mode = 1;

MetaWrap.Page.Event.Simulate.m_x = 0;
MetaWrap.Page.Event.Simulate.m_y = 0;
MetaWrap.Page.Event.Simulate.m_keyCode = null;
MetaWrap.Page.Event.Simulate.m_charCode = null;
MetaWrap.Page.Event.Simulate.m_key = 0;
MetaWrap.Page.Event.Simulate.m_ctrl = false;
MetaWrap.Page.Event.Simulate.m_alt = false;
MetaWrap.Page.Event.Simulate.m_shift = false;

MetaWrap.Page.Event.Simulate.m_previous_focus_element = null;



MetaWrap.Page.Event.Simulate.Scroll = {};
MetaWrap.Page.Event.Simulate.Scroll.m_left = 0;
MetaWrap.Page.Event.Simulate.Scroll.m_top = 0;

/*! @brief SELECT/OPTION mask - tells us which OPTIONS are selected for the current SELECT*/
MetaWrap.Page.Event.Simulate.Scroll.m_option_select = "";

/*! @brief Document and TEXTAREA/INPUT selection, including */
MetaWrap.Page.Event.Simulate.Selection = {};
MetaWrap.Page.Event.Simulate.Selection.m_start = 0;
MetaWrap.Page.Event.Simulate.Selection.m_end = 0;
MetaWrap.Page.Event.Simulate.Selection.m_start_location = "";
MetaWrap.Page.Event.Simulate.Selection.m_end_location = "";

MetaWrap.Page.Event.Simulate.Selection.e_null = 0; // nothing is selected
MetaWrap.Page.Event.Simulate.Selection.e_empty = 1; // selection box is empty [   ]
MetaWrap.Page.Event.Simulate.Selection.e_end = 2; // the cursor is at the end of the text [XXX|   ]
MetaWrap.Page.Event.Simulate.Selection.e_start = 3; // the cursor is at the start of the text [|XXX   ]
MetaWrap.Page.Event.Simulate.Selection.e_middle = 4; // the cursor is in the middle of the text [X|XX   ]
MetaWrap.Page.Event.Simulate.Selection.e_end_high = 5; // The start of some text is highlighted [(XX)X   ]
MetaWrap.Page.Event.Simulate.Selection.e_start_high = 6; // The end of some text is highlighted [XX(X)   ]
MetaWrap.Page.Event.Simulate.Selection.e_middle_high = 7; // The middle of some text is highlighted [X(X)X   ]
MetaWrap.Page.Event.Simulate.Selection.e_all_high = 8; // All of the text is highighted

MetaWrap.Page.Event.Simulate.Selection.m_state = MetaWrap.Page.Event.Simulate.Selection.e_empty;
MetaWrap.Page.Event.Simulate.Selection.m_changed = true; // If this is true then our selection has changed from the one in PreviousSelection

/*! @brief Store Previous selection info so we know */
MetaWrap.Page.Event.Simulate.PreviousSelection = {};
MetaWrap.Page.Event.Simulate.PreviousSelection.m_start = 0;
MetaWrap.Page.Event.Simulate.PreviousSelection.m_end = 0;
MetaWrap.Page.Event.Simulate.PreviousSelection.m_start_location = "";
MetaWrap.Page.Event.Simulate.PreviousSelection.m_end_location = "";


/*! @brief Mouse cursor */
MetaWrap.Page.Event.Simulate.m_cursor = null;
MetaWrap.Page.Event.Simulate.m_show_cursor = false;

MetaWrap.Page.Event.Simulate.m_show_activity_icons = true;

/*! @brief Mouse activity icons */
MetaWrap.Page.Event.Simulate.m_mouse_activity_icon = null;
MetaWrap.Page.Event.Simulate.m_show_mouse_activity_icon = false;

/*! @brief Keyboard activity icon */
MetaWrap.Page.Event.Simulate.m_keyboard_activity_icon = null;
MetaWrap.Page.Event.Simulate.m_keyboard_activity_icon = false;

// Container for handler
MetaWrap.Page.Event.Simulate.handlers = {};

/*! @brief Mouse cursor */
MetaWrap.Page.Event.Simulate.m_keycodes = new Array();



/*!
    @fn         MetaWrap.Page.Event.Simulate.simulate = function(p_event,p_type,p_location)
    @param      p_event
    @param      p_type
    @param      p_location
    @return     void
    @brief      Simulate an event
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Simulate.simulate = function(p_event,p_selection,p_scroll,p_type,p_location,p_option_select)
{
    // If we have a valid event
    if (p_event)
    {

        // If we fail to create an event then report an error and flee
        if (p_event == null)
        {
            error("MetaWrap.Page.Event.Simulate.simulate: unable to create event " + p_type);
            return;
        }

        // Pop the event into an elert box if we are in debug mode
        //MetaWrap.Page.Event.Dump(p_event,"Simulated event to " + p_location);

        // Take our location string and map it into an element
        var l_element = MetaWrap.getDOMElementFromLocation(p_location);

        // If we fail to find it, report error and flee
        if (l_element == null)
        {
            //error("MetaWrap.Page.Event.Simulate.simulate: unknown element " + p_location + " for event " + p_type);
            //return;

            // map it into the document body so we save things like onkey events
            l_element = document.body;
        }

        switch(this.m_mode)
        {
            // 0 = Send raw events and hope that the browser will let them through
            case 0:
            {
                // Send the event
                MetaWrap.Page.Event.send(p_event,l_element,p_type);
                break;
            }

            // 1 = Simulate only the events that don't work on the browser
            case 1:
            {
                // Unpack the event into the local namespace - this.m_x, this.m_y etc..
                this.unpack(p_event,l_element,p_selection,p_scroll,p_option_select);


                // This is a big kludgey - but only becuase of browser behavior
                if (l_element.nodeName == "SELECT")
                {
                    /*
                     *  No matter what event, if we have a mask for what OPTION
                     *  elements should be selected, then make sure its selected.
                     *  The selection of the options is not finalised till we
                    */

                    this.doOptionSelection();
                }

                // Make sure that if we have something that should be selected in the page, that it is selected
                if (this.Selection.m_start_location != "")
                {
                    this.doTextSelection();
                }

                // Call the event specific handler
                var l_handler = MetaWrap.Page.Event.Simulate.handlers[p_event.type];
                if (l_handler)
                {
                    // Call the element specific handler with the target element
                    MetaWrap.doCall(l_handler,l_element,p_event);
                }

                // Simulate this event being fired and handle each element/event pair


                switch(p_type)
                {
                    // Security changes made these impossible to simulate properly - but we try
                    case "keydown":
                    case "keyup":
                    case "keypress":
                        MetaWrap.Page.Event.Simulate.eventPropagation(p_event,l_element);
                    break;

                    default:
                        MetaWrap.Page.Event.send(p_event,l_element,p_type);
                    break;
                }



                break;
            }

            // 2 = Simulate only the events that don't work on the browser
            case 2:
            {
                // Unpack the event into the local namespace - this.m_x, this.m_y etc..
                this.unpack(p_event,l_element,p_selection,p_scroll,p_option_select);


                // This is a big kludgey - but only becuase of browser behavior
                if (l_element.nodeName == "SELECT")
                {
                    /*
                     *  No matter what event, if we have a mask for what OPTION
                     *  elements should be selected, then make sure its selected.
                     *  The selection of the options is not finalised till we
                    */

                    this.doOptionSelection();
                }

                // Make sure that if we have something that should be selected in the page, that it is selected
                if (this.Selection.m_start_location != "")
                {
                    this.doTextSelection();
                }

                // Call the event specific handler
                var l_handler = MetaWrap.Page.Event.Simulate.handlers[p_event.type];
                if (l_handler)
                {
                    // Call the element specific handler with the target element
                    MetaWrap.doCall(l_handler,l_element,p_event);
                }

                // Simulate this event being fired and handle each element/event pair
                MetaWrap.Page.Event.Simulate.eventPropagation(p_event,l_element);
                //MetaWrap.Page.Event.send(p_event,l_element,p_type);

                break;
            }
        }

        // Visualise our simulation
        this.visualise();

    }
    else
    {
        alert("MetaWrap.Page.Event.Simulate.simulate: '" + p_type + "' event at '" + p_location + "' was null");
    }
}


/*!
    @fn         MetaWrap.Page.Event.Simulate.visualise = function()
    @param      p_event
    @param      p_type
    @param      p_location
    @return     void
    @brief      Simulate an event
    @author     James Mc Parlane
    @date       6 September 2004

    See:
    http://www.quirksmode.org/js/findpos.html
*/
MetaWrap.Page.Event.Simulate.visualise = function()
{
    var l_window_offset_x = 0;
    var l_window_offset_y = 0;

    // If this event is in a different window - then we have an issue
    // and need to find the relative location of the window
    if (this.m_window != window)
    {
        var l_window = this.m_window;
        while(l_window != window)
        {
            // Get the element that this window is embedded in
            var l_window_frameelement = l_window.frameElement;

            ASSERT(l_window_frameelement,"l_window_frameelement is null")

            var l_obj = l_window_frameelement;
            var l_y = 0;
            var l_x = 0;
            if (l_obj.offsetParent)
            {
                while (l_obj.offsetParent)
                {
                    l_y += l_obj.offsetTop
                    l_x += l_obj.offsetLeft
                    l_obj = l_obj.offsetParent;
                }
            }
            else
            {
                if (l_obj.x)
                {
                    l_x += l_obj.x;
                }
                if (l_obj.y)
                {
                    l_y += l_obj.y;
                }
            }


            // Get the offset for this element
            l_window_offset_x += l_x;
            l_window_offset_y += l_y;

            // get the document that l_window_frameelement is in
            var l_document = l_window_frameelement.ownerDocument||l_window_frameelement.parentWindow.document;

            // From that we can get the window
            l_window = l_document.defaultView || l_document.parentWindow;
        }
   }

    // if we need to show the mouse cursor - then show it
    if (this.m_show_cursor)
    {
        if (this.m_cursor)
        {
            this.m_cursor.style.display = "block";
            this.m_cursor.style.left = (l_window_offset_x + this.m_x + this.m_window.document.documentElement.scrollLeft) + "px";
            this.m_cursor.style.top = (l_window_offset_y + this.m_y + this.m_window.document.documentElement.scrollTop) + "px";
        }
    }

    if (this.m_show_activity_icons)
    {

        var l_show = "none";

        // if we need to show the mouse activity icon  - then show it
        if (this.m_mouse_activity_icon)
        {
            // if we need to show the keyboard activity icon  - then show it
            if (this.m_show_mouse_activity_icon)
            {
                l_show = "block";
            }
            else
            {
                l_show = "none";
            }

            this.m_mouse_activity_icon.style.display = l_show;
        }


        if (this.m_keyboard_activity_icon)
        {
            // if we need to show the keyboard activity icon  - then show it
            if (this.m_show_keyboard_activity_icon)
            {
                l_show = "block";
            }
            else
            {
                l_show = "none";
            }

            this.m_keyboard_activity_icon.style.display = l_show;
        }

    }
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.unpack = function(p_event,p_element,p_selection,p_scroll)
    @param      p_event The event being unpacked
    @param      p_element The element the event occurs on
    @param      p_selection The test selection
    @return     void
    @brief      Unpack the event and get out the bits we need on per browser basis...
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Simulate.unpack = function(p_event,p_element,p_selection,p_scroll,p_option_select)
{
    this.m_event = p_event;
    this.m_element = p_element;

    ASSERT(this.m_element,"this.m_element == null");

    // In Mozilla if p_element is a document then its ownerDocument is null
    if (p_element.nodeName == "#document")
    {
        this.m_document = p_element;
    }
    else
    {
        this.m_document = p_element.ownerDocument||p_element.parentWindow.document;
    }

    this.m_window = this.m_document.defaultView||this.m_document.parentWindow;

    // fake the parent member for events
    var l_window_frameelement = this.m_window.frameElement;
    if (l_window_frameelement)
    {
        var l_document = l_window_frameelement.ownerDocument||l_window_frameelement.parentWindow.document;
        this.m_element.parent = l_document.defaultView || l_document.parentWindow;
    }

    this.m_x = p_event.clientX;
    this.m_y = p_event.clientY;
    this.m_keyCode = p_event.keyCode;
    this.m_charCode = p_event.charCode;

    this.m_key = this.m_charCode | this.m_keyCode;

    this.m_ctrl = p_event.ctrlKey;
    this.m_alt = p_event.altKey;
    this.m_shift = p_event.shiftKey;

    // Selection range
    this.Selection.m_start = p_selection.m_start;
    this.Selection.m_end = p_selection.m_end;
    this.Selection.m_start_location = p_selection.m_start_location;
    this.Selection.m_end_location = p_selection.m_end_location;

    this.Scroll.m_top = p_scroll.m_top;
    this.Scroll.m_left = p_scroll.m_left;

    this.m_option_select = p_option_select;

    //
    // Work out if the selection has changed
    //


    // lets assume that the selection has not changed
    this.Selection.m_changed = false; // If this is true then our selection has changed from the one in PreviousSelection

    // Only track changes for non empty selections
    if (this.Selection.m_start_location != "")
    {
        var l_current = this.Selection;
        var l_previous = this.PreviousSelection;

        if (l_previous.m_start != l_current.m_start)
        {
            this.Selection.m_changed  |= true;
            l_previous.m_start = l_current.m_start;
        }

        if (l_previous.m_end != l_current.m_end)
        {
            this.Selection.m_changed  |= true;
            l_previous.m_end = l_current.m_end;
        }

        if (l_previous.m_start_location != l_current.m_start_location)
        {
            this.Selection.m_changed  |= true;
            l_previous.m_start_location = l_current.m_start_location;
        }

        if (l_previous.m_end_location != l_current.m_end_location)
        {
            this.Selection.m_changed  |= true;
            l_previous.m_end_location = l_current.m_end_location;
        }
    }
}


/*!
    @fn         function MetaWrap_Page_Element_eventPropagation(p_event)
    @param      p_event The event that we are processing
    @return     void
    @brief      This simulates event propogation
    @author     James Mc Parlane
    @date       6 September 2005
*/
MetaWrap.Page.Event.Simulate.eventPropagation = function(p_event,p_element)
{
    // This will store the resultant elements for bubbling
    var l_bubbling_elements = [];

    /*
        Recurse the element tree all the way to the bottom, firing off any capture
        events that we have and return a list of elements in the correct order to
        execute a bubbling run.
    */
    MetaWrap.Page.Event.Simulate.recurseElementsAndCapture(p_event,p_element,l_bubbling_elements);

    // If nothing cancelled bubbling - then bubble..
    if (!p_event.cancelBubble)
    {
        // Now l_bubbling_elements contains a list of all the events that we should bubble....
        for(var i = 0;i<l_bubbling_elements.length;i++)
        {
            // Even if an event is captured or bubbles up, the target/srcElement always remains the element the event took place on.
            var l_listener = l_bubbling_elements[i]["on"+p_event.type];
            if (l_listener)
            {
                // Even if an event is captured or bubbles up, the target/srcElement always remains the element the event took place on.
                MetaWrap.doCall(l_listener,l_bubbling_elements[i],p_event);
            }

            // If someone wants out - then leave
            if (p_event.cancelBubble)
            {
                // then we break out of the bubbling loop
                break;
            }
        }
    }

    // Now - 'officialy' Stop all bubbling - because we just faked it perfectly (cross fingers)

    // The W3C way?
    if (p_event.stopPropagation)
    {
        p_event.stopPropagation();
    }
    else
    {
        // The IE way
        p_event.cancelBubble = true;
    }

}


/*!
    @fn         MetaWrap.Page.Event.Simulate.recurseElementsAndCapture = function (p_element,p_event,p_bubbling_elements)
    @param      p_element
    @param      p_event
    @param      p_bubbling_elements An array that we will place referenced to elements to be later bubbled into.
    @return     void
    @brief      Bubbles up to the document root, adding referenced to p_bubbling_elements as it goes, on the way back it calls capture listeners
    @author     James Mc Parlane
    @date       6 September 2005
*/
MetaWrap.Page.Event.Simulate.recurseElementsAndCapture = function (p_event,p_element,p_bubbling_elements)
{
    // Remember this for bubbling back up
    p_bubbling_elements[p_bubbling_elements.length] = p_element;

    // Recurse deeper
    if ((p_element != null) && (p_element.parentNode != null))
    {
        MetaWrap.Page.Event.Simulate.recurseElementsAndCapture(p_event,p_element.parentNode,p_bubbling_elements);
    }

    var l_listener = p_element["on"+p_event.type];
    if (l_listener)
    {
        // Even if an event is captured or bubbles up, the target/srcElement always remains the element the event took place on.
        MetaWrap.doCall(l_listener,p_element,p_event);
    }


    // see if there is node/event specific handler added
    var l_handler = MetaWrap.Page.Event.Simulate.handlers[p_element.nodeName + "_" + p_event.type];
    if (l_handler)
    {
        // Call the element/event specific handler
        MetaWrap.doCall(l_handler,p_element,p_event);
    }

}

/*!
    @fn         MetaWrap.Page.Event.Simulate.doOptionSelection = function(p_element)
    @return     void
    @brief      Simulate text selection
    @author     James Mc Parlane
    @date       16 April 2006
*/
MetaWrap.Page.Event.Simulate.doOptionSelection = function()
{
    /*
        IE Gets this for all selection boxes
        Mozilla only gets it for non-multiple select boxes
        For multiple select boxes Mozilla is able to process
        down to the option level and track each mouse click.
        In IE the option is never reported from.
    */
    if (this.m_option_select != "")
    {
        var l_selected = false;
        for(var i = 0;i<this.m_option_select.length;i++)
        {
            var l_option = this.m_element.options[i];

            // We want this one selected
            if (this.m_option_select.charAt(i) == '1')
            {
                // Select if its not been selected before
                if (!l_option.selected)
                {
                    l_option.selected = true;
                }

                l_selected = true;
            }
            else
            // We want this one de-selected
            {
                // Select if its ot been selected before
                if (l_option.selected)
                {
                    l_option.selected = false;
                }
            }
        }
    }
}


/*!
    @fn         MetaWrap.Page.Event.Simulate.determineSelectionState = function()
    @return     void
    @brief      Work our which part of the TEXTAREA or INPUT is selected
    @author     James Mc Parlane
    @date       16 April 2006

*/
MetaWrap.Page.Event.Simulate.determineSelectionState = function(p_element)
{
    // get a shorthand reference to the scroll object
    var l_sel = MetaWrap.Page.Event.Simulate.Selection;

    if (l_sel.m_start == l_sel.m_end)
    {
        // Single cursor point

        // If there any content?
        if (p_element.value.length == 0)
        {
            // No ? then we start empty
            l_sel.m_state = l_sel.e_empty;
        }
        else
        // are we at the start?
        if (l_sel.m_start == 0)
        {
            l_sel.m_state = l_sel.e_start;
        }
        else
        // are we at the end?
        if (l_sel.m_end == p_element.value.length)
        {
            l_sel.m_state = l_sel.e_end;
        }
        else
        // we must be in the middle
        {
            l_sel.m_state = l_sel.e_middle;
        }

    }
    else
    {
        // highlighted text 'painted'

        // Have we selected everything?
        if ((l_sel.m_start == 0) && (l_sel.m_end == p_element.value.length))
        {
            l_sel.m_state = l_sel.e_all_high;
        }
        else
        // are we at the start?
        if (l_sel.m_start == 0)
        {
            l_sel.m_state = l_sel.e_start_high;
        }
        else
        // are we at the end?
        if (l_sel.m_end == p_element.value.length)
        {
            l_sel.m_state = l_sel.e_end_high;
        }
        // we must be in the middle
        else
        {
            l_sel.m_state = l_sel.e_middle_high;
        }

    }
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.doTextSelection = function()
    @return     void
    @brief      Simulate text selection
    @author     James Mc Parlane
    @date       16 April 2006
*/
MetaWrap.Page.Event.Simulate.doTextSelection = function()
{
    // get a shorthand reference to the scroll object
    var l_sel = this.Selection;


    if ((l_sel.m_start_location != "") && (l_sel.m_changed))
    {
        // null selection
        l_sel.m_state = l_sel.e_null;

        // Make sure the node resolves to something we can interact with
        var l_node = MetaWrap.getDOMElementFromLocation(l_sel.m_start_location);

        // If we have a node
        if (l_node)
        {
            // Are we selecting inside a TEXTAREA or INPUT element?
            if ((l_node.nodeName == "TEXTAREA") || ((l_node.nodeName == "INPUT") && (l_node.type == "text")))
            {
                //alert("MetaWrap.Page.Event.Simulate.handlers.select " + l_sel.m_start + ":" + l_sel.m_end);
                var l_selection_element = MetaWrap.getDOMElementFromLocation(l_sel.m_start_location);

                if (l_selection_element)
                {
                    //  Work our which part of the TEXTAREA or INPUT is selected
                    this.determineSelectionState(l_selection_element);

                    // The Mozilla way
                    if (l_selection_element.setSelectionRange)
                    {
                        l_selection_element.focus();
                        l_selection_element.setSelectionRange(l_sel.m_start, l_sel.m_end);
                    }
                    else
                    // The IE Way..
                    if (l_selection_element.createTextRange)
                    {
                        var l_range = l_selection_element.createTextRange();

                        l_range.collapse(true);
                        l_range.moveStart("character",l_sel.m_start);
                        l_range.moveEnd("character",l_sel.m_end - l_sel.m_start);

                        l_range.select();
                    }
                }
                else
                {
                    error("Unable to resolve " + l_sel.m_location);
                }
            }
            else
            {
                // get a reference to the element
                var l_body = MetaWrap.getDOMElementFromLocation("document.HTML.BODY");

                // The IE Way..
                if (l_body.createTextRange)
                {
                    // IE Style
                    var l_range = l_body.createTextRange();

                    l_range.collapse();
                    l_range.moveStart('character',l_sel.m_start);

                    l_range.moveEnd('character',l_sel.m_end-l_sel.m_start);

                    // make the selection
                    l_range.select();
                }
                else
                // The Mozilla way
                {
                    var l_start_node = MetaWrap.getDOMElementFromLocation(l_sel.m_start_location);
                    var l_end_node = MetaWrap.getDOMElementFromLocation(l_sel.m_end_location);

                    var l_range = this.m_document.createRange();
                    l_range.collapse(true);

					// if this is the same node, make sure we select in the correct order
					if ((l_start_node == l_end_node) && (l_sel.m_start > l_sel.m_end))
					{
		                l_range.setStart(l_end_node,l_sel.m_end);
	                    l_range.setEnd(l_start_node,l_sel.m_start);

	                }
	                else
					{
						// if its a different node, deal with the problem that
						// setStart/setEnd will throw an error if l_start_node and
						// l_end_node are in the wrong order
						try
						{
		                    l_range.setStart(l_start_node,l_sel.m_start);
			                l_range.setEnd(l_end_node,l_sel.m_end);
		                }
		                catch(l_e)
		                {
		                    l_range.setEnd(l_start_node,l_sel.m_start);
			                l_range.setStart(l_end_node,l_sel.m_end);
		                }
	                }

                    var l_selection = this.m_window.getSelection();

                    l_selection.removeAllRanges();

                    l_selection.addRange(l_range);
                }
            }
        }
    }
}



/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.mousedown = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_element This element the mouse event is linked to
    @return     void
    @brief      Simulate 'mousedown' event on all elements
    @author     James Mc Parlane
    @date       6 September 2004

    Mozilla seems to need explicit blur/focus
*/
MetaWrap.Page.Event.Simulate.handlers.mousedown = function(p_event)
{
    var l_prev = MetaWrap.Page.Event.Simulate.m_previous_focus_element;


    // If we have a previous element that is not this element
    if (l_prev != null)
    {
        // If we have a previous element that is not this element
        if (l_prev != this)
        {
            //  Blur the old
            if (l_prev.blur)
            {
	            l_prev.blur();
		    }

            // focus the new
            if (this.focus != null)
            {
        	    this.focus();
			}
        }
    }
    else
    {
        // focus the new
        if (this.focus != null)
        {
        	this.focus();
		}
    }

    // This is our new focus
    MetaWrap.Page.Event.Simulate.m_previous_focus_element = this;
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.scroll = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_element This element the mouse event is linked to
    @return     void
    @brief      Simulate 'scroll' event on all elements
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Simulate.handlers.scroll = function(p_event)
{
    var l_sim = MetaWrap.Page.Event.Simulate;

    // get a shorthand reference to the scroll object
    var l_scr = l_sim.Scroll;


    if (l_scr.m_top != this.scrollTop)
    {
        this.scrollTop = l_scr.m_top;
    }

    if (this.scrollLeft != l_scr.m_left)
    {
        this.scrollLeft = l_scr.m_left;
    }


    l_sim.m_show_cursor = true;
    l_sim.m_show_mouse_activity_icon = true;
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.keyup = function(p_event)
    @param      this The current element that the 'keyup' event is firing against
    @param      p_event
    @return     void
    @brief      Simulate mouse movement
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Simulate.handlers.keyup = function(p_event)
{
    var l_sim = MetaWrap.Page.Event.Simulate;
    l_sim.m_show_cursor = false;
    l_sim.m_show_mouse_activity_icon = false;
    l_sim.m_show_keyboard_activity_icon = false;
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.keydown = function(p_event)
    @param      this The current element that the 'keydown' event is firing against
    @param      p_event
    @return     void
    @brief      Simulate mouse movement
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Simulate.handlers.keydown = function(p_event)
{
    var l_sim = MetaWrap.Page.Event.Simulate;
    l_sim.m_show_cursor = false;
    l_sim.m_show_mouse_activity_icon = false;
    l_sim.m_show_keyboard_activity_icon = true;

    //alert("MetaWrap.Page.Event.Simulate.handlers.keydown");
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.keypress = function(p_event)
    @param      this The current element that the 'keypress' event is firing against
    @param      p_event
    @return     void
    @brief      Simulate mouse movement
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Simulate.handlers.keypress = function(p_event)
{
    var l_sim = MetaWrap.Page.Event.Simulate;
    l_sim.m_show_cursor = false;
    l_sim.m_show_mouse_activity_icon = false;
    l_sim.m_show_keyboard_activity_icon = true;
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.mousemove = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_event
    @return     void
    @brief      Simulate mouse movement
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Simulate.handlers.mousemove = function(p_event)
{

    MetaWrap.Page.Event.Simulate.m_show_cursor = true;
    MetaWrap.Page.Event.Simulate.m_show_mouse_activity_icon = true;

    // get any scrolly thing
    var l_scr = MetaWrap.Page.Event.Simulate.Scroll;

    // Mouse has moved - make sure we have scrolled
    //this.scrollTop = l_scr.m_top;
    //this.scrollLeft = l_scr.m_left;

    if (l_scr.m_top != this.scrollTop)
    {
        this.scrollTop = l_scr.m_top;
    }

    if (this.scrollLeft != l_scr.m_left)
    {
        this.scrollLeft = l_scr.m_left;
    }

}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.click = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_event
    @return     void
    @brief      Simulate mouse click
    @author     James Mc Parlane
    @date       25 April 2006
*/
MetaWrap.Page.Event.Simulate.handlers.click = function(p_event)
{
    var l_sim = MetaWrap.Page.Event.Simulate;

    l_sim.m_show_cursor = true;
    l_sim.m_show_mouse_activity_icon = true;

    switch(this.nodeName)
    {
        case "INPUT":
        {
            //this.focus();

            switch(this.type)
            {
                case "radio":
                case "checkbox":
                {
                    // cycle the selection
                    this.checked = !this.checked;

                    // this.checked = true;

                    //trace("this.type '" + this.checked + "'");

                }
                break;

                case "text":
                {
                    // cycle the selection
                    this.checked = !this.checked;
                }
                break;

                case "button":
                {
                }
                break;

                default:
                {
                    alert("Unhandled INPUT element type '" + this.type + "'");
                }
                break;

            }
        }
        break;


        case "IMG":
        {
	        trace("Unhandled INPUT element type '" + this.type + "'");
        }
        break;

        case "TEXTAREA":
        {
        }
        break;


        case "SELECT":
        {
        }
        break;


        // Firefox gets a message on OPTION
        case "OPTION":
        {
        }
        break;


        default:
        {
            //alert("Unhandled element '" + this.nodeName + "'");
        }
        break;
    }
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.TEXTAREA_keypress = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_event
    @return     void
    @brief      Handle a keypress inside a TEXTAREA element
    @author     James Mc Parlane
    @date       25 April 2006
*/
MetaWrap.Page.Event.Simulate.handlers.TEXTAREA_keydown = function(p_event)
{
        var l_sim = MetaWrap.Page.Event.Simulate;

        // get a shorthand reference to the selection object
        var l_sel = l_sim.Selection;

        switch (l_sim.m_key)
        {

            // By default - do nothing, we only waht to handle backspace (8) and delete (46)
            default:
            break;

            case 46:
            {

                switch(l_sel.m_state)
                {

                    case l_sel.e_all_high:
                        // everything goes
                        this.value = "";
                    break;

                    case l_sel.e_end_high:
                        // If the end is selected we keep the start
                        this.value = this.value.substring(0,l_sel.m_start);
                    break;

                    case l_sel.e_start_high:
                        // If the start is selected we keep the end
                        this.value = this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_middle_high:
                        // If the middle is selected we keep the start and end
                        this.value = this.value.substring(0,l_sel.m_start) + this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_middle:
                        // take the character after start
                        this.value = this.value.substring(0,l_sel.m_start) + this.value.substring(l_sel.m_end+1,this.value.length);
                    break;

                    case l_sel.e_start:
                        // del at start, take first character
                        this.value = this.value.substring(1,this.value.length);
                    break;

                    case l_sel.e_empty:
                        // del in empty, do nothing
                    break;

                    case l_sel.e_end:
                        // del iat end, do nothing
                    break;

                    case l_sel.e_null:
                        // do nothing
                    break;

                    default:
                        error("unhandled state");
                    break;

                }
            }
            break;

            // BACKSPACE?
            case 8:
            {

                if (l_sim.m_shift)
                {
                    l_key = l_key.toUpperCase();
                }

                switch(l_sel.m_state)
                {
                    case l_sel.e_all_high:
                        // everything goes
                        this.value = "";
                    break;

                    case l_sel.e_end_high:
                        // If the end is selected we keep the start
                        this.value = this.value.substring(0,l_sel.m_start);
                    break;

                    case l_sel.e_start_high:
                        // If the start is selected we keep the end
                        this.value = this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_middle_high:
                        // If the middle is selected we keep the start and end
                        this.value = this.value.substring(0,l_sel.m_start) + this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_middle:
                        // take the character before cursor
                        this.value = this.value.substring(0,l_sel.m_start-1) + this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_start:
                        // backspace st start does nothing
                    break;


                    case l_sel.e_empty:
                        // backspace in empty input does nothing
                    break;

                    case l_sel.e_end:
                        // backspace at end, delectes the last character
                        this.value = this.value.substring(0,this.value.length-1);
                    break;

                    case l_sel.e_null:
                        // do nothing
                    break;

                    default:
                        error("unhandled state");
                    break;

                }
            }
            break;
        }
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.TEXTAREA_keypress = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_event
    @return     void
    @brief      Handle a keypress inside a TEXTAREA element
    @author     James Mc Parlane
    @date       25 April 2006
*/
MetaWrap.Page.Event.Simulate.handlers.TEXTAREA_keypress = function(p_event)
{
        var l_sim = MetaWrap.Page.Event.Simulate;

        // get a shorthand reference to the selection object
        var l_sel = l_sim.Selection;

        switch (l_sim.m_key)
        {
            case 16:
                // SHIFT DOWN
            break;

            case 8:
            case 46:
            case 37:
            case 39:
                // IGNORE
            break;

            default:
            {
                var l_key = String.fromCharCode(l_sim.m_key);

                if (l_key == undefined)
                {
                    return;
                }


                //
                if (l_sim.m_shift)
                {
                    l_key = l_key.toUpperCase();
                }

                switch(l_sel.m_state)
                {
                    case l_sel.e_all_high:
                        // if everything is highlighted - then we just end up with the one character
                        this.value = l_key;
                    break;

                    case l_sel.e_end_high:
                        // if the end is highlighted then we replace the highlighated part with the the single character
                        this.value = this.value.substring(0,l_sel.m_start) + l_key;
                    break;

                    case l_sel.e_start_high:
                        // if the start is highlighted then we replace the highlighated part with the the single character
                        this.value = l_key + this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_middle_high:
                        // if the middle is highlighted then we replace the highlighated part with the the single character
                        this.value = this.value.substring(0,l_sel.m_start) + l_key + this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_middle:
                        // if we are at the start, then add a character to the beginning
                        this.value = this.value.substring(0,l_sel.m_start) + l_key + this.value.substring(l_sel.m_end,this.value.length);
                    break;

                    case l_sel.e_start:
                        // if we are at the start, then add a character to the beginning
                        this.value = l_key + this.value;
                    break;

                    case l_sel.e_empty:
                        // If the text input is empty and we hit a key, then we just have that character
                        this.value = l_key;
                    break;

                    case l_sel.e_end:
                        // If we are at the end of the text, then we just append the character
                        this.value += l_key;
                    break;

                    case l_sel.e_null:
                        // do nothing
                    break;

                    default:
                        error("unhandled state");
                    break;

                }
            }
        }
}


/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.INPUT_keypress = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_event
    @return     void
    @brief      Handle a keypress inside an INPUT element
    @author     James Mc Parlane
    @date       25 April 2006
*/
MetaWrap.Page.Event.Simulate.handlers.INPUT_keydown = function(p_event)
{
    if (this.type == "text")
    {
        MetaWrap.Page.Event.Simulate.handlers.TEXTAREA_keydown.call(this,p_event);
    }
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.INPUT_keypress = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_event
    @return     void
    @brief      Handle a keypress inside an INPUT element
    @author     James Mc Parlane
    @date       25 April 2006
*/
MetaWrap.Page.Event.Simulate.handlers.INPUT_keypress = function(p_event)
{
    // Only inputs of type text have editable text
    if (this.type == "text")
    {
        MetaWrap.Page.Event.Simulate.handlers.TEXTAREA_keypress.call(this,p_event);
    }
}

/*!
    @fn         MetaWrap.Page.Event.Simulate.handlers.A_click = function(p_event)
    @param      this The current element that the mousemove event is firing against
    @param      p_event
    @return     void
    @brief      Handle a click inside an A element
    @author     James Mc Parlane
    @date       25 April 2006
*/
MetaWrap.Page.Event.Simulate.handlers.A_click = function(p_event)
{
    if ((this.href != null) && (this.href != ""))
    {
        if ((this.target != null) && (this.target != ""))
        {
            MetaWrap.Page.Event.Simulate.m_window.frames[this.target].location = this.href;
        }
        else
        {
            MetaWrap.Page.Event.Simulate.m_window.location = this.href;
        }
    }
}


/*!
 *@} endgroup mw_javascript_lib_page_event_simulate MetaWrap - JavaScript - Page - Event - Simulate
 */

/*!
 *@} end of MetaWrap.Page.Event.Simulate
 */



