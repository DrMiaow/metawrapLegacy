/*

    @file mw_lib_macro_recorder.js

    $Id: mw_lib_macrorecorder.js,v 1.15 2007/04/03 08:15:03 james Exp $

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
 * $Log: mw_lib_macrorecorder.js,v $
 * Revision 1.15  2007/04/03 08:15:03  james
 * Latest updates to JavaScript lib - getting some kruft cleared out.
 *
 * Revision 1.14  2006/11/09 11:00:27  james
 * Fixed poller - prevening multiple poller_entries from occuring in m_poller and m_check
 *
 * Revision 1.13  2006/09/29 12:20:31  james
 * Fixed a bug in the javascript macro recorder
 *
 * Revision 1.12  2006/09/21 05:19:37  james
 * Latest changes
 *
 * Revision 1.3  2006/09/18 08:37:02  james
 * Added latest macro recorder files...
 * Added macro recorder to index_demo.html
 *
 * Revision 1.17  2006/09/12 05:58:03  james
 * Latest release of the macro recorder
 *
 * Revision 1.11  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:41  james
 * Added macro recorder
 *
 * Revision 1.16  2006/06/19 12:52:49  james
 * Getting MetaWrap to deploy using Ant
 *
 * Revision 1.10  2006/05/31 12:45:00  james
 * Changed package formal
 *
 * Revision 1.9  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.8  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.7  2006/05/07 10:36:09  james
 * Refactored events options so that they now interact properly.
 *
 * Revision 1.6  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.5  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.4  2006/05/06 08:08:46  james
 * More code tidy up.
 * Getting control panel to implement the visitor class.
 *
 * Revision 1.3  2006/05/06 07:09:36  james
 * Refactoring code
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
 * ========= REFACTORED =====
 *
 * $Log: mw_lib_macrorecorder.js,v $
 * Revision 1.15  2007/04/03 08:15:03  james
 * Latest updates to JavaScript lib - getting some kruft cleared out.
 *
 * Revision 1.14  2006/11/09 11:00:27  james
 * Fixed poller - prevening multiple poller_entries from occuring in m_poller and m_check
 *
 * Revision 1.13  2006/09/29 12:20:31  james
 * Fixed a bug in the javascript macro recorder
 *
 * Revision 1.12  2006/09/21 05:19:37  james
 * Latest changes
 *
 * Revision 1.3  2006/09/18 08:37:02  james
 * Added latest macro recorder files...
 * Added macro recorder to index_demo.html
 *
 * Revision 1.17  2006/09/12 05:58:03  james
 * Latest release of the macro recorder
 *
 * Revision 1.11  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:41  james
 * Added macro recorder
 *
 * Revision 1.16  2006/06/19 12:52:49  james
 * Getting MetaWrap to deploy using Ant
 *
 * Revision 1.10  2006/05/31 12:45:00  james
 * Changed package formal
 *
 * Revision 1.9  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.8  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.7  2006/05/07 10:36:09  james
 * Refactored events options so that they now interact properly.
 *
 * Revision 1.6  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.5  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.4  2006/05/06 08:08:46  james
 * More code tidy up.
 * Getting control panel to implement the visitor class.
 *
 * Revision 1.92  2006/05/03 12:36:39  james
 * Now preserves the start and end state of the page
 *
 * Revision 1.91  2006/05/02 21:41:12  james
 * *** empty log message ***
 *
 * Revision 1.90  2006/05/02 14:58:09  james
 * Can now save away document starting state (not doing iframes yet)
 *
 * Revision 1.88  2006/04/30 12:29:22  james
 * I can now save and load macros using an example loader and saver
 * Now need to spit that loader and saver off into another file.
 *
 * Revision 1.87  2006/04/30 11:49:26  james
 * Fixed macro so that we can store meta data with a macro recording
 *
 * Revision 1.86  2006/04/26 13:15:41  james
 * Made it easier to include metawrap js libraries
 * Starting ong load example (xml)
 *
 * Revision 1.85  2006/04/26 12:55:42  james
 * Made it easier to include metawrap js libraries
 * Starting ong load example (xml)
 *
 * Revision 1.82  2006/04/25 12:06:12  james
 * Adding ability to easily add extra ways of saving and loading macros
 *
 * Revision 1.81  2006/04/25 10:31:23  james
 * Adding ability to easily add extra ways of saving and loading macros
 *
 * Revision 1.80  2006/04/25 10:13:24  james
 * Adding ability to easily add extra ways of saving and loading macros
 *
 * Revision 1.79  2006/04/25 05:49:52  james
 * Adding 'savers' and 'loaders'
 *
 * Revision 1.78  2006/04/24 11:02:07  james
 * Tidied up code
 *
 * Revision 1.77  2006/04/23 13:39:51  james
 * Added better playback syn to recodred speed, and a fast playback option
 *
 * Revision 1.76  2006/04/23 09:48:44  james
 * Document selection now working and consistent
 *
 * Revision 1.75  2006/04/23 06:41:40  james
 * Getting page select working
 *
 * Revision 1.74  2006/04/22 14:02:49  james
 * Working on in browser detection now
 *
 * Revision 1.72  2006/04/22 12:43:56  james
 * dropdowns and multiple selects can record and playback now
 *
 * Revision 1.71  2006/04/22 06:15:42  james
 * Getting option/select working
 *
 * Revision 1.70  2006/04/18 07:59:54  james
 * Got scrolling working on playback - now for document wide selection
 *
 * Revision 1.69  2006/04/18 06:34:45  james
 * Expanded macro format to allow for end selections
 *
 * Revision 1.68  2006/04/09 14:02:12  james
 * Getting in page selection happening
 *
 * Revision 1.67  2006/04/09 06:19:07  james
 * Got selection playback working within TEXTAREA and INPUT
 *
 * Revision 1.66  2006/04/07 13:18:19  james
 * Got whole window scrolling working in FireFox/Mozilla
 * Tidied up code
 *
 * Revision 1.64  2006/04/05 12:20:34  james
 * Text selection is nor recording properly for mozilla and IE
 *
 * Revision 1.62  2006/04/04 14:51:40  james
 * Solved IE text selection limitations
 *
 * Revision 1.61  2006/03/31 04:00:15  james
 * Getting cross platform text selection
 *
 * Revision 1.59  2006/03/30 03:03:34  james
 * Getting selection working properly
 * Added testcases for some of my favorite javascript behaviours
 *
 * Revision 1.58  2006/03/29 06:41:23  james
 * Latest macro recorder
 *
 * Revision 1.57  2006/03/29 03:17:35  james
 * Fixed bug in detecting sub frames
 * Starting adding keyboard input
 *
 * Revision 1.56  2006/03/28 12:30:22  james
 * One bug remaining - when an IFRAME is loaded with an href, its not being loaded
 * into a new frame object
 *
 * Revision 1.55  2006/03/27 11:44:26  james
 * improved interface
 *
 * Revision 1.54  2006/03/27 11:23:43  james
 * hooked functions were colliding - adding unique-id per document
 *
 * Revision 1.53  2006/03/27 10:05:14  james
 * IFRAM hooker now consistent across browsers
 *
 * Revision 1.52  2006/03/27 01:45:23  james
 * events now recording (location handles in longhand)
 * Now need to get shorthand id based locations working again
 *
 * Revision 1.51  2006/03/26 06:51:45  james
 * Getting macro events working across iframes -
 * have proof of concept for Mozilla - now need
 * to get it working in IE.
 *
 * Revision 1.50  2006/03/26 02:24:09  james
 * Code tidy up.
 * Can now look for new iframes on every recorded event.
 * Ready now to start hooking into sub frames - even dynamic ones.
 *
 * Revision 1.49  2006/03/25 23:57:08  james
 * code tidy up
 *
 * Revision 1.48  2006/03/25 06:20:16  james
 * Moved onclick into generic handlers
 *
 * Revision 1.47  2006/03/25 04:39:24  james
 * Made macro recorder more stable
 * Made event hooks multiple document aware
 * Added per element/event event handlers for simulation
 *
 * Revision 1.46  2006/03/22 07:16:37  james
 * Added macro support for top level frames.
 * Made ghost mouse cursor and control panel top z level item.
 *
 * Revision 1.45  2006/03/21 07:11:06  james
 * Tidy up of code
 * Fixed issue under Firefox with mouse animation
 *
 * Revision 1.44  2006/03/02 05:53:34  james
 * Doh! Fixed issue in passing selection from module to module
 *
 * Revision 1.43  2006/03/02 02:57:21  james
 * Starting on selection playback
 *
 * Revision 1.42  2006/03/02 01:35:40  lela
 * Added text selection details to Show window.
 *
 * Revision 1.41  2006/03/02 01:09:02  james
 * Added selection event to recorder
 *
 * Revision 1.40  2006/03/02 00:27:37  james
 * starting to add selections to macro recorder
 *
 * Revision 1.39  2006/02/27 12:58:38  james
 * Experimenting with javascript text selection
 *
 * Revision 1.38  2006/02/26 13:48:20  james
 * Added mouse activity and keyboard activity icons to macro recorder
 *
 * Revision 1.37  2006/02/06 07:01:05  lela
 * Added "ghost cursor" to display mousemove on Macro playback.
 *
 * Revision 1.36  2006/02/06 04:14:59  james
 * Adding event simulation to MetaWrap.Page.Event
 *
 * Revision 1.35  2005/12/23 10:23:42  james
 * Latest round of work on the rendering pipeline
 *
 * Revision 1.34  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.32  2005/08/23 12:15:15  james
 * Starting to get output
 *
 * Revision 1.31  2005/08/21 15:10:46  james
 * Getting middle level events working
 * in Firefox.
 *
 * Revision 1.30  2005/08/21 13:53:24  james
 * Managed to completely simulate middle layer.
 * Front end layer is obviously not driven by this
 * so now need to simulate this top level layer.
 *
 * Revision 1.29  2005/08/21 09:13:28  james
 * Trying to simulate operating system focus with only
 * browser messages.
 *
 * Revision 1.28  2005/08/21 00:31:11  james
 * Trying to simulate operating system focus with only
 * browser messages.
 *
 * Revision 1.27  2005/08/20 06:26:02  james
 * Now able to simulate events under both IE and Firefox
 *
 * Revision 1.26  2005/08/03 15:55:24  james
 * Adding graph widget to testing framework
 *
 * Revision 1.25  2005/08/02 13:59:28  james
 * researching onselect
 *
 * Revision 1.24  2005/08/02 12:29:22  james
 * Added mozilla smecific events
 *
 * Revision 1.23  2005/08/02 12:01:20  james
 * Adding all event handlers for both browsers to help
 * in diagnosting what events follow what
 *
 * Revision 1.22  2005/08/02 08:30:39  james
 * non standard events now shown in red
 *
 * Revision 1.21  2005/08/01 14:12:48  james
 * Fixing niggling little bugs in playback controls
 *
 * Revision 1.20  2005/08/01 13:52:20  james
 * Adding ability to log the important core messages
 *
 * Revision 1.19  2005/08/01 09:26:51  james
 * getting ready to show events
 *
 * Revision 1.18  2005/07/30 06:39:47  james
 * End of play notification
 *
 * Revision 1.17  2005/07/28 12:27:38  james
 * A bit more tweaking of playback - now ready to plug  in event simulation code.
 *
 * Revision 1.16  2005/07/28 12:12:03  james
 * Fixed bug in event creation
 * Got basic player happening - not simulating events - but walking
 * recorded event collection array and displaying what we need
 * to playback into the event model
 *
 * Revision 1.15  2005/07/28 08:32:33  james
 * Getting more playback stuff happening
 *
 * Revision 1.13  2005/07/27 12:52:18  james
 * Added some evaluation test handlers - now to integrate the playback.
 * During playback testing its going to be important to work out if events, when
 * played back spwan logical child events (does a click result in a focus, does a mousemove result in mouseover) etc...
 *
 * Revision 1.11  2005/07/27 08:40:40  james
 * Streamlined event processing. Not happy with naming of functions though.
 *
 * Revision 1.10  2005/07/25 12:43:40  james
 * Fixed silly bug in event handler - was using this instead of
 * MetaWrap.Macro.Recorder for object reference.
 *
 * Revision 1.9  2005/07/25 11:58:26  james
 * Now timestamping events
 *
 * Revision 1.8  2005/07/25 11:42:50  james
 * Wired in onclick
 *
 * Revision 1.7  2005/07/25 11:26:43  james
 * Working on adding more events to macro recorder. Also
 * making code a little more tidy and compact
 *
 * Revision 1.6  2005/07/24 13:26:20  james
 * fix
 *
 * Revision 1.5  2005/07/24 08:26:08  james
 * Need special structure to store event
 *
 * Revision 1.4  2005/07/24 08:24:51  james
 * Working on macro editor
 *
 * Revision 1.3  2005/07/24 06:30:05  james
 * Basic recorder working
 *
 * Revision 1.2  2005/07/23 05:26:19  james
 * Updated macro recorder
 *
 * Revision 1.1  2005/07/23 05:12:23  james
 * Getting macro system to render its own controller
 */

