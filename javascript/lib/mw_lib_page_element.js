/*

    @file mw_lib_page_element.js

    $Id: mw_lib_page_element.js,v 1.19 2007/11/07 02:03:49 james Exp $

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
 * $Log: mw_lib_page_element.js,v $
 * Revision 1.19  2007/11/07 02:03:49  james
 * Support for new wirewrap operations
 *
 * Revision 1.18  2007/10/24 09:44:12  james
 * Working out the semantics of the new skin system
 *
 * Revision 1.17  2007/02/05 03:34:25  james
 * *** empty log message ***
 *
 * Revision 1.16  2007/01/20 12:33:59  james
 * Added more to editor
 *
 * Revision 1.15  2007/01/20 01:23:51  james
 * More progress with Editor
 *
 * Revision 1.14  2007/01/19 07:19:02  james
 * Latest changes to javascript engine
 *
 * Revision 1.13  2007/01/18 08:24:53  james
 * Radical change to package mechanism
 *
 * Revision 1.12  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:45  james
 * Added macro recorder
 *
 * Revision 1.11  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.10  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.9  2006/03/21 07:11:06  james
 * Tidy up of code
 * Fixed issue under Firefox with mouse animation
 *
 * Revision 1.8  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.7  2005/10/23 07:57:32  james
 * Added better garbage collector code that uses scrubbing
 * Made sure that cancelEvent and stopPropagation works as advertised.
 *
 * Revision 1.6  2005/09/23 07:34:36  james
 * Tidied up some of the comments.
 *
 * Revision 1.5  2005/09/22 04:29:09  james
 * Making lib quieter for competition
 *
 * Revision 1.4  2005/09/21 16:46:57  james
 * Fixed some typos in the test cases
 * Tried to get IE5 support happening, but I'm too sleepy
 *
 * Revision 1.3  2005/09/21 13:41:46  james
 * Mode code tidy up.
 * Added competiton solution page
 *
 * Revision 1.2  2005/09/21 13:07:53  james
 * Normalising function names so that doxygen generates
 * better comments.
 *
 * Revision 1.1  2005/09/21 06:47:23  james
 * Moved some code around into more logical
 * namespaces.
 *
 */

/*! \page mw_javascript_lib_page_element MetaWrap - JavaScript - Page -  Element
 *
 *
 *
 *  Handy tool
 *  http://muffinresearch.co.uk/code/javascript/DOMTool/
 */

// Used for debugging
//alert("$Id: mw_lib_page_element.js,v 1.19 2007/11/07 02:03:49 james Exp $");

/*! \defgroup mw_javascript_lib_page_element  MetaWrap - JavaScript - Page -  Element
 *@{
 */

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");

/*! @namespace  MetaWrap.Page.Element */
MetaWrap.Page.Element = {};

/*! @name       MetaWrap.Page.Element */
//@{

/* The current event */
MetaWrap.Page.Element.m_event = null;

/* The current event target */
MetaWrap.Page.Element.m_target = null;

/* The cancelation state of the current event */
MetaWrap.Page.Element.m_cancel = false;

/*!
    @brief      Seed value for element unique id
*/
MetaWrap.Page.Element.m_uniqueid = 0;

/*!
    @fn         MetaWrap.Page.Element.uniqueID = function(p_element)
    @param     p_element A reference to the element we want to get the unique id for
    @return     a string representing the unique ID for an element
    @brief      Returns the unique ID for an element
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       I assume that document.addEventListener => element.addEventListener and document|element.removeEventListener Is this correct?
*/
MetaWrap.Page.Element.uniqueID = function(p_element)
{
    // If browser does not provide uniqueID for free (IE)
    if (p_element.uniqueID == null)
    {
        // Then generate a unique ID
        p_element.uniqueID = "uid_" + MetaWrap.Page.Element.m_uniqueid++;
    }

    // Return the unique ID
    return p_element.uniqueID;
}

/*!
    @fn         MetaWrap.Page.Element.scrub = function(p_element)
    @param      p_element A reference to the element we want to scrub
    @return     void
    @brief      Nulls element references that commonly cause circular references.
    @author     James Mc Parlane
    @date       6 September 2005

    Called for every Element that is garbage collected by
    MetaWrap.Page.garbageCollectListeners() or by the teardown code
    MetaWrap.Page.deleteListeners()

    As a generic leak pattern cleanup, this solution is only
    effective for elements have had a listener added via
    MetaWrap.Page.Element.addEventListener

    Works by nulling event listeners and custom expanded members.

    This will only work if you use the following naming standard
    for your custom expansions of the element object.

    m_XXX eg. m_flipover
    $XXXX eg. $flipover

*/
MetaWrap.Page.Element.scrub = function(p_element)
{
    // For each member of the element
    for(var l_member in p_element)
    {
        // If its an event listeners or one of my user assigned
        // members m_XXX, $XXX (self imposed naming standard)
        if ((l_member.indexOf("on") == 0) ||
            (l_member.indexOf("m_") == 0) ||
            (l_member.indexOf("$") == 0))
        {
            // Break the potential circular reference
            p_element[l_member] = null;
        }
    }
}

