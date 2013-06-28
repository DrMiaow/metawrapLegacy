/*

    @file mw_lib_css.js

    $Id: mw_lib_css.js,v 1.12 2007/02/05 03:34:24 james Exp $

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
 * $Log: mw_lib_css.js,v $
 * Revision 1.12  2007/02/05 03:34:24  james
 * *** empty log message ***
 *
 * Revision 1.11  2006/07/02 06:29:25  james
 * Latest update to XmlVault and flash connector
 *
 * Revision 1.10  2006/07/01 08:06:57  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.9  2006/05/09 13:44:20  james
 * Can now create a set of tests
 *
 * Revision 1.8  2006/05/06 09:33:02  james
 * More refactoring
 *
 * Revision 1.7  2006/05/06 08:28:27  james
 * More refactoring
 *
 * Revision 1.6  2006/02/05 13:18:53  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.5  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.4  2005/07/05 15:41:02  james
 * Adding unit testing framework
 *
 * Revision 1.3  2005/07/05 14:19:21  james
 * Getting css manipulating working.
 *
 * Revision 1.2  2005/07/05 08:29:13  james
 * *** empty log message ***
 *
 * Revision 1.1  2005/07/05 08:12:28  james
 * *** empty log message ***
 *
 */


/*! \page mw_javascript_lib_css MetaWrap - JavaScript - Page - CSS
 *
 * \subsection mw_javascript_lib_css Overview
 *
 * http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/collections/stylesheets.asp
 *
 *      IE6 Styles
 *
 *      fontFamily                 // String
 *      fontStyle                  // String
 *      fontVariant                // String
 *      fontWeight                 // String
 *      fontSize                   // Variant
 *      font                       // String
 *      color                      // Variant
 *      background                 // String
 *      backgroundColor            // Variant
 *      backgroundImage            // String
 *      backgroundRepeat           // String
 *      backgroundAttachment       // String
 *      backgroundPosition         // String
 *      backgroundPositionX        // Variant
 *      backgroundPositionY        // Variant
 *      wordSpacing                // Variant
 *      letterSpacing              // Variant
 *      textDecoration             // String
 *      textDecorationNone         // Boolean
 *      textDecorationUnderline    // Boolean
 *      textDecorationOverline     // Boolean
 *      textDecorationLineThrough  // Boolean
 *      textDecorationBlink        // Boolean
 *      verticalAlign              // Variant
 *      textTransform              // String
 *      textAlign                  // String
 *      textIndent                 // Variant
 *      lineHeight                 // Variant
 *      marginTop                  // Variant
 *      marginRight                // Variant
 *      marginBottom               // Variant
 *      marginLeft                 // Variant
 *      margin                     // String
 *      paddingTop                 // Variant
 *      paddingRight               // Variant
 *      paddingBottom              // Variant
 *      paddingLeft                // Variant
 *      padding                    // String
 *      border                     // String
 *      borderTop                  // String
 *      borderRight                // String
 *      borderBottom               // String
 *      borderLeft                 // String
 *      borderColor                // String
 *      borderTopColor             // Variant
 *      borderRightColor           // Variant
 *      borderBottomColor          // Variant
 *      borderLeftColor            // Variant
 *      borderWidth                // String
 *      borderTopWidth             // Variant
 *      borderRightWidth           // Variant
 *      borderBottomWidth          // Variant
 *      borderLeftWidth            // Variant
 *      borderStyle                // String
 *      borderTopStyle             // String
 *      borderRightStyle           // String
 *      borderBottomStyle          // String
 *      borderLeftStyle            // String
 *      width                      // Variant
 *      height                     // Variant
 *      styleFloat                 // String
 *      clear                      // String
 *      display                    // String
 *      visibility                 // String
 *      listStyleType              // String
 *      listStylePosition          // String
 *      listStyleImage             // String
 *      listStyle                  // String
 *      whiteSpace                 // String
 *      top                        // Variant
 *      left                       // Variant
 *      zIndex                     // Variant
 *      overflow                   // String
 *      pageBreakBefore            // String
 *      pageBreakAfter             // String
 *      cssText                    // String
 *      cursor                     // String
 *      clip                       // String
 *      filter                     // String
 *      tableLayout                // String
 *      borderCollapse             // String
 *      direction                  // String
 *      behavior                   // String
 *      position                   // String
 *      unicodeBidi                // String
 *      bottom                     // Variant
 *      right                      // Variant
 *      pixelBottom                // Long
 *      pixelRight                 // Long
 *      posBottom                  // Single
 *      posRight                   // Single
 *      imeMode                    // String
 *      rubyAlign                  // String
 *      rubyPosition               // String
 *      rubyOverhang               // String
 *      layoutGridChar             // Variant
 *      layoutGridLine             // Variant
 *      layoutGridMode             // String
 *      layoutGridType             // String
 *      layoutGrid                 // String
 *      textAutospace              // String
 *      wordBreak                  // String
 *      lineBreak                  // String
 *      textJustify                // String
 *      textJustifyTrim            // String
 *      textKashida                // Variant
 *      overflowX                  // String
 *      overflowY                  // String
 *      accelerator                // String
 *      layoutFlow                 // String
 *      zoom                       // Variant
 *      wordWrap                   // String
 *      textUnderlinePosition      // String
 *      scrollbarBaseColor         // Variant
 *      scrollbarFaceColor         // Variant
 *      scrollbar3dLightColor      // Variant
 *      scrollbarShadowColor       // Variant
 *      scrollbarHighlightColor    // Variant
 *      scrollbarDarkShadowColor   // Variant
 *      scrollbarArrowColor        // Variant
 *      scrollbarTrackColor        // Variant
 *      writingMode                // String
 *      textAlignLast              // String
 *      textKashidaSpace           // Variant
 *      textOverflow               // String
 *      minHeight                  // Variant
 *
 * Also see http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
 */

