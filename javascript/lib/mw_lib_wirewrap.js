/*

    @file mw_lib_wirewrap.js

    $Id: mw_lib_wirewrap.js,v 1.15 2007/07/25 11:13:28 james Exp $

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
 * $Log: mw_lib_wirewrap.js,v $
 * Revision 1.15  2007/07/25 11:13:28  james
 * Fix ro schema creation script
 * Tweaking javascript code for view
 *
 * Revision 1.14  2007/02/05 03:34:25  james
 * *** empty log message ***
 *
 * Revision 1.13  2006/05/06 09:33:04  james
 * More refactoring
 *
 * Revision 1.12  2006/05/06 08:28:30  james
 * More refactoring
 *
 * Revision 1.11  2006/03/25 04:39:24  james
 * Made macro recorder more stable
 * Made event hooks multiple document aware
 * Added per element/event event handlers for simulation
 *
 * Revision 1.10  2005/11/01 11:58:00  james
 * Some renaming to make more sense, getting ready for
 * second stage of pipeline
 *
 * Revision 1.9  2005/10/30 11:20:13  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.8  2005/10/27 12:28:00  james
 * Revamping WireWrap to use new pipeline
 *
 * Revision 1.7  2005/10/03 11:30:13  james
 * Tidied up XSLT code. Still needs more work.
 *
 * Revision 1.6  2005/10/03 07:05:16  james
 * Modified behavior testcases to work with addListener
 * Fixed issue in XSLT - unwanted transformix:result element
 * when performing a text only transform. Needed to change API
 * to deal with this. Now have two result accessor functions for
 * getting output.
 *
 * MetaWrap.XML.XSLT.Processor.getText
 * MetaWrap.XML.XSLT.Processor.getXML
 *
 * Revision 1.5  2005/09/26 08:27:19  james
 * Added a simple way of specifying js librray search paths.
 *
 * Revision 1.4  2005/09/25 13:47:27  james
 * Added automatic javascript namespace/object dependancy
 * resolution so that you can just include top level namespace
 * js libs and they can specify what else is required and load the
 * files in the correct order.
 *
 * Improved MetaWrap.Page.Element.addEventListener so that
 * it deals with existing listeners that have been added by asignment
 * or by inlining.
 *
 * Revision 1.3  2005/09/21 02:29:54  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.2  2005/08/25 12:29:45  james
 * *** empty log message ***
 *
 * Revision 1.1  2005/08/25 12:23:15  james
 * Moved code
 *
 * Revision 1.5  2005/07/05 08:03:40  james
 * *** empty log message ***
 *
 * Revision 1.4  2005/07/03 07:49:13  james
 * Documentting library
 *
 * Revision 1.3  2005/07/03 05:06:12  james
 * *** empty log message ***
 *
 * Revision 1.2  2005/07/03 04:42:48  james
 * Normalising library
 *
 * Revision 1.1  2005/06/30 12:45:48  james
 * Building simple wirewrap system
 *
 */


/*! \page mw_javascript_lib_wirewrap MetaWrap - JavaScript - Page - Wirewrap
 *
 * \subsection mw_javascript_lib_wirewrap Overview
 *
 *  Behavior v1.0 by Ben Nolan, June 2005. Based largely on the work
 *    of Simon Willison (see comments by Simon below).
 *
 *    Description:
 *
 *     Uses css selectors to apply javascript wirewraps to enable
 *     unobtrusive javascript in html documents.
 *
 *    Usage:
 *
 *     var myrules = {
 *         'b.someclass' : function(element){
 *             element.onclick = function(){
 *                 alert(this.innerHTML);
 *             }
 *         },
 *         '#someid u' : function(element){
 *             element.onmouseover = function(){
 *                 this.innerHTML = "BLAH!";
 *             }
 *         }
 *     );
 *
 *     Wirewrap.register(myrules);
 *
 *     // Call Wirewrap.apply() to re-apply the rules (if you
 *     // update the dom, etc).
 *
 *    License:
 *
 *     My stuff is BSD licensed. Not sure about Simon's.
 *
 *    More information:
 *
 *    http://ripcord.co.nz/behavior/
 *
 * Also see http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
 *
 * "It turns out that IE won’t let you manipulate <style> elements in this way. There is,
 *  however, a different way to do the same thing. IE supports a styleSheet property
 *  on each style element that allows for the manipulation of the style sheet
 *  and the rules contained within. The styleSheet property has a property
 *  called cssText, which can be used to set and retrieve the CSS text for
 *  the style sheet. So, the code can be modified to work in IE.."
 * http://yuiblog.com/blog/2007/06/07/style/
 */