/*!
    @fn         MetaWrap.Page.Element.getRect = function(p_element)
    @param      p_element A reference to the element we want to get the rectangle
    @return     {m_x,m_y,m_w,m_h}
    @brief
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.getRect = function(p_element)
{
	// What we want
    var l_left = 0;
    var l_top = 0;
    var l_width = p_element.offsetWidth;
    var l_height = p_element.offsetHeight;

    // Width and height was easy, left and top requres some work
    if (p_element.offsetParent)
    {
        l_left = p_element.offsetLeft
        l_top = p_element.offsetTop
        while (p_element = p_element.offsetParent)
        {
            l_left += p_element.offsetLeft
            l_top += p_element.offsetTop
        }
    }

    // Build our object and return
    return {m_x:l_left,m_y:l_top,m_w:l_width,m_h:l_height};
}

/*!
    @fn         MetaWrap.Page.Element.swapContent = function(p_a,p_b)
    @param      p_a Swap content with this and p_b
    @param      p_b Swap content with this and p_a
    @return     void
    @brief      Swaps content between two elements
    @author     James Mc Parlane
    @date       6 September 2005

    @warning    I have seen this crash IE when using flash

*/
MetaWrap.Page.Element.swapContent = function(p_a,p_b)
{
	// Child elements we swap
	var l_a = p_a.firstChild;
	var l_b = p_b.firstChild;

	// The first element in from is our sentinel - when we find this when we copy from Pa
	var l_a_first = l_a;

    //var l_count_a = 0;

	// Copy everything in p_a, to the end of p_to, in the correct order
	while(l_a != null)
	{
		var l_next = l_a.nextSibling;
        p_a.removeChild(l_a);
		p_b.appendChild(l_a);
		l_a = l_next;
        //l_count_a++;
	}

    //var l_count_b = 0;

	/*
		Copy everything in p_to, to p_a - stop when we hit l_a_first in
	 	p_b - that will mark the start of what we copied into p_b
	 	previously and so marks the end of the original content in l_b
	 */

	while((l_b != l_a_first) && (l_b != null))
	{
		var l_next = l_b.nextSibling;
        p_b.removeChild(l_b);
		p_a.appendChild(l_b);
		l_b = l_next;

        //l_count_b++;
	}


    //alert(l_count_a + " " + l_count_b);
}


/*!
    @fn         MetaWrap.Page.Element.swapElements = function(p_a,p_b)
    @param      p_a Swap this with p_b
    @param      p_b Swap this with p_a
    @return     void
    @brief      Swaps content between two elements
    @author     James Mc Parlane
    @date       6 September 2005

    @warning    I have seen this crash IE when using flash

    http://developer.mozilla.org/en/docs/DOM:element.insertBefore

*/
MetaWrap.Page.Element.swapElements = function(p_a,p_b)
{
	alert("swapElements");

        var l_parent = p_a.parentNode;
        var l_a_next = p_a.nextSibling;

        l_parent.insertBefore(p_a, p_b);
        l_parent.insertBefore(p_b, ((p_b == l_a_next) ? p_a : l_a_next));
/*

    // Child elements we swap
    var l_a_parent = p_a.parentNode;
    var l_b_parent = p_b.parentNode;


    // If both have the same parent
    if (l_a_parent == l_b_parent)
    {
        // one is just before the other
        if ((p_a.nextSibling == p_b) || (p_b.nextSibling == p_a))
        {
            // XXX
            // p_a
            // p_b
            // XXX

            // or

            // XXX
            // p_b
            // p_a
            // XXX


            //alert("adjacent ");

            // normalise so that p_a is before p_b
            if (p_b.nextSibling == p_a)
            {
                var l_temp = p_a;
                p_a = p_b;
                p_b = l_temp;
            }

            // XXX
            // p_a
            // p_b
            // XXX

            // Remove b
            l_b_parent.removeChild(p_b);

            // add it before A
            l_a_parent.insertBefore(p_b,p_a);

        }
        else
        {
            alert("not adjacent");

            // XXX
            // p_a
            // ???
            // p_b
            // XXX

            // or

            // XXX
            // p_b
            // ???
            // p_a
            // XXX

            // which one has something after it?

            var l_a_next = p_a.nextSibling;

            if (p_a == null)
            {
                // Then p_b MUST have something after it or we can't be siblings and not adjacent

            	var l_b_next = p_b.nextSibling;

            }
            else
            {
            	// Remove a
	            l_a_parent.removeChild(p_a);

            	// add it before B
	            l_b_parent.insertBefore(p_a,p_b);

            	// Remove b
	            l_b_parent.removeChild(p_b);

            	// add b after l_a_next
	            l_b_parent.insertAfter(p_b,l_a_next);
			}

            // XXX
            // p_b
            //
            // p_a
            // XXX

        }
    }
    else
    {
        alert("not same parent");
    }


*/

    //
    //l_b_parent.removeChild(p_b);

}