//alert("$Id: mw_lib_css.js,v 1.12 2007/02/05 03:34:24 james Exp $");

/*! \defgroup mw_javascript_lib_css  MetaWrap - JavaScript - Page - CSS
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");

/*! @name  MetaWrap.CSS */
//@{

/*!
    @namespace  MetaWrap.CSS
    @brief      Declare the MetaWrap.CSS Namespace
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.CSS = new Object();

/*!
    @brief      Our array of rulesets
*/
MetaWrap.CSS.m_rulesets = new Array();

/*!
    @fn         MetaWrap.CSS.CreateRule = function(p_css_selector, p_css_declarations)
    @param      p_ruleset The ruleset to register
    @return     void
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.CSS.CreateRule = function(p_css_selector, p_css_declarations)
{
    // The styesheet
    var l_stylesheet = null;

    // If we have the stylesheets object
    if (document.styleSheets)
    {
        // if we have no stylesheets
        if (document.styleSheets.length === 0)
        {
            // And we can create elements
            if (document.createElement)
            {
                // then create a style element
                var l_style_element = document.createElement('style');

                // if it was created ok
                if (l_style_element)
                {
                    // populate it
                    l_style_element.type = 'text/css';
                    document.getElementsByTagName('head')[0].appendChild(l_style_element);
                    l_stylesheet = l_style_element.sheet;
                }
            }


        }

        // if we have a stylesheet
        if (document.styleSheets.length > 0)
        {
            // grab the last one
            l_stylesheet = document.styleSheets[document.styleSheets.length - 1];

            // depending on the capability of the browser
            if (l_stylesheet.insertRule)
            {
                // yes - then insert it
                l_stylesheet.insertRule(p_css_selector + ' { ' + p_css_declarations + ' }',l_stylesheet.cssRules.length);
            }
            else
            if (l_stylesheet.addRule)
            {
                // yes - add it
                l_stylesheet.addRule(p_css_selector, p_css_declarations);
            }
        }
    }
    else
    {
        error("document.styleSheets not supported by this browser");
    }

}

/*!
    @fn         MetaWrap.CSS.SetBorder = function(p_border_width, p_border_style, p_border_color)
    @param      p_ruleset The ruleset to register
    @return     void
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.CSS.SetBorder = function(p_border_width, p_border_style, p_border_color)
{
    var l_stylesheet;
    var l_css_rule;

    // Do we have a stylesheets object
    if (document.styleSheets)
    {
        // Select a stylesheet
        l_stylesheet = document.styleSheets[0];

        // If we have stylesheet
        if (l_stylesheet)
        {
            // Do we have the 'cssRules' object
            if (l_stylesheet.cssRules)
            {
                l_css_rule = l_stylesheet.cssRules[0];
            }
            else
            // Do we have the 'rules' object
            if (l_stylesheet.rules)
            {
                l_css_rule = l_stylesheet.rules[0];
            }

            // if css have a css rule
            if (l_css_rule)
            {
                l_css_rule.style.borderWidth = p_border_width;
                l_css_rule.style.borderStyle = p_border_style;
                l_css_rule.style.borderColor = p_border_color;
            }
        }
    }
}


/*!
    @fn         MetaWrap.CSS.Debug = function MetaWrap_Page_CSS_Debug()
    @return     void
    @brief      Display the stylesheets
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.CSS.Debug = function MetaWrap_Page_CSS_Debug()
{
    alert(MetaWrap.CSS.Debug);

    // Walk through all the stylesheets
    for ( i = 0; i < document.styleSheets.length; i++ )
    {
        var l_stylesheet = document.styleSheets[i];
        var l_css_rules = null;

        alert("Style sheet " + i + " is titled " + l_stylesheet.title);

        if (l_stylesheet.cssRules)
        {
            l_css_rules = l_stylesheet.cssRules;
        }
        else
        if (l_stylesheet.rules)
        {
            l_css_rules = l_stylesheet.rules;
        }

        // Walk through all the rules
        for ( j = 0; j < l_css_rules.length; j++ )
        {
            var l_rule = l_css_rules(j);

            var l_status = " ";

            if (l_rule.readOnly)
            {
                l_status = " [READONLY]"
            }

            alert("css rule [" + l_rule.selectorText + "] = " + l_rule.style.cssText + l_status);
        }
    }
}


/*! @brief Global variable for allocating a unique name and id to each link */
var g_links = 0;

