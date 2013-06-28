/*

    @file mw_lib_page.js

    $Id: mw_lib_page.js,v 1.32 2007/01/18 08:24:53 james Exp $

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
 * $Log: mw_lib_page.js,v $
 * Revision 1.32  2007/01/18 08:24:53  james
 * Radical change to package mechanism
 *
 * Revision 1.31  2006/10/18 08:47:06  james
 * Playing with edit in place
 *
 * Revision 1.30  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:44  james
 * Added macro recorder
 *
 * Revision 1.29  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.28  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.27  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.26  2006/04/22 06:15:42  james
 * Getting option/select working
 *
 * Revision 1.25  2006/04/18 06:34:45  james
 * Expanded macro format to allow for end selections
 *
 * Revision 1.24  2006/04/07 08:48:51  james
 * *** empty log message ***
 *
 * Revision 1.23  2006/03/29 06:41:23  james
 * Latest macro recorder
 *
 * Revision 1.22  2006/03/25 23:57:08  james
 * code tidy up
 *
 * Revision 1.21  2006/03/25 04:39:24  james
 * Made macro recorder more stable
 * Made event hooks multiple document aware
 * Added per element/event event handlers for simulation
 *
 * Revision 1.20  2006/03/21 07:11:06  james
 * Tidy up of code
 * Fixed issue under Firefox with mouse animation
 *
 * Revision 1.19  2006/03/02 02:57:22  james
 * Starting on selection playback
 *
 * Revision 1.18  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.17  2005/10/03 11:30:13  james
 * Tidied up XSLT code. Still needs more work.
 *
 * Revision 1.16  2005/09/26 08:27:18  james
 * Added a simple way of specifying js librray search paths.
 *
 * Revision 1.15  2005/09/26 04:15:57  james
 * Reconsidering moving the existing inline/assigned listener code
 * into MetaWrap.Page.listen. There is a difference between
 * the way that addEventListener deals with these. Once I
 * know what Safari does in this situation I have some hope
 * of emulating the behavior and providing some consistent
 * behavior across all browsers.
 *
 * Revision 1.14  2005/09/26 03:32:04  james
 * Rationlaised some code - investigating dynamic includes
 * under Mozilla.
 *
 * Revision 1.13  2005/09/26 03:20:42  james
 * Fixed C&P typo.
 *
 * Revision 1.12  2005/09/26 03:15:26  james
 * Decided to remove last change to MetaWrap.Page.Element.addEventListener
 * which preserves inline/assigned listeners so that it behaves consistently under
 * Firefox.
 *
 * Moved the behavior to MetaWrap.Page.listen where it makes more sense.
 *
 * Revision 1.11  2005/09/25 13:47:27  james
 * Added automatic javascript namespace/object dependancy
 * resolution so that you can just include top level namespace
 * js libs and they can specify what else is required and load the
 * files in the correct order.
 *
 * Improved MetaWrap.Page.Element.addEventListener so that
 * it deals with existing listeners that have been added by asignment
 * or by inlining.
 *
 * Revision 1.10  2005/09/23 07:34:36  james
 * Tidied up some of the comments.
 *
 * Revision 1.9  2005/09/22 04:29:09  james
 * Making lib quieter for competition
 *
 * Revision 1.8  2005/09/21 16:46:57  james
 * Fixed some typos in the test cases
 * Tried to get IE5 support happening, but I'm too sleepy
 *
 * Revision 1.7  2005/09/21 13:41:46  james
 * Mode code tidy up.
 * Added competiton solution page
 *
 * Revision 1.6  2005/09/21 13:07:53  james
 * Normalising function names so that doxygen generates
 * better comments.
 *
 * Revision 1.5  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.4  2005/09/02 09:18:06  james
 * Rename
 *
 */


/*! \page mw_javascript_lib_page MetaWrap - JavaScript - Page
 *
 * \subsection mw_network_client_http Overview
 *
 * http://developer.mozilla.org/en/docs/DOM:document#Properties
 */

// Used for debugging
//alert("$Id: mw_lib_page.js,v 1.32 2007/01/18 08:24:53 james Exp $");

/*! \defgroup mw_javascript_lib_page  MetaWrap - JavaScript - Page
 *@{
 */

// Ensure we have the namespace we need before we load this page
MwUse("MetaWrap","mw_lib.js");

// Ensure we have the namespaces/objects we need before we start executing
MwRequire("MetaWrap.Page.Element.addEventListener","mw_lib_page_element_addhandler.js");

/*! @name  MetaWrap.Page */
//@{