/*! \page mw_javascript_lib_macro MetaWrap - JavaScript - Macro
 *
 * \subsection mw_javascript_lib_macro Overview
 *
 * \subsection mw_javascript_lib_macro Web Applications - Event Streams
 *
 * The event stream MIME type is application/x-dom-event-stream.
 *
 * The event stream must always be encoded as UTF-8. Line must always be terminated by a single U+000A LINE FEED character.
 *
 * The event stream format is (in pseudo-BNF):
 *
 * [stream]  ::= [event]*
 * [event]   ::= [ [comment] | [command] | [field] ]* [newline]
 *
 * [comment] ::= ';' [data] [newline]
 * [command] ::= ':' [data] [newline]
 * [field]   ::= [name] [ ':' [space]? [data] ]? [newline]
 *
 * [name]    ::= one or more UNICODE characters other than ':', ';', and U+000A LINE FEED
 * [data]    ::= zero or more UNICODE characters other than U+000A LINE FEED
 * [space]   ::= a single U+0020 SPACE character (' ')
 * [newline] ::= a single U+000A LINE FEED characterBytes that are not valid UTF-8 sequences must be interpreted as the U+FFFD REPLACEMENT CHARACTER
 *
 */

//alert("$Id: mw_lib_macrorecorder.js,v 1.15 2007/04/03 08:15:03 james Exp $");

