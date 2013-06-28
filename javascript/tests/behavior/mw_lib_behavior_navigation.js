/*

    @file mw_lib_wirewrap.js

    $Id: mw_lib_behavior_navigation.js,v 1.2 2007/08/13 09:53:40 james Exp $

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
 * $Log: mw_lib_behavior_navigation.js,v $
 * Revision 1.2  2007/08/13 09:53:40  james
 * New behaviors
 *
 * Revision 1.1  2007/08/10 08:24:21  james
 * Added bahavior lib
 *
 */


/*! \page mw_javascript_lib_behavior_navigation MetaWrap - JavaScript - Page - Wirewrap
 *
 * \subsection mw_javascript_lib_behavior_navigation Overview
 *
 */

//alert("$Id: mw_lib_behavior_navigation.js,v 1.2 2007/08/13 09:53:40 james Exp $");

/*! \defgroup mw_javascript_lib_behavior_navigation  MetaWrap - JavaScript - Page - Wirewrap
 *@{
 */

// Ensure we have the namespace we need

MwUse("MetaWrap","mw_lib.js");


/*! @name  MetaWrap.Behavior.Navigation Namespace */
//@{

/*!
    @brief      Declare the MetaWrap.Behavior namespace
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Behavior = new Object();

//MwUse("MetaWrap.Behavior","mw_lib_behavior.js");




/*!
    @brief      Declare the MetaWrap.Behavior.Navigation namespace
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Behavior.Navigation = new Object();



MetaWrap.Behavior.Navigation.Page = function()
{
    this.m_path_char = '\\';

    //
    // Because of this rule - we know that we can never have / or \ in a filename or its parameters - it must be escaped or encoded
    //
    if (location.pathname.indexOf(this.m_path_char) == -1)
    {
        // Use the other path character
        this.m_path_char = '/';
    }

    // Get the filename with file extension (later on we strip out the extension)
    this.m_file_name = location.pathname.substring(location.pathname.lastIndexOf(this.m_path_char)+1);

	//alert(this.m_file_name);

    // Get the realfile name - sans extension
    this.m_file_path = location.pathname.substring(0,location.pathname.length - this.m_file_name.length);

    // Get the file extension
    this.m_file_extension = location.pathname.substring(location.pathname.lastIndexOf('.')+1);

    // Get the realfile name - sans extension
    this.m_file_name = this.m_file_name.substring(0,this.m_file_name.length - this.m_file_extension.length - 1);

	//alert(this.m_file_name);

	// fake to demo page name
	//this.m_file_name = "test_8_wirewrap";
}


MetaWrap.Behavior.Navigation.Hint = function(p_up,p_down,p_left,p_right,p_enter)
{
	this.m_transition = [];
	this.m_transition[38] = p_up;
	this.m_transition[40] = p_down;
	this.m_transition[37] = p_left;
	this.m_transition[39] = p_right;
	this.m_transition[13] = p_enter;
}

MetaWrap.Behavior.Navigation.g_navigate = {};

MetaWrap.Behavior.Navigation.g_navigate_verb = [];

MetaWrap.Behavior.Navigation.g_navigate_verb[13] = true;

MetaWrap.Behavior.Navigation.g_focus = "?";

MetaWrap.Behavior.Navigation.g_nav_doinit = true;

MetaWrap.Behavior.Navigation.g_navigation_page = new MetaWrap.Behavior.Navigation.Page();

MetaWrap.Behavior.Navigation.g_navigation_timer = null;

MetaWrap.Behavior.Navigation.Timer = function(p_url)
{
	//alert(p_url + "?");

   if(MetaWrap.Behavior.Navigation.g_navigation_timer)
   {
      clearTimeout(MetaWrap.Behavior.Navigation.g_navigation_timer);
      MetaWrap.Behavior.Navigation.g_navigation_timer  = 0;
   }

   window.location = p_url;
}


MetaWrap.Behavior.Navigation.removeAttribute = function(p_element,p_eventname)
{
	p_element[p_eventname] = null;

	if (p_element.parentNode != null)
	{
		MetaWrap.Behavior.Navigation.removeAttribute(p_element.parentNode,p_eventname);
	}
}


MetaWrap.Behavior.Navigation.addNav = function(p_element,p_up,p_down,p_left,p_right,p_enter)
{
	//alert("kill");

	//MetaWrap.Page.Element.addEventListener(p_element,"mouseover",
	//function(p_event){MetaWrap.Page.Event.stopPropagation(p_event);return false;},true);

	//p_element.onmouseout = function(p_event){MetaWrap.Page.Event.stopPropagation(p_event);return false;};

	//alert(p_element.mouseover);

	//p_element.parentNode.onmouseover = null;

	//for(var l_listener in p_element.mouseover)
	//{
	//	alert(l_listener);
	//}

	// Kill all the events we don't want
	MetaWrap.Behavior.Navigation.removeAttribute(p_element,"onmouseover");
	MetaWrap.Behavior.Navigation.removeAttribute(p_element,"onmouseout");
	MetaWrap.Behavior.Navigation.removeAttribute(p_element,"onclick");
	MetaWrap.Behavior.Navigation.removeAttribute(p_element,"href");

	p_element.onclick = MetaWrap.Behavior.Navigation.OnClick;


	MetaWrap.Behavior.Navigation.g_navigate[p_element.id] = new MetaWrap.Behavior.Navigation.Hint(p_up,p_down,p_left,p_right,p_enter);

	if (MetaWrap.Behavior.Navigation.g_nav_doinit)
	{
		MetaWrap.Behavior.Navigation.g_nav_doinit = false;

		document.onkeypress = MetaWrap.Behavior.Navigation.OnKeyHandler;
	}

	// if we are the focus
	if (MetaWrap.Behavior.Navigation.g_focus == p_element.id)
	{
		// get the focused element
		var l_focused_element = MetaWrap.$(MetaWrap.Behavior.Navigation.g_focus);

		l_focused_element.src = "images/" + MetaWrap.Behavior.Navigation.g_navigation_page.m_file_name + "/" + l_focused_element.id  + "_f2.gif";
	}

}

MetaWrap.Behavior.Navigation.OnClick = function(p_event)
{
	    var l_return = false;

	    var l_event = p_event? p_event : window.event;

	    var nKeyCode = l_event.keyCode ? l_event.keyCode : l_event.which ? l_event.which : void 0;

	    var nCharCode = l_event.charCode;

	    //

	    var l_key = l_event.keyCode;

	    // The state of the SHIFT key
	    var l_shift = l_event.shiftKey || l_event.shiftLeft;

	    // The state of the ALT key
	    var l_alt = l_event.altKey || l_event.altLeft;

	    // The state of the CTRL key
	    var l_ctrl = l_event.ctrlKey || l_event.ctrlLeft;

		//alert("key = " + l_key);

		// get the object that has the focus
		var l_focus = MetaWrap.Behavior.Navigation.g_navigate[MetaWrap.Behavior.Navigation.g_focus];

		var l_transition = l_focus.m_transition[13];

		if (l_transition != null)
		{

			// get the focused element
			var l_focused_element = MetaWrap.$(MetaWrap.Behavior.Navigation.g_focus);

			l_focused_element.src = "images/" + MetaWrap.Behavior.Navigation.g_navigation_page.m_file_name + "/" + l_focused_element.id  + ".gif";

			// Our evaluated target
			var l_target = null;

			// Get the event target
			if (l_event.target)
			{
				// The IE way
				l_target = l_event.target;
			}
			else
			if (l_event.srcElement)
			{
				// The Netscape way
				l_target = l_event.srcElement;
			}

			// defeat Safari bug
			if (l_target && l_target.nodeType == 3)
			{
				l_target = l_target.parentNode
			}


			l_target.src = "images/" + MetaWrap.Behavior.Navigation.g_navigation_page.m_file_name +  "/" + l_target.id  + "_f3.gif";


			MetaWrap.Behavior.Navigation.g_navigation_timer = setTimeout("MetaWrap.Behavior.Navigation.Timer('" + l_transition + "')", 1000);


			try
			{

				var l_event = p_event? p_event : window.event;


				l_return = false;
				l_event.returnValue = false;
				l_event.cancelBubble = true;

				if(document.all)
				{
					//IE
					l_event.keyCode = 0;
				}
				else
				{
					//NS
					l_event.preventDefault();
					l_event.stopPropagation();
				}
			}
			catch(ex)
			{
			}

			return false;

		}

    return l_return;
}

MetaWrap.Behavior.Navigation.OnKeyHandler = function(p_event)
{

    var l_return = true;

    var l_kill = false;

    var l_event = p_event? p_event : window.event;

    var nKeyCode = l_event.keyCode ? l_event.keyCode : l_event.which ? l_event.which : void 0;

    var nCharCode = l_event.charCode;

    //

    var l_key = l_event.keyCode;

    // The state of the SHIFT key
    var l_shift = l_event.shiftKey || l_event.shiftLeft;

    // The state of the ALT key
    var l_alt = l_event.altKey || l_event.altLeft;

    // The state of the CTRL key
    var l_ctrl = l_event.ctrlKey || l_event.ctrlLeft;

	//alert("key = " + l_key);


	//alert(g_focus + " has the lotion");

	// get the object that has the focus
	var l_focus = MetaWrap.Behavior.Navigation.g_navigate[MetaWrap.Behavior.Navigation.g_focus];

	var l_transition = l_focus.m_transition[l_key];

	if (l_transition != null)
	{

		var l_previous_focused_element = MetaWrap.$(MetaWrap.Behavior.Navigation.g_focus);

		// If this is a verb key or if l_transition is a url then go to that url
		if ((MetaWrap.Behavior.Navigation.g_navigate_verb[l_key] == true) || (l_transition.indexOf(".htm") != -1))
		{

			l_previous_focused_element.src = "images/" + MetaWrap.Behavior.Navigation.g_navigation_page.m_file_name +  "/" + l_previous_focused_element.id  + "_f3.gif";

			MetaWrap.Behavior.Navigation.g_navigation_timer = setTimeout("MetaWrap.Behavior.Navigation.Timer('" + l_transition + "')", 1000);
		}
		else
		{





			if (l_transition)
			{
				MetaWrap.Behavior.Navigation.g_focus = l_transition;
				l_kill = true;
			}





			// get the focused element
			var l_focused_element = MetaWrap.$(MetaWrap.Behavior.Navigation.g_focus);


			// force it to take focus
		//	l_focused_element.focus();


			//MetaWrap.doCall(l_focused_element["focus"],l_focused_element);
			//MetaWrap.doCall(l_focused_element["blur"],l_focused_element);

			//alert("new focus is " + l_focused_element.id);



			l_previous_focused_element.src = "Images/" + MetaWrap.Behavior.Navigation.g_navigation_page.m_file_name+ "/" + l_previous_focused_element.id  + ".gif";

			//alert(l_previous_focused_element.src);
			l_focused_element.src = "Images/" + MetaWrap.Behavior.Navigation.g_navigation_page.m_file_name + "/" + l_focused_element.id  + "_f2.gif";
			//alert(l_focused_element.src);

		}


		// We only kill an event that we didn't eat
		if (l_kill)
		{
			try
			{

				var l_event = p_event? p_event : window.event;


				l_return = false;
				l_event.returnValue = false;
				l_event.cancelBubble = true;

				if(document.all)
				{
					//IE
					l_event.keyCode = 0;
				}
				else
				{
					//NS
					l_event.preventDefault();
					l_event.stopPropagation();
				}
			}
			catch(ex)
			{
			}

			return false;
		}
	}

    return l_return;
}