/*!
    @namespace  MetaWrap.Page
    @brief      Declare the MetaWrap namespace
    @author     James Mc Parlane
    @date       19 October 2002

    Attempt to allocate a function. If we can create a standard object that satisfies all
    our required functions - then we just return that - otherwise we return a custom object
    with custom functions. The way the JacaScript engine works - when this function is
    called as

    var l_obj = new MetaWrap.Network.Client.HTTP();

    If we return anything, it becomes this l_obj.

    We use this to ensure that if the browser is able to support the functions we want with
    existing objects, the existing object is returned and this there is no overhead going
    through any stub functions.

    The bottom line.

    No speed penalty when not emulating - And thats a Good Thing.
*/
MetaWrap.Page = {};

/* We cant store scroll info in an event - so we store it here..*/
MetaWrap.Page.m_scroll = {};
MetaWrap.Page.m_scroll.top = 0;
MetaWrap.Page.m_scroll.left = 0;

/* We cant store selection info in an event - so we store it here..*/
MetaWrap.Page.m_selection = {};
MetaWrap.Page.m_selection.m_ready = false;
MetaWrap.Page.m_selection.m_length = 0;
MetaWrap.Page.m_selection.m_start = 0;
MetaWrap.Page.m_selection.m_end = 0;
MetaWrap.Page.m_selection.m_start_location = "";
MetaWrap.Page.m_selection.m_end_location = "";
MetaWrap.Page.m_selection.m_option_select = "";


/*!
    @fn         MetaWrap.Page.listen = function(p_event,p_function)
    @brief
    @author
    @date
    @todo       Replace and use new event listener code.
*/
MetaWrap.Page.listen = function(p_event_type,p_function)
{
    // Is there an old inline listener
    //var l_old_listener = window["on" + p_event_type];

    // If we had an old listener that is not the shim... (if it *was* the shim I would be worried if we got here)
    //if ((l_old_listener != null) && (l_old_listener != MetaWrap.Page.Element.listenerShimFunction))
    //{
    //  alert("old listener");
    //    // then register it as a listener before we add the new one to preserve what it was doing before
    //    MetaWrap.Page.Element.addEventListener(window,p_event_type,l_old_listener,false);
    //}

    // If we have a function and an event type
    if (p_function && p_event_type)
    {
        //  Register it
        MetaWrap.Page.Element.addEventListener(window,p_event_type,p_function,false);
    }
}




