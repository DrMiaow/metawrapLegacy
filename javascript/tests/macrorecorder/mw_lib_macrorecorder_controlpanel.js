/*

    @file mw_lib_macrorecorder_controlpanel.js

    $Id: mw_lib_macrorecorder_controlpanel.js,v 1.25 2007/04/03 12:40:17 james Exp $

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
 * $Log: mw_lib_macrorecorder_controlpanel.js,v $
 * Revision 1.25  2007/04/03 12:40:17  james
 * Fixed include system
 *
 * Revision 1.24  2006/09/29 12:20:31  james
 * Fixed a bug in the javascript macro recorder
 *
 * Revision 1.23  2006/09/21 05:19:37  james
 * Latest changes
 *
 * Revision 1.3  2006/09/18 08:37:03  james
 * Added latest macro recorder files...
 * Added macro recorder to index_demo.html
 *
 * Revision 1.22  2006/09/12 05:58:03  james
 * Latest release of the macro recorder
 *
 * Revision 1.22  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:41  james
 * Added macro recorder
 *
 * Revision 1.21  2006/07/16 22:16:18  james
 * Latest changes to getting the flash connector running properly
 * Flash can only be contacted after the document is loaded
 *
 * Revision 1.20  2006/06/02 23:52:09  james
 * Added support for remote mouse images
 *
 * Revision 1.19  2006/05/31 13:53:49  james
 * getting logger to work cleanly with application
 *
 * Revision 1.18  2006/05/31 12:45:00  james
 * Changed package formal
 *
 * Revision 1.17  2006/05/31 07:59:36  james
 * *** empty log message ***
 *
 * Revision 1.16  2006/05/31 07:44:37  james
 * Moved icons out of the way of the control panel
 *
 * Revision 1.15  2006/05/30 10:49:19  james
 * Latest version of libraries with package support.
 *
 * Revision 1.14  2006/05/29 15:16:16  james
 * Added testcase for the production library
 *
 * Revision 1.13  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.12  2006/05/17 11:48:14  james
 * Macro recorder fixes
 *
 * Revision 1.11  2006/05/10 12:35:39  james
 * Just need to wire up autosaver and we are done
 *
 * Revision 1.10  2006/05/09 11:12:53  james
 * Added plugins
 * Added stub for autosaver
 *
 * Revision 1.9  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.8  2006/05/07 10:36:09  james
 * Refactored events options so that they now interact properly.
 *
 * Revision 1.7  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.6  2006/05/06 12:11:21  james
 * More refactoring
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
 */

/*! \page mw_javascript_lib_macrorecorder_controlpanel MetaWrap - JavaScript - MacroRecorder - ControlPanel
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel Overview
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel.js,v 1.25 2007/04/03 12:40:17 james Exp $");

/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel MetaWrap - JavaScript - MacroRecorder - ControlPanel
 *@{
 */

//
// Ensure we have the namespaces we need
//
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.Serialise","mw_lib_xml_serialise.js");
MwUse("MetaWrap.Page","mw_lib_page.js");
MwUse("MetaWrap.Page.Selection","mw_lib_page_selection.js");
MwUse("MetaWrap.Page.Event.Simulate","mw_lib_page_event_simulate.js");
MwUse("MetaWrap.Page.Element.addEventListener","mw_lib_page_element_addhandler.js");
MwUse("MetaWrap.MacroRecorder","mw_lib_macrorecorder.js");
//
// Now that we have the pre-requisite namespaces, then off we go
//

/*! @name MetaWrap.MacroRecorder.ControlPanel Namespace */
//@{