/*!
    @fn         MetaWrap.Page.Element.getStyle = function(p_element,p_style_property)
    @param      p_element The element to get the value of style property from
    @param      p_style_property The style property to get from p_element
    @return     string/number/object
    @brief      Gets the style property from the element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.getStyle = function(p_element,p_style_property)
{
	var l_element = document.getElementById(p_element);

	if (l_element.currentStyle)
	{
		return l_element.currentStyle[p_style_property];
	}
	else
	if (window.getComputedStyle)
	{
		return document.defaultView.getComputedStyle(l_element,null).getPropertyValue(p_style_property);
	}
	return null;
}

/*!
    @fn         MetaWrap.Page.Element.remove = function(p_element)
    @param      p_element The element to remove
    @return     void
    @brief      Removed an element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.remove = function(p_element)
{
	p_element.parentNode.removeChild(p_element);
}


/*!
    @fn         MetaWrap.Page.Element.replace = function(p_element,p_content)
    @param      p_element The element to replace
    @return     void
    @brief      Replace an element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.replace = function(p_element,p_html)
{

	if (p_element.outerHTML)
	{
		p_element.outerHTML = p_html;
    }
    else
    {
		var l_range = p_element.ownerDocument.createRange();
		l_range.selectNodeContents(p_element);
		p_element.parentNode.replaceChild(l_range.createContextualFragment(p_html), p_element);
    }

}


/*!
    @fn         MetaWrap.Page.Element.replace = function(p_element,p_content)
    @param      p_element The element to replace
    @return     void
    @brief      Replace an element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.replaceContent = function(p_element,p_html)
{
	p_element.innerHTML = p_html;
    return p_element;
}


/*!
    @fn         MetaWrap.Page.Element.before = function(p_element,p_html)
    @param      p_element The element to before with html
    @return     void
    @brief      Add some content before an element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.before = function(p_element,p_html)
{
	// Make an empty vessel
	var l_vessel = document.createElement('div');

	// Insert before our target
	p_element.parentNode.insertBefore(l_vessel,p_element);

	// Now replace our vessel with the html
	MetaWrap.Page.Element.replace(l_vessel,p_html);
}

/*!
    @fn         MetaWrap.Page.Element.after = function(p_element,p_html)
    @param      p_element The element to after with html
    @return     void
    @brief      Add some content after an element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.after = function(p_element,p_html)
{
	// Make an empty vessel
	var l_vessel = document.createElement('div');

	// If we have a next sibling
	if (p_element.nextSibling != null)
	{
		// if we insert before that, then we are added after our node
		p_element.parentNode.insertBefore(l_vessel,p_element.nextSibling);
	}
	else
	{
		// otherwise - if we have no next sibling - just make this new element the last
		p_element.parentNode.appendChild(l_vessel);
	}

	// ownz0r it
	MetaWrap.Page.Element.replace(l_vessel,p_html);
}


/*!
    @fn         MetaWrap.Page.Element.prefix = function(p_element,p_html)
    @param      p_element The element to
    @return     void
    @brief      Replace an element
    @author     James Mc Parlane
    @date       6 September 2005
*/
MetaWrap.Page.Element.prefix = function(p_element,p_html)
{
	if (p_element.firstChild != null)
	{
		MetaWrap.Page.Element.before(p_element.firstChild,p_html);
	}
	else
	{
		// Make an empty vessel
		var l_vessel = document.createElement('div');

		// append a child into our elee=ment
		p_element.appendChild(l_vessel);

		// replace the content of the element
		MetaWrap.Page.Element.replace(l_vessel,p_html);
	}
}

/*!
    @fn         MetaWrap.Page.Element.suffix = function(p_element,p_html)
    @param      p_element The element to before the content of
    @return     void
    @brief      Replace an element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.suffix = function(p_element,p_html)
{
	if (p_element.lastChild != null)
	{
		MetaWrap.Page.Element.after(p_element.lastChild,p_html);
	}
	else
	{
		// Make an empty vessel
		var l_vessel = document.createElement('div');

		// append a child into our elee=ment
		p_element.appendChild(l_vessel);

		// replace the content of the element
		MetaWrap.Page.Element.replace(l_vessel,p_html);
	}
}


/*!
    @fn         MetaWrap.Page.Element.suffix = function(p_element,p_html)
    @param      p_element The element to before the content of
    @return     void
    @brief      Replace an element
    @author     James Mc Parlane
    @date       6 September 2005

*/
MetaWrap.Page.Element.swap = function(p_element_a,p_element_b)
{
	alert("swap");
}


/*!
 *@} endgroup mw_javascript_lib_page_element MetaWrap - JavaScript - Page - Element
 */

/*!
 *@} end of MetaWrap.Page.Element
 */