/*!
    @fn         MetaWrap.Page.getElementsBySelector = function(selector,p_parent)
    @brief      Returns an array of element objects from the current document matching the CSS selector. Selectors can contain element names, class names and ids and can be nested.
    @author     Simon Willison
    @date       2004
	
	Changes by James Mc Parlane
	
	p_parent sets a local context

   The following code is Copyright (C) Simon Willison 2004.

   document.getElementsBySelector(selector)
   - returns an array of element objects from the current document
     matching the CSS selector. Selectors can contain element names,
     class names and ids and can be nested. For example:

       elements = document.getElementsBySelect('div#main p a.external')

     Will return an array of all 'a' elements with 'external' in their
     class attribute that are contained inside 'p' elements that are
     contained inside the 'div' element which has id="main"

   New in version 0.4: Support for CSS2 and CSS3 attribute selectors:
   See http://www.w3.org/TR/css3-selectors/#attribute-selectors

   Version 0.4 - Simon Willison, March 25th 2003
   -- Works in Phoenix 0.5, Mozilla 1.3, Opera 8, Internet Explorer 6, Internet Explorer 5 on Windows
   -- Opera 7 fails
*/
MetaWrap.Page.getElementsBySelector = function(selector,p_parent)
{
    // Attempt to fail gracefully in lesser browsers
    if (!document.getElementsByTagName)
    {
        return new Array();
    }

    // Split selector in to tokens
    var tokens = selector.split(' ');

    var currentContext = new Array(document);
	
	if (p_parent != null)
	{
		currentContext = new Array(p_parent);
	}
	else
	{
		currentContext = new Array(document);
	}

    for (var i = 0; i < tokens.length; i++)
    {
        //alert("tokens[i] = '" + tokens[i] + "'");

        token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;

        //alert("token = " + token);

        if (token.indexOf('#') > -1)
        {
            // Token is an ID selector
            var bits = token.split('#');
            var tagName = bits[0];
            var id = bits[1];
            var element = document.getElementById(id);

            if (tagName && element.nodeName.toLowerCase() != tagName)
            {
                // tag with that ID not found, return false
                return new Array();
            }
            // Set currentContext to contain just this element
            currentContext = new Array(element);
            continue; // Skip to next token
        }

        if (token.indexOf('.') > -1)
        {
            // Token contains a class selector
            var bits = token.split('.');
            var tagName = bits[0];
            var className = bits[1];
            if (!tagName)
            {
                tagName = '*';
            }
            // Get elements matching tag, filter them for class selector
            var found = new Array;
            var foundCount = 0;
            for (var h = 0; h < currentContext.length; h++)
            {
                var elements;
                if (tagName == '*')
                {
                    elements = MetaWrap.getAllChildren(currentContext[h]);
                }
                else
                {
                    elements = currentContext[h].getElementsByTagName(tagName);
                }

                for (var j = 0; j < elements.length; j++)
                {
                    found[foundCount++] = elements[j];
                }
            }

            currentContext = new Array;
            var currentContextIndex = 0;
            for (var k = 0; k < found.length; k++)
            {
                if (found[k].className && found[k].className.match(new RegExp('\\b'+className+'\\b')))
                {
                    currentContext[currentContextIndex++] = found[k];
                }
            }
            continue; // Skip to next token
        }

        // Code to deal with attribute selectors
        if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/))
        {
            var tagName = RegExp.$1;
            var attrName = RegExp.$2;
            var attrOperator = RegExp.$3;
            var attrValue = RegExp.$4;
            if (!tagName)
            {
                tagName = '*';
            }
            // Grab all of the tagName elements within current context
            var found = new Array;

            var foundCount = 0;
            for (var h = 0; h < currentContext.length; h++)
            {
                var elements;

                if (tagName == '*')
                {
                    elements = MetaWrap.getAllChildren(currentContext[h]);
                }
                else
                {
                    elements = currentContext[h].getElementsByTagName(tagName);
                }

                for (var j = 0; j < elements.length; j++)
                {
                    found[foundCount++] = elements[j];
                }
            }

            currentContext = new Array;

            var currentContextIndex = 0;

            var checkFunction; // This function will be used to filter the elements

            switch (attrOperator)
            {
                case '=': // Equality
                    checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue); };
                break;

                case '~': // Match one of space seperated words
                    checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('\\b'+attrValue+'\\b'))); };
                break;

                case '|': // Match start with value followed by optional hyphen
                    checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))); };
                break;

                case '^': // Match starts with value
                    checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0); };
                break;

                case '$': // Match ends with value - fails with "Warning" in Opera 7
                    checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length); };
                break;

                case '*': // Match ends with value
                    checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1); };
                break;

                default :
                    // Just test for existence of attribute
                    checkFunction = function(e) { return e.getAttribute(attrName); };
            }
            currentContext = new Array;
            var currentContextIndex = 0;
            for (var k = 0; k < found.length; k++)
            {
                if (checkFunction(found[k]))
                {
                    currentContext[currentContextIndex++] = found[k];
                }
            }
            // alert('Attribute Selector: '+tagName+' '+attrName+' '+attrOperator+' '+attrValue);
            continue; // Skip to next token
        }

        if (!currentContext[0])
        {
            return;
        }

        // If we get here, token is JUST an element (not a class or ID selector)
        tagName = token;
        var found = new Array;
        var foundCount = 0;
        for (var h = 0; h < currentContext.length; h++)
        {
            var elements = currentContext[h].getElementsByTagName(tagName);
            for (var j = 0; j < elements.length; j++)
            {
                found[foundCount++] = elements[j];
            }
        }
        currentContext = found;
    }

    return currentContext;
}

/* That revolting regular expression explained
/^(\w+)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/
  \---/  \---/\-------------/    \-------/
    |      |         |               |
    |      |         |           The value
    |      |    ~,|,^,$,* or =
    |   Attribute
   Tag
*/

/*!
    @fn         MetaWrap.Page.selectRange = function (p_element,p_start, p_length)
    @param      p_element The text box we are operating on
    @param      p_start The start index character
    @param      p_length The number of characters to select
    @brief      Add a function to be called after page loads
    @author     James Mc Parlane
    @date

    Make any window.onload and <body>.onload into our list of startup events and esure that they get called first.
*/
MetaWrap.Page.selectRange = function (p_element,p_start, p_length)
{
    if (p_element.createTextRange)
    {
        var l_range = p_element.createTextRange();
        l_range.moveStart("character", p_start);
        l_range.moveEnd("character", p_length - p_element.value.length);
        l_range.select();
    }
    else
    if (p_element.setSelectionRange)
    {
        p_element.setSelectionRange(p_start, p_length);
    }

    p_element.focus();
};

/*!
    @fn         MetaWrap.Page.selectRange = function (p_element,p_start, p_length)
    @param      p_element The text box we are operating on
    @param      p_start The start index character
    @param      p_length The number of characters to select
    @brief      Add a function to be called after page loads
    @author     James Mc Parlane
    @date

    Make any window.onload and <body>.onload into our list of startup events and esure that they get called first.
*/
MetaWrap.Page.getSelection = function ()
{
    var txt = "";

    if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}

	return txt;
}