/*
    @brief  Declare control panel namespace
*/
MetaWrap.MacroRecorder.ControlPanel = {};
MetaWrap.MacroRecorder.ControlPanel.Plugins = {};

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onActionClick = function(p_name)
    @param      p_name The name of the action to run
    @return     void
    @brief      Render the controlpanel
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onActionClick = function(p_name,p_this)
{
    // Load all options
    MetaWrap.MacroRecorder.ControlPanel.loadOptions();

    // Make sure the options get to know what action is underway
    MetaWrap.MacroRecorder.ControlPanel.implementOptions(p_name);

    // Call the action
    MetaWrap.MacroRecorder.ControlPanel.Actions[p_name].call(p_this);
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onOptionClick = function(p_name)
    @param      p_name The name of the action to run
    @return     void
    @brief      Render the controlpanel
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onOptionClick = function(p_name,p_this)
{
    MetaWrap.MacroRecorder.ControlPanel.Options[p_name].call(MetaWrap.MacroRecorder.ControlPanel.Options[p_name],p_this);
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.updateStatus = function()
    @return     void
    @brief      Update the events count
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.updateStatus = function()
{
    var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.status");
    l_element.innerHTML = MetaWrap.MacroRecorder.m_recording.m_events.length + " Events" ;
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.render = function()
    @return     void
    @brief      Render the controlpanel
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Handle XHTML Documents
*/
MetaWrap.MacroRecorder.ControlPanel.render = function()
{
    var l_string = '';

    var l_r = MetaWrap.MacroRecorder;

    // The standard control panel
    l_string += '<div id="MetaWrap.MacroRecorder.ControlPanel" style="position:absolute;top:0;left:0px;z-index:2147483647;color:white;background:black;border:0px;" >';

    // Render Actions
    var l_actions = this.Actions;

    for(var l_a in l_actions)
    {
        l_string += '<a id="MetaWrap.MacroRecorder.ControlPanel.Actions.' + l_a + '" onclick="MetaWrap.MacroRecorder.ControlPanel.onActionClick(\'' + l_a + '\',this)">[' + l_a + ']</a>';
    }

    // Render Options
    var l_options = this.Options;

    for(var l_o in l_options)
    {
        l_string += '[<input id="MetaWrap.MacroRecorder.ControlPanel.Options.' + l_o + '" type="checkbox" onclick="MetaWrap.MacroRecorder.ControlPanel.onOptionClick(\'' + l_o + '\',this)" > ' + l_o + ']';
    }

    l_string += '[<span id="MetaWrap.MacroRecorder.ControlPanel.status">0 Events Recorded</span>]';
    l_string += '</div>';


    // work out where we should load the mouse images from
    var l_img_location = "";

    if (document.location.protocol == "http:")
    {
    	l_img_location = "http://js.metawrap.com/";
    }

    // The representation of the mouse pointer
    l_string += '<div id="MetaWrap.MacroRecorder.cursor" style="position:absolute;top:0;left:0;z-index:2147483647;" width="11px" height="19px" ><img src="' + l_img_location + 'images/cursor_arrow.gif"/></div>';
    l_string += '<div id="MetaWrap.MacroRecorder.keyboard" style="position:absolute;top:22px;left:2px;z-index:2147483647;" width="74px" height="37px" ><img src="' + l_img_location + 'images/keyboard.gif"/></div>';
    l_string += '<div id="MetaWrap.MacroRecorder.mouse" style="position:absolute;top:22px;left:78px;z-index:2147483647;" width="48px" height="37px" ><img src="' + l_img_location + 'images/mouse.gif"/></div>';


    var l_body = document.body;

    // Got a body?
    if (l_body != null)
    {

        // document.write won't work then - need to create a div
        var l_div = null;

        // already got one?
        l_div = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Container");

        if (l_div == null)
        {
            var l_div = document.createElement("div");
            l_div.id="MetaWrap.MacroRecorder.ControlPanel.Container";
            l_body.appendChild(l_div);
        }

        l_div.innerHTML = l_string;
    }
    else
    {
        // no body yet, just write it into the page
        document.write(l_string);
    }

    // Wire up the mouse cursor
    l_r.m_cursor = document.getElementById("MetaWrap.MacroRecorder.cursor");

    // Tell the event simulator what icon to use in a cursor
    MetaWrap.Page.Event.Simulate.m_cursor = l_r.m_cursor;

    // Hide mouse pointer until it's needed
    if (l_r.m_cursor)
    {
        l_r.m_cursor.style.display = "none";
    }
    else
    {
        error("unable to hide 'MetaWrap.MacroRecorder.cursor'");
    }

    // Wire up the mouse activity icon
    l_r.m_mouse_activity_icon = document.getElementById("MetaWrap.MacroRecorder.mouse");

    // Tell the event simulator what icon to use in a mouse activity icon
    MetaWrap.Page.Event.Simulate.m_mouse_activity_icon = l_r.m_mouse_activity_icon;

    // Hide mouse activity icon till its needed
    if (l_r.m_mouse_activity_icon)
    {
        l_r.m_mouse_activity_icon.style.display = "none";
    }
    else
    {
        error("unable to hide 'MetaWrap.MacroRecorder.mouse'");
    }

    // Wire up the keyboard activity icon
    l_r.m_keyboard_activity_icon = document.getElementById("MetaWrap.MacroRecorder.keyboard");

    // Tell the event simulator what icon to use in a keyboard activity icon
    MetaWrap.Page.Event.Simulate.m_keyboard_activity_icon = l_r.m_keyboard_activity_icon;

    // Hide keyboard activity icon till its needed
    if (l_r.m_keyboard_activity_icon)
    {
        l_r.m_keyboard_activity_icon.style.display = "none";
    }
    else
    {
        error("unable to hide 'MetaWrap.MacroRecorder.keyboard'");
    }

}





/*! @name MetaWrap.MacroRecorder.ControlPanel.Actions Namespace */
//@{

MetaWrap.MacroRecorder.ControlPanel.Actions = {};

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.resetActions = function()
    @return     void
    @brief      Reset the control panel action state
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.resetActions = function()
{
    MetaWrap.doOnIn(this.Actions,"reset");

    /*
    // Our actions
    var l_actions = this.Actions;

    for(var l_a in l_actions)
    {
        if (l_actions[l_a].reset != null)
        {
            l_actions[l_a].reset();
        }
    }
    */
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onloadActions = function()
    @return     void
    @brief      Reset the control panel action state
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onloadActions = function()
{

    MetaWrap.doOnIn(this.Actions,"onload");

    /*
    // Our actions
    var l_actions = this.Actions;

    for(var l_a in l_actions)
    {
        if (l_actions[l_a].onload != null)
        {
            l_actions[l_a].onload();
        }
    }
    */
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onload = function()
    @return     void
    @brief      Tell all the control panel actions that the page is being unloaded
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onload = function()
{
    MetaWrap.MacroRecorder.ControlPanel.onloadActions();
}

// Make sure that the onunload is called when page unloads
MetaWrap.Page.listen("load",MetaWrap.MacroRecorder.ControlPanel.onload);

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onunloadActions = function()
    @return     void
    @brief      Tell all the control panel actions that the page is being unloaded
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onunloadActions = function()
{
    MetaWrap.doOnIn(this.Actions,"onunload");
/*
    // Our actions
    var l_actions = this.Actions;

    for(var l_a in l_actions)
    {
        if (l_actions[l_a].onunload != null)
        {
            l_actions[l_a].onunload();
        }
    }
*/
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onunload = function()
    @return     void
    @brief      Tell all the control panel actions that the page is being unloaded
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onunload = function()
{
    MetaWrap.MacroRecorder.ControlPanel.onunloadActions();
}

// Make sure that the onunload is called when page unloads
MetaWrap.Page.listen("unload",MetaWrap.MacroRecorder.ControlPanel.onunload);

//@}



/*! @name MetaWrap.MacroRecorder.ControlPanel.Options Namespace */
//@{

MetaWrap.MacroRecorder.ControlPanel.Options = {};

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.loadOptions = function()
    @return     void
    @brief      Load all the options
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.loadOptions = function()
{
    //alert("MetaWrap.MacroRecorder.ControlPanel.loadOptions");

    // Our actions
    var l_options = this.Options;

    for(var l_o in l_options)
    {
        if (l_options[l_o])
        {
            var l_element  = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Options." + l_o);
            l_options[l_o](l_element);
        }
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.implementOptions = function(p_action)
    @return     void
    @brief      Reset the control panel
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.implementOptions = function(p_action)
{
    // Our actions
    var l_options = MetaWrap.MacroRecorder.ControlPanel.Options;

    for(var l_o in l_options)
    {
        if (l_options[l_o].implement)
        {
            var l_element  = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Options." + l_o);
            l_options[l_o].implement(l_element,p_action);
        }
    }
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.resetOptions = function()
    @return     void
    @brief      Reset the control panel
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.resetOptions = function()
{
    // Our actions
    var l_options = MetaWrap.MacroRecorder.ControlPanel.Options;

    for(var l_o in l_options)
    {
        if (l_options[l_o].reset)
        {
            var l_element  = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Options." + l_o);
            l_options[l_o].reset(l_element);
        }
    }
}

//@}

/*! @name MetaWrap.MacroRecorder.ControlPanel.Plugins Namespace */
//@{

MetaWrap.MacroRecorder.ControlPanel.Plugins = {};

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.resetPlugins = function()
    @return     void
    @brief      Reset the control panel action state
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.resetPlugins = function()
{
    MetaWrap.doOnIn(this.Plugins,"reset");
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onloadPlugins = function()
    @return     void
    @brief      Reset the control panel action state
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onloadPlugins = function()
{
    MetaWrap.doOnIn(this.Plugins,"onload");
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onload = function()
    @return     void
    @brief      Tell all the control panel actions that the page is being unloaded
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onload = function()
{
    MetaWrap.MacroRecorder.ControlPanel.onloadPlugins();
}

// Make sure that the onload is called when page unloads
MetaWrap.Page.listen("load",MetaWrap.MacroRecorder.ControlPanel.onload);

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onunloadPlugins = function()
    @return     void
    @brief      Tell all the control panel actions that the page is being unloaded
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onunloadPlugins = function()
{
    MetaWrap.doOnIn(this.Plugins,"onunload");
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.onunload = function()
    @return     void
    @brief      Tell all the control panel actions that the page is being unloaded
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.MacroRecorder.ControlPanel.onunload = function()
{
    MetaWrap.MacroRecorder.ControlPanel.onunloadPlugins();
}

// Make sure that the onunload is called when page unloads
MetaWrap.Page.listen("unload",MetaWrap.MacroRecorder.ControlPanel.onunload);

//@}

//@}

/*!
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel MetaWrap - JavaScript - MacroRecorder - ControlPanel
 */