//alert("$Id: mw_lib_wirewrap.js,v 1.15 2007/07/25 11:13:28 james Exp $");

/*! \defgroup mw_javascript_lib_wirewrap  MetaWrap - JavaScript - Page - Wirewrap
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");
MwUse("MetaWrap.Page.Element","mw_lib_page_element.js");
MwUse("MetaWrap.Page.Element.addEventListener","mw_lib_page_element_addhandler.js");

/*! @name  MetaWrap.Wirewrap Namespace */
//@{

/*!
    @brief      Declare the MetaWrap.Wirewrap namespace
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Wirewrap = new Object();

/*!
    @brief      Our array of rulesets
*/
MetaWrap.Wirewrap.m_rulesets = new Array();

/*!
    @fn         MetaWrap.Wirewrap.register = function(p_ruleset)
    @param      p_ruleset The ruleset to register
    @return     void
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Wirewrap.register = function(p_ruleset)
{
    MetaWrap.Wirewrap.m_rulesets.push(p_ruleset);
}

/*!
    @fn         MetaWrap.Wirewrap.init = function()
    @return     void
    @brief      Initialise the Wirewrap system
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Wirewrap.init = function()
{
    // Add our application function into the onload
    MetaWrap.Page.listen("load",MetaWrap.Wirewrap.apply,false);
}

/*!
    @fn         MetaWrap.Wirewrap.apply_behavior = function(p_css_selector,p_behavior)
    @param      p_selector The css tyle selector to use to select elements
    @param      p_behavior The wirewrap functions
    @return     void
    @brief      Apply the ruleset p_ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Wirewrap.apply_behavior = function(p_css_selector,p_behavior)
{
    //alert("p_css_selector = '" + p_css_selector + "'");

    // Find all the applicable elements
    var l_selected_elements = MetaWrap.Page.getElementsBySelector(p_css_selector);

    // If we find matching elements - then apply wirewrap to each of them
    if (l_selected_elements)
    {
        // Then for each matched element..
        for (var i = 0;l_element=l_selected_elements[i];i++)
        {
            //.. run the rules against it
            p_behavior(l_element);
        }
    }
}

/*!
    @fn         MetaWrap.Wirewrap.apply_ruleset = function(p_ruleset)
    @param      p_ruleset The ruleset to apply
    @return     void
    @brief      Apply the ruleset p_ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Wirewrap.apply_ruleset = function(p_ruleset)
{
    //alert("MetaWrap.Wirewrap.apply_ruleset");

    // Our current selector
   var l_selector = null;

    // For every selector in a ruleset
    for (l_selector in p_ruleset)
    {
        MetaWrap.Wirewrap.apply_behavior(l_selector,p_ruleset[l_selector]);
    }
}

/*!
    @fn         MetaWrap.Wirewrap.apply = function()
    @return     void
    @brief      Apply the rules that have been previously registered by MetaWrap.Wirewrap.register
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Wirewrap.apply = function()
{
	//alert("MetaWrap.Wirewrap.apply");

    // Ruleset we are currently applying
    var l_ruleset = null;

    // Itterate through all our rulesets and apply each one
    for (var i = 0;l_ruleset=MetaWrap.Wirewrap.m_rulesets[i]; i++)
    {
        MetaWrap.Wirewrap.apply_ruleset(l_ruleset);
    }
}

//@}

// Init the wirewrap object with ths current page
MetaWrap.Wirewrap.init();