/*
    @brief  Array of functions to call when DOM loads, before we call all the functions in m_deferred_onloads.
*/
MetaWrap.Page.m_onloads = new Array();

/*
    @brief  Array of functions to call when dom loads, after we call all the functions in m_onloads.
*/
MetaWrap.Page.m_deferred_onloads = new Array();

/*!
    @fn         MetaWrap.Page.addOnLoad = function(p_function)
    @brief      Add a function to be called after page loads
    @author     James Mc Parlane
    @date

    Make any window.onload and <body>.onload into our list of startup events and esure that they get called first.
*/
MetaWrap.Page.addOnLoad = function(p_function)
{
    /*
        If we are going to add something to our own onload, then we
        We want to control when the traditional <BODY>.onload and window.onload
        is called.

        So first we make sure that the browesr single <BODY>.onload and window.onload are
        deffered.....
    */

    // Find me some 'body' to love.
    l_body = document.getElementsByTagName("body");

    // if we found a body
    if (l_body[0] != null)
    {
        // if it has an onload
        if (l_body[0].onload != null)
        {
            // add it to our array so we can control when it gets called
            this.m_deferred_onloads[this.m_deferred_onloads.length] = l_body[0].onload;

            // null it to make sure that the browser does not call it - because we are going to call it for the browser
            l_body[0].onload = null;
        }
    }

    // If window.onload is activce
    if (window.onload != null)
    {
        // add it to our array so we can control when it gets called
        this.m_deferred_onloads[this.m_deferred_onloads.length] = window.onload;

        // null it to make sure that the browser does not call it - because we are going to call it for the browser
        window.onload = null;
    }

    /*
        ... Then we a add our handler, safe in the knowledge that it will be called <BODY>.onload and window.onload
    */

    // add this function to our onloads
    this.m_onloads[this.m_onloads.length] = p_function;
}


/*!
    @fn         MetaWrap.Page.postLoadInit = function()
    @brief      Add a function to be called after page loads
    @author     James Mc Parlane
    @date
    @warn       when this is called - 'this' is not MetaWrap.Page

    Make any window.onload and <body>.onload into our list of startup events and esure that they get called first.
*/
MetaWrap.Page.postLoadInit = function()
{
       // quit if this function has already been called
       if (arguments.callee.done) return;

       // flag this function so we don't do the same thing twice
       arguments.callee.done = true;

       // Run all the body onloads first
       for(var i = 0;i<MetaWrap.Page.m_deferred_onloads.length;i++)
       {
            // call the function
            (MetaWrap.Page.m_deferred_onloads[i])();
       }
       // Now run our onloads
       for(var i = 0;i<MetaWrap.Page.m_onloads.length;i++)
       {
            // call the function
            (MetaWrap.Page.m_onloads[i])();
       }
};

/* for Mozilla/Firefox */
if (document.addEventListener)
{
    // Call MetaWrap.Page.postLoadInit once content is loaded
    document.addEventListener("DOMContentLoaded", MetaWrap.Page.postLoadInit , null);
}



/* Because cc_on is broken in this javascript library for some
   reason... - possibly the doxygen @ in comments we need to
   do this check in this style */
if (navigator.appName=="Microsoft Internet Explorer")
{

     // This means we no longer need mw_lib_page_onload.js - which solves some testing issues
     document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");

     // Get the script element by id
     var l_ie_script = document.getElementById("__ie_onload");

     // When it believes its ready state has changed,,,
     l_ie_script.onreadystatechange = function()
     {
     	// to signify that it has completed loading (this happens after the page has loaded)
     	if (this.readyState == "complete")
     	{
     		// Call the postLoadInit function which will call all methods added using MetaWrap.Page.addOnLoad
     		MetaWrap.Page.postLoadInit();
     	}
     };
}


/* for Safari Webkit */
if (/WebKit/i.test(navigator.userAgent))
{
	// Start an interval timer
	var l_safari_timer = setInterval(
		function()
			{
				// If we have loaded
				if (/loaded|complete/.test(document.readyState))
				{
					// clear the timer
					clearInterval(l_safari_timer);

					// Call the postLoadInit function which will call all methods added using MetaWrap.Page.addOnLoad
					MetaWrap.Page.postLoadInit();
				}
			},
		100);
}


/*!
 *@} endgroup mw_javascript_lib_page MetaWrap - JavaScript - Page
 */

/*!
 *@} end of MetaWrap.Page
 */