/*! \defgroup mw_javascript_lib_macro  MetaWrap - JavaScript - Macro
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
MwUse("MetaWrap.Page.Element","mw_lib_page_element.js");
MwUse("MetaWrap.Page.Selection","mw_lib_page_selection.js");
MwUse("MetaWrap.Page.Event.Simulate","mw_lib_page_event_simulate.js");
MwUse("MetaWrap.Page.Element.addEventListener","mw_lib_page_element_addhandler.js");


//
// Now that we have the pre-requisite namespaces, then off we go
//

/*! @name MetaWrap.MacroRecorder Namespace */
//@{

/*!
    @fn         MetaWrap_MacroRecorder = function()
    @return     void
    @brief      MetaWrap.MacroRecorder namespace
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap_MacroRecorder = function()
{
    // We are not recording
    this.m_is_recording = false;

    // We are not playing
    this.m_is_playing = false;

    // The timer we use during playback - each playback event is triggered by this.
    this.m_timer = null;

    // The time at which we started playback/record
    this.m_start_time = null;

    // Our collection of events
    this.m_recording = null;

    // The current event that we are playing
    this.m_events_current = 0;

    // We start with 0 elapsed event time
    this.m_events_time = 0;

    // Our collection of old document events
    this.m_document_hooks = new Array();

    // The pages saved onclick event
    this.m_onclick = null;

    // The current event
    this.m_current_event = null;

    // The current event location
    this.m_current_event_location = "";

    // The current event element
    this.m_current_event_element = null;

    // The time at which the current event occured (relative to m_start_time)
    this.m_current_event_time = 0;

    // Window used to display list of events
    this.m_show_window = null;

    // Window used to save the events
    this.m_save_window = null;

    // list of standard events
    this.m_standard_events = null;

    // hide the control panel while playing
    this.m_hide = false;

    // loop the playback
    this.m_loop = false;

    // playback faster than the speed at which it was recorded
    this.m_fast = false;

    // playback slower than the speed at which it was recorded
    this.m_slow = false;

    // Array of 'savers', each of which can save a macro
    this.m_savers = new Array();

    // Array of 'loaders', each of which can load a macro
    this.m_loaders = new Array();

    // return this object
    return this;
}

/*
    @brief  Namespace wrapper
*/
MetaWrap.MacroRecorder = new MetaWrap_MacroRecorder();