/*!
    @fn         function MwJsLoadStylesheet(p_css_file)
    @param      p_css_file
    @brief      Load a stylesheet dynamically
    @author     James Mc Parlane
    @date       10 June 2005
*/
function MwJsLoadStylesheet(p_css_file)
{
    g_links++;

    var l_link = document.createElement("link")
    l_link.href = p_css_file;
    l_link.rel = "stylesheet";
    l_link.type = "text/css";
    l_link.id = "link" + g_links;
    l_link.name = "link" + g_links;

    //alert("add " + l_link.outerHTML);

    document.body.appendChild(l_link);
}


/*!
    @fn         function MwJsRemoveAllStylesheets()
    @brief      Remove all stylesheets from the document
    @author     James Mc Parlane
    @date       10 June 2005

    BUG in both IE and Firefox
    Seems to be a bug in getElementsByTagName
    http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/methods/getelementsbytagname.asp

    Where it does not return all elements previusly added by

*/
function MwJsRemoveAllStylesheets()
{
    var l_Nodes = document.getElementsByTagName("link");

    //alert(l_Nodes.length);

    while(l_Nodes.length!= 0)
    {

        for (var i = 0;i<l_Nodes.length;i++)
        {
            //alert("remove " + l_Nodes[i].outerHTML);
            // Remove the node
            l_Nodes[i].parentNode.removeChild(l_Nodes[i]);
        }

        l_Nodes = document.getElementsByTagName("link");
    }
}

/*!
    @fn         function MwJsRemoveNamedStylesheet(p_css_file)
    @param      p_css_file The file name of the sylesheet that we want to remove
    @brief      Remove the style by file name
    @author     James Mc Parlane
    @date       10 June 2005
*/
function MwJsRemoveNamedStylesheet(p_css_file)
{
    // Find all links
    var l_Nodes = document.getElementsByTagName("link");

    // Loop through each one
    for (var i = 0;i<l_Nodes.length;i++)
    {
        // if we have a node with a href that matches this - then replace it
        if (l_Nodes[i].attributes.getNamedItem("href").value == p_css_file)
        {
            //alert("remove " + l_Nodes[i].outerHTML);
            // Remove the node
            l_Nodes[i].parentNode.removeChild(l_Nodes[i]);
            return true;
        }
    }

    alert("did not find " + p_css_file);
    return false;
}


/*!
    @fn         function MwJsCSSClearAllStyles()
    @brief      Clear all the styles
    @author     James Mc Parlane
    @date       10 June 2005
*/
function MwJsCSSClearAllStyles()
{
    var l_Nodes = document.body.getElementsByTagName("*");

    for(i = 0; i < l_Nodes.length; i++)
    {
        try
        {
            if (l_Nodes[i].style != undefined)
            {
                l_Nodes[i].style = "none";
            }
        }
        catch(e)
        {
        }
    }
}

/*!
    @fn         function MwCSSPageInit()
    @brief      This functions is called when the document loads
    @author     James Mc Parlane
    @date       10 June 2005
*/
function MwJsOnLoad(p_load_css)
{
    // If we have not loaded the CSS as the root level javascript executes - then load after the page is loaded into DOM.
    if (p_load_css)
    {
        alert("client_side_xslt.css");
        MwJsLoadStylesheet("client_side_xslt.css");
    }
}

/*!
 *@} endgroup mw_javascript_lib_css MetaWrap - JavaScript - CSS
 */

/*!
 *@} end of MetaWrap.CSS
 */