/*
    @brief  Unique ID
*/
MetaWrap.MacroRecorder.m_uniqueid = 0;

/*
    @brief  Last element that 'mousedown' was on
*/
MetaWrap.MacroRecorder.m_last_mousedown = null;

/*
    @brief  Mouse cursor
*/
MetaWrap.MacroRecorder.m_cursor = null;

/*
    @brief  Mouse activity icon
*/
MetaWrap.MacroRecorder.m_mouse_activity_icon = null;

/*
    @brief  Keyboard activity icon
*/
MetaWrap.MacroRecorder.m_keyboard_activity_icon = null;

/*
    @brief  Current selection data
*/
MetaWrap.MacroRecorder.m_scroll = {};
MetaWrap.MacroRecorder.m_scroll.m_top = 0;
MetaWrap.MacroRecorder.m_scroll.m_left = 0;

/*
    @brief  Current selection data
*/
MetaWrap.MacroRecorder.m_selection = {};
MetaWrap.MacroRecorder.m_selection.m_start_location = "";
MetaWrap.MacroRecorder.m_selection.m_start = 0;
MetaWrap.MacroRecorder.m_selection.m_end_location = "";
MetaWrap.MacroRecorder.m_selection.m_end = 0;

/*
    @brief  List of standard w3c event handlers
*/
MetaWrap.MacroRecorder.m_standard_events =
{
    "click":1,
    "dblclick":1,
    "keydown":1,
    "keypress":1,
    "keyup":1,
    "keypress":1,
    "mousemove":1,
    "mousedown":1,
    "mouseout":1,
    "mouseover":1,
    "mouseup":1,
    "focus":1,
    "blur":1,
    "select":1,
    "keypress":1,
    "reset":1,
    "submit":1,
    "change":1
};

/*!
    @fn         MetaWrap.MacroRecorder.elapsedTime = function()
    @return     long Number of miliseconds elapsed since we started recording/playback
    @brief      Return the number of miliseconds elapsed since we started recording/playback
    @author     James Mc Parlane
    @date       23 July 2005
*/
MetaWrap.MacroRecorder.elapsedTime = function()
{
    return (new Date()).getTime() - this.m_start_time;
}

/*!
    @fn         MetaWrap.MacroRecorder.addDocumentHooks = function(p_document)
    @param      p_document The document to add the hooks to
    @return     void
    @brief      Add hooks to a document
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.addDocumentHooks = function(p_document)
{
    // If this document does not have a unique ID - then give it one
    if (p_document.m_uniqueid == null)
    {
        p_document.m_uniqueid = ++MetaWrap.MacroRecorder.m_uniqueid;
    }

    // Make sure we have a slot for this document
    if (this.m_document_hooks[p_document.m_uniqueid] == null)
    {
        this.m_document_hooks[p_document.m_uniqueid] = new Array();
    }

    // Add all the handlers
    for(var l_event_type in this.Handlers)
    {
        // If this already hooked, then complain
        ASSERT(this.m_document_hooks[p_document.m_uniqueid][l_event_type] == null,"Already hooked " + p_document.title + "." + l_event_type);

        // Save the current event
        this.m_document_hooks[p_document.m_uniqueid][l_event_type] = p_document[l_event_type];

        // Replace it with ours
        p_document[l_event_type] = this.Handlers[l_event_type];
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.removeDocumentHooks = function(p_document)
    @param      p_document The document to remove the hooks from
    @return     void
    @brief      Remove hooks from document
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.removeDocumentHooks = function(p_document)
{
    for(var l_event_type in this.Handlers)
    {
        // If we have an event handler
        if (p_document[l_event_type] == this.Handlers[l_event_type])
        {
            // Restore the old event handler
            p_document[l_event_type] = this.m_document_hooks[p_document.m_uniqueid][l_event_type];

            // clear the old ones
            this.m_document_hooks[p_document.m_uniqueid][l_event_type] = null;
        }
        else
        {
            error("window." + l_event_type + " changed after macro started recording");
        }
    }
}


/*!
    @fn         MetaWrap.MacroRecorder.addAllHooks = function(p_document)
    @param      p_document The document to add hooks to
    @return     void
    @brief      Scan for frames and iframes and add handlers - mark with a flag that they have been hooked.
    @author     James Mc Parlane
    @date       26 March 2006

    Need to add hooks, deepest first to prevent any hooks from
    being activated.
*/
MetaWrap.MacroRecorder.addAllHooks = function(p_document)
{
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
        MetaWrap.MacroRecorder.addAllHooks(l_frame.document);
    }

    // If this document not hooked, then hook it
    if (!p_document.mw_macro_init)
    {
        // mark this document as hooked
        p_document.mw_macro_init = true;

        // Add the document hooks
        this.addDocumentHooks(p_document);
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.removeAllHooks = function(p_document)
    @param      p_document The document to remove hooks from
    @return     void
    @brief      Scan for frames and iframes and remove handlers
    @author     James Mc Parlane
    @date       26 March 2006
*/
MetaWrap.MacroRecorder.removeAllHooks = function(p_document)
{
    // Remove the document hooks
    this.removeDocumentHooks(p_document);

    // Find all the IFRAMEs
    var l_iframes = p_document.getElementsByTagName("IFRAME");

    // Walk through all the IFRAMEs
    for(var i = 0;i<l_iframes.length;i++)
    {
        // Find the window for this document
        var l_window = p_document.defaultView||p_document.parentWindow;

        // Find the frame based on its name from the IFRAME
        var l_frame = l_window.frames[l_iframes[i].name];

        // Then try and unhook it and all its children
        MetaWrap.MacroRecorder.removeAllHooks(l_frame.document);
    }

    // uninit this document
    p_document.mw_macro_init = false;
}

/*!
    @fn         MetaWrap.MacroRecorder.genericHandler = function(p_event)
    @param      p_event The event we are recording
    @return     void
    @brief      This is our capture hook for all events - see mw_lib_macrorecorder_handlers.js
    @author     James Mc Parlane
    @date       6 September 2004
*/

MetaWrap.MacroRecorder.genericHandler = function(p_event)
{
    var l_return = true;
    var l_event = MetaWrap.Page.Event.get(p_event,this);
    var l_element = (l_event.target) ? l_event.target : l_event.srcElement;
    var l_type = l_event.type;

    // No target - then must be the document
    if (l_element == null)
    {
        l_element = this;
    }

    // if we are recording
    if (MetaWrap.MacroRecorder.m_is_recording)
    {

        if (l_event != null)
        {
            // handle our current selection
            MetaWrap.MacroRecorder.handleSelection.call(MetaWrap.MacroRecorder,l_event);

            // Ok - now handle the event and ultimaltely record it
            MetaWrap.MacroRecorder.handleEvent.call(MetaWrap.MacroRecorder,l_event,this,l_element,l_type);
        }
    }

    //window.status = l_type;

    // Call the default handlers after recording - just in case we do something nasty to the event
    l_return = MetaWrap.MacroRecorder.handleDefault(l_event,this,l_element,l_type);

    return l_return;
}

/*
MetaWrap.MacroRecorder.genericHandler = function(p_event)
{
    var l_event = MetaWrap.Page.Event.get(p_event,this);
    var l_element = (l_event.target) ? l_event.target : l_event.srcElement;
    var l_type = l_event.type;

    // No target - then must be the document
    if (l_element == null)
    {
        l_element = this;
    }


    if (MetaWrap.MacroRecorder.m_is_recording)
    {

        if (l_event != null)
        {
            MetaWrap.MacroRecorder.handleSelection.call(MetaWrap.MacroRecorder,l_event);

            // Ok - now handle the event and ultimaltely record it
            MetaWrap.MacroRecorder.handleEvent.call(MetaWrap.MacroRecorder,l_event,this,l_element,l_type);
        }
    }

    // Call the default handlers
    MetaWrap.MacroRecorder.handleDefault(l_event,this,l_element,l_type);


	return false;
}
*/


/*!
    @fn         MetaWrap.MacroRecorder.handleDefault = function(p_event,p_element,p_target,p_type)
    @param      p_event The event that has been triggered
    @param      p_element The element this event was on
    @param      p_target The element this event was targeted on
    @param      p_type The type of event eg - 'click', 'mousemove'
    @return     void
    @brief      Handles the event for the document and makes sure that the event hooks are called as expected.
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.handleDefault = function(p_event,p_element,p_target,p_type)
{
    // Work out the real document for this
    var l_document = null;
    var l_return = true;

    if (p_target == null)
    {
        l_document = document;
    }
    else
    if (p_target.nodeName == "#document")
    {
        l_document = p_target;
    }
    else
    {
        l_document = p_target.ownerDocument;
    }

    var l_handler = MetaWrap.MacroRecorder.m_document_hooks[l_document.m_uniqueid]["on" + p_type];

    // If we have an onclick to process - then
    if (l_handler != null)
    {
        //alert("call our own " + "on" + p_type);

        // call the event that we hooked
        l_return = l_handler(p_event);
    }

    return l_return;
}



/*!
    @fn         MetaWrap.MacroRecorder.handleSelection = function(p_event)
    @param      p_event The event that has been triggered that we want to save the selection of
    @return     void
    @brief      Handles selection events and saved the current selection away for later recording
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.handleSelection = function(p_event)
{
    try
    {
        // We only record selection for standard w3c events - all the rest get in the way
        if (this.m_standard_events[p_event.type] == 1)
        {
            var l_event = p_event;//MetaWrap.Page.Event.get(p_event,this);
            var l_element = (l_event.target) ? l_event.target : l_event.srcElement;
            var l_type = l_event.type;

            if ((l_element == null) && (p_event.type == "selectionchange"))
            {
                // Use the previous location
                l_element = MetaWrap.getDOMElementFromLocation(MetaWrap.MacroRecorder.m_current_event_location);
            }

            // Remember the last mousedown element - we will need it later
            if (l_type == "mousedown")
            {
                this.m_last_mousedown = l_element;
            }

            // No target - then must be the document
            if (l_element != null)
            {
                // Work out what the document is
                var l_document = null;

                if (l_element.nodeName == "#document")
                {
                    l_document = l_element;
                }
                else
                {
                    l_document = l_element.ownerDocument;
                }

                // Work out what the window is
                var l_window = l_document.defaultView||l_document.parentWindow;

                // This will store the final selection
                var l_offset_start = 0;
                var l_offset_end = 0;
                var l_node_start = "";
                var l_node_end = "";

                // If we are Mozilla style collection
                if (l_window.getSelection)
                {
                    // http://developer.mozilla.org/en/docs/DOM:window.getSelection
                    var l_sel = l_window.getSelection();

                    if (l_sel != null)
                    {
                        // are we selecting inside a TEXTAREA or INPUT?
                        if ((l_element.nodeName == "TEXTAREA") || ((l_element.nodeName == "INPUT") && (l_element.type == "text")))
                        {
                            // If this textarea is the last one we clicked in, then we want to know its selection
                            if (this.m_last_mousedown == l_element)
                            {
                                // get the start node
                                l_node_start = MetaWrap.getDOMLocationFromElement(l_element);

                                // Get the selection range offsets
                                var l_range_offsets = MetaWrap.Page.Selection.get(l_element,l_document);

                                // Get the start and end offsets
                                l_offset_start = l_range_offsets.m_start;
                                l_offset_end = l_range_offsets.m_end;
                            }
                            else
                            {
                                l_offset_start = 0;
                                l_offset_end = 0;
                                l_node_start = "";
                                l_node_end = "";
                            }

                        }
                        else
                        {
                            // We must be selecting inside the document

                            // get the start offset
                            l_offset_start = l_sel.anchorOffset;

                            // get the start node
                            l_node_start = MetaWrap.getDOMLocationFromElement(l_sel.anchorNode);

                            // get the end offset
                            l_offset_end = l_sel.focusOffset;

                            // get the end node
                            l_node_end = MetaWrap.getDOMLocationFromElement(l_sel.focusNode);
                        }
                    }
                }
                else
                {
                    // IE Style

                    // are we selecting inside a TEXTAREA or INPUT.text?
                    if ((l_element.nodeName == "TEXTAREA") || ((l_element.nodeName == "INPUT") && (l_element.type == "text")))
                    {
                        // If this textarea is the last one we clicked in, then we want to know its selection
                        if (this.m_last_mousedown == l_element)
                        {
                            // get the current selection
                            var l_selection = MetaWrap.Page.Selection.get(l_element,l_document);

                            // If we have one..
                            if (l_selection != null)
                            {
                                // Save it away

                                l_offset_start = l_selection.m_start;
                                l_offset_end = l_selection.m_end;

                                if (l_element != null)
                                {
                                    l_node_start = MetaWrap.getDOMLocationFromElement(l_element);
                                    l_node_end = "";
                                }
                            }
                        }
                    }
                    else
                    {
                        // We must be selecting inside the document

                        // Get the current document range
                        var l_range = l_document.selection.createRange();

                        // If we have a range
                        if (l_range)
                        {
                            // Get the first node
                            var l_anchorNode = l_range.parentElement();

                            // Get its location
                            l_node_start = MetaWrap.getDOMLocationFromElement(l_anchorNode);

                            // In IE its all relative to document.BODY so this does not really matter
                            l_node_end = l_node_start;

                            // Get the selection range offsets
                            var l_range_offsets = MetaWrap.Page.Selection.get(l_anchorNode,l_document);

                            // Get the start and end offsets
                            l_offset_start = l_range_offsets.m_start;
                            l_offset_end = l_range_offsets.m_end;
                        }
                    }
                }

                // Now process the final selection
                MetaWrap.MacroRecorder.m_selection.m_start_location = l_node_start;
                MetaWrap.MacroRecorder.m_selection.m_start = l_offset_start;
                MetaWrap.MacroRecorder.m_selection.m_end_location = l_node_end;
                MetaWrap.MacroRecorder.m_selection.m_end = l_offset_end;

                // start with no options selected
                MetaWrap.MacroRecorder.m_option_select = "";

                if (l_element.nodeName == "SELECT")
                {
                    var l_options = l_element.options;

                    for(var i = 0;i<l_options.length;i++)
                    {
                        if (l_options[i].selected)
                        {
                            MetaWrap.MacroRecorder.m_option_select += '1';
                        }
                        else
                        {
                            MetaWrap.MacroRecorder.m_option_select += '0';
                        }
                    }
                }
            }
            //else
            //{
            //    document.title = "null element";
            //}
        }
        else
        {
            // No selection data - so empty everything

            MetaWrap.MacroRecorder.m_selection.m_start_location = "";
            MetaWrap.MacroRecorder.m_selection.m_start = 0;

            MetaWrap.MacroRecorder.m_selection.m_end_location = "";
            MetaWrap.MacroRecorder.m_selection.m_end = 0;

            MetaWrap.MacroRecorder.m_option_select = "";
        }
    }
    catch(l_e)
    {
        // No selection data - so empty everything

        MetaWrap.MacroRecorder.m_selection.m_start_location = "";
        MetaWrap.MacroRecorder.m_selection.m_start = 0;

        MetaWrap.MacroRecorder.m_selection.m_end_location = "";
        MetaWrap.MacroRecorder.m_selection.m_end = 0;

        MetaWrap.MacroRecorder.m_option_select = "";
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.processEvent = function(p_event,p_element,p_target)
    @param      p_event The event we are recording
    @param      p_element The element the event is on
    @param      p_target The element the event is targeted too
    @return     void
    @brief      This is our capture hook for the onclick event.
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Should we be looking at the selection object?
*/
MetaWrap.MacroRecorder.processEvent = function(p_event,p_element,p_target)
{

    // Make sure that everything is hooked as it should be - if a new iframe has been added - we need to know about it.
    this.addAllHooks(document);

    // The the current elapsed time
    this.m_current_event_time = MetaWrap.MacroRecorder.elapsedTime();

    // get the current event
    this.m_current_event = p_event;

    // Assume no scroll
    this.m_scroll.m_top = 0;
    this.m_scroll.m_left = 0;

    // get the scrolling offsets of this element
    if (p_target)
    {
        if (p_target.scrollTop)
        {
            this.m_scroll.m_top = p_target.scrollTop;
        }

        if (p_target.scrollLeft)
        {
            this.m_scroll.m_left = p_target.scrollLeft;
        }
    }

    // Get the target
    this.m_current_event_element = (this.m_current_event.target) ? this.m_current_event.target : this.m_current_event.srcElement

    // did we match with an element?
    if (this.m_current_event_element == null)
    {
        // No element - but for consistency, lets associate the start element

        // If we have a selection start element
        if ((this.m_selection.m_start_location != '') && (p_event.type == "selectionchange"))
        {
            this.m_current_event_location = this.m_selection.m_start_location;
        }
        else
        {
            // no
            this.m_current_event_location = "";
        }
    }
    else
    {
        // Work out the target location
        this.m_current_event_location = MetaWrap.getDOMLocationFromElement(this.m_current_event_element);
    }

    // Make sure its not an event associated with the macro recorder

    if (this.m_current_event_location.indexOf("#MetaWrap.MacroRecorder.") == 0)
    {
        // We don't record macro recorder events - so bug out here

        // Don't record mouse events   here
        if ((p_event.type.indexOf("mouse") != -1) || (p_event.type.indexOf("click") != -1))
        {
            return false;
        }
    }


    // All good
    return true;
}


/*!
    @fn         MetaWrap.MacroRecorder.playEvent = function()
    @return     void
    @brief      Play the next event (MetaWrap.MacroRecorder.m_recording.m_events[this.m_events_current]) and schedule the next event
    @author     James Mc Parlane
    @date       6 September 2004

    Tries to playback events at the recorded speed, or if the 'Fast' control panel option is true, it plays back as fast as possible.
*/
MetaWrap.MacroRecorder.playEvent = function()
{
    // Clear the timeout
    clearTimeout(this.m_timer);
    this.m_timer = null;

    if (this.m_is_playing)
    {
        // Get the current event
        var l_event = this.m_recording.m_events[this.m_events_current];

        // run the event
        l_event.run();

        // point to the next event
        this.m_events_current++;

        // if we have more events
        if (this.m_events_current < this.m_recording.m_events.length)
        {
            // get the next event
            var l_event_next = this.m_recording.m_events[this.m_events_current];

            // how long should we wait before the next event?
            var l_event_next_delay = l_event_next.m_time - l_event.m_time;

            // update the cumulative event time
            this.m_events_time = this.m_events_time + l_event_next_delay;

            // calculate lag from real time
            var l_lag = this.elapsedTime() - this.m_events_time;

            // adjust for lag
            //l_event_next_delay -= l_lag;

            //window.status = "lag = " + l_lag;

            window.status = this.m_events_time;

            if (this.m_slow)
            {
            	l_event_next_delay = 100;
            }
            else
            // if for some reason we were running ahread of time or we want fast playback, then trigger event ASAP
            if ((l_event_next_delay < 0) || this.m_fast)
            {
                l_event_next_delay = 0;
            }

            // schedule the next event
            this.m_timer = setTimeout("MetaWrap.MacroRecorder.playEvent.call(MetaWrap.MacroRecorder);",l_event_next_delay);
        }
        else
        if (this.m_loop)
        {
            // start from first event
            this.m_events_current = 0;

            // reset duraction clock
            this.m_events_time = 0;

            // schedule the next event
            this.m_timer = setTimeout("MetaWrap.MacroRecorder.playEvent.call(MetaWrap.MacroRecorder);",1000);
        }
        else
        {
            // no more events - thats the end
            this.m_is_playing = false;

            // Hide the mouse pointer
            if (this.m_cursor)
            {
                this.m_cursor.style.display = "none";
            }

            // Hide mouse activity icon till its needed
            if (this.m_mouse_activity_icon)
            {
                this.m_mouse_activity_icon.style.display = "none";
            }

            // Hide keyboard activity icon till its needed
            if (this.m_keyboard_activity_icon)
            {
                this.m_keyboard_activity_icon.style.display = "none";
            }

            // Stop Everything
            this.stopEverything();
        }
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.stopEverything = function()
    @return     void
    @brief      Stops all activity.
    @author     James Mc Parlane
    @date       6 September 2004

    Triggered at the end of Playback,Record or when the stop button is pressed
*/
MetaWrap.MacroRecorder.stopEverything = function()
{
    // Stop playing
    MetaWrap.MacroRecorder.stopPlaying();

    // Stop recording
    MetaWrap.MacroRecorder.stopRecording();

    // Reset the display of the control panel
    MetaWrap.MacroRecorder.ControlPanel.resetActions();

    // Reset the result of all options
    MetaWrap.MacroRecorder.ControlPanel.resetOptions();
}

/*!
    @fn         MetaWrap.MacroRecorder.recordEvent = function(p_type)
    @param      p_type The type of event we are recording
    @return     void
    @brief      This is our capture hook for the onclick event.
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.recordEvent = function(p_type)
{
    ASSERT(p_type != '',"Empty event type");

    // Save the current event
    this.m_recording.m_events.push(new MetaWrap.MacroRecorder.Event(p_type,
                                                this.m_current_event_time,
                                                this.m_current_event_location,
                                                this.m_current_event.button,
                                                this.m_current_event.clientX,
                                                this.m_current_event.clientY,
                                                this.m_current_event.keyCode||this.m_current_event.charCode,
                                                this.m_current_event.altKey,
                                                this.m_current_event.ctrlKey,
                                                this.m_current_event.shiftKey,
                                                this.m_selection.m_start_location,
                                                this.m_selection.m_start,
                                                this.m_selection.m_end_location,
                                                this.m_selection.m_end,
                                                this.m_scroll.m_top,
                                                this.m_scroll.m_left,
                                                this.m_option_select));

     //trace(this.m_recording.m_events.length + " events " + p_type + "," + MetaWrap.Page.Event.Dump(MetaWrap.MacroRecorder.m_current_event,MetaWrap.MacroRecorder.m_current_event_location));
}


/*!
    @fn         MetaWrap.MacroRecorder.handleEvent = function(p_event,p_element,p_target,p_type)
    @param      p_event The event we are recording
    @param      p_element The element that this is causing this event
    @param      p_target The target element that this event is firing against
    @param      p_type The type of event
    @return     void
    @brief      This is our capture hook for the onclick event.
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       May need to simulate event bubbling and capture here
*/
MetaWrap.MacroRecorder.handleEvent = function(p_event,p_element,p_target,p_type)
{
    ASSERT(document.m_uniqueid != undefined,"document.m_uniqueid != undefined");

    // If we are recording then process the event
    if (MetaWrap.MacroRecorder.m_is_recording)
    {
        // If the event processes - then we can record it
        if (this.processEvent(p_event,p_element,p_target))
        {
            // It processed - so lets record the event in or list of recorded events
            this.recordEvent(p_type);
        }
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.startPlaying = function()
    @return     void
    @brief      Start playback
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.startPlaying = function()
{
    // Load the initial page state
    this.m_recording.loadPageState();

    // now we are playing
    this.m_is_playing = true;

    // We start at event 0
    this.m_events_current = 0;

    // We start with 0 elapsed event time
    this.m_events_time = 0;

    // Get the time at which we started
    this.m_start_time = (new Date()).getTime();

    // get the next event
    var l_event_next = this.m_recording.m_events[this.m_events_current];

    // how long should we wait before the next event?
    var l_event_next_delay = 1;

    if (l_event_next != null)
    {
        l_event_next_delay = new Number(l_event_next.m_time);
        this.m_events_time = l_event_next_delay;
    }

    // start the timer - 3...2...1..
    this.m_timer = setTimeout("MetaWrap.MacroRecorder.playEvent.call(MetaWrap.MacroRecorder);",l_event_next_delay);
}

/*!
    @fn         MetaWrap.MacroRecorder.stopPlaying = function()
    @return     void
    @brief      Stop playback of events
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.stopPlaying = function()
{
    // If we are playing..
    if (this.m_is_playing)
    {
        // Clear the timeout
        clearTimeout(this.m_timer);
        this.m_timer = null;

        this.m_is_playing = false;

        // Hide mouse pointer until it's needed
        if (this.m_cursor)
        {
            this.m_cursor.style.display = "none";
        }

        // Hide mouse activity icon till its needed
        if (this.m_mouse_activity_icon)
        {
            this.m_mouse_activity_icon.style.display = "none";
        }

        // Hide keyboard activity icon till its needed
        if (this.m_keyboard_activity_icon)
        {
            this.m_keyboard_activity_icon.style.display = "none";
        }

        // Reset playing status
        //var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.play");
        //l_element.innerHTML = "[play]";
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.stopRecording = function()
    @return     void
    @brief      Stop recording events
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.stopRecording = function()
{
    // If we are recording
    if (this.m_is_recording)
    {
        // stop
        this.m_is_recording = false;

        // Show number of recorder events
        l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.status");
        l_element.innerHTML = this.m_recording.m_events.length + " Events" ;

        // Remove the document hooks
        this.removeAllHooks(document);
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.startRecording = function()
    @return     void
    @brief      Start recording events
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.startRecording = function()
{
    // Get the time at which we started
    this.m_start_time = (new Date()).getTime();

    // Our new events array
    this.m_recording = new MetaWrap.MacroRecorder.Recording();

    // Save the current page state
    this.m_recording.savePageState(document);

    // Record a whole new set of hooks
    this.m_document_hooks = new Array();

    // Add the document event hooks
    this.addAllHooks(document);

    // We are now officialy recording
    this.m_is_recording = true;
}

//@}

/*!
 *@} endgroup mw_javascript_lib_macrorecorder MetaWrap - JavaScript - Macrorecorder
 */

//
// Now load all the rest of the namespaces for this module
//
MwUse("MetaWrap.MacroRecorder.Handlers","mw_lib_macrorecorder_handlers.js");
MwUse("MetaWrap.MacroRecorder.Event","mw_lib_macrorecorder_event.js");
MwUse("MetaWrap.MacroRecorder.Recording","mw_lib_macrorecorder_recording.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel","mw_lib_macrorecorder_controlpanel.js");
MwUse("MetaWrap.MacroRecorder.Customise","mw_lib_macrorecorder_config.js");

