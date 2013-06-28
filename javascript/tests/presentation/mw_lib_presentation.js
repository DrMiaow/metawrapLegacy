/*

    @file mw_lib_presentation.js

    $Id: mw_lib_presentation.js,v 1.10 2007/10/24 09:44:12 james Exp $

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
 * $Log: mw_lib_presentation.js,v $
 * Revision 1.10  2007/10/24 09:44:12  james
 * Working out the semantics of the new skin system
 *
 * Revision 1.9  2007/08/14 09:10:53  james
 * Trying to load data from local filesystem
 *
 * Revision 1.8  2007/08/07 10:23:50  james
 * WireWrap prototype example working with Adobe Fireworks CS3
 *
 * Revision 1.7  2007/07/25 10:24:14  james
 * Added XML fragments to views
 *
 * Revision 1.6  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.5  2006/05/08 12:49:01  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.4  2006/05/06 09:33:04  james
 * More refactoring
 *
 * Revision 1.3  2006/05/06 08:28:29  james
 * More refactoring
 *
 * Revision 1.2  2005/11/13 01:58:09  james
 * Fixed isssue with remix under Firefox
 *
 * Revision 1.1  2005/11/09 06:00:34  james
 * Moved some files about to get more logical naming
 * and division of functionality
 *
 * Revision 1.23  2005/11/09 05:04:40  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.22  2005/11/09 04:11:25  james
 * Page structure part of pipeline is now running in a pipeline object
 *
 * Revision 1.21  2005/11/07 07:23:15  james
 * *** empty log message ***
 *
 * Revision 1.20  2005/11/02 11:41:22  james
 * Got basic remix transform happening
 *
 * Revision 1.19  2005/11/01 12:08:09  james
 * Fixed consistency issue in stylesheet
 *
 * Revision 1.18  2005/11/01 11:58:00  james
 * Some renaming to make more sense, getting ready for
 * second stage of pipeline
 *
 * Revision 1.17  2005/10/30 11:20:13  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.16  2005/10/30 09:38:51  james
 * Protoype of WireWrap based on pipline processing
 *
 * Revision 1.15  2005/10/27 13:38:40  james
 * Translating WireWrap to use pipeline
 *
 * Revision 1.14  2005/10/27 12:28:00  james
 * Revamping WireWrap to use new pipeline
 *
 * Revision 1.13  2005/10/05 12:45:33  james
 * Got nested style XML working
 *
 * Revision 1.12  2005/10/04 13:43:45  james
 * Got some more testcases working for wirewrap
 *
 * Revision 1.11  2005/10/03 11:30:13  james
 * Tidied up XSLT code. Still needs more work.
 *
 * Revision 1.10  2005/10/03 07:05:16  james
 * Modified js testcases to work with addListener
 * Fixed issue in XSLT - unwanted transformix:result element
 * when performing a text only transform. Needed to change API
 * to deal with this. Now have two result accessor functions for
 * getting output.
 *
 * MetaWrap.XML.XSLT.Processor.getText
 * MetaWrap.XML.XSLT.Processor.getXML
 *
 * Revision 1.9  2005/10/03 00:20:37  james
 * Working on wirewrap testcases.
 * Porting to use new addEventListener
 *
 * Revision 1.8  2005/09/21 02:29:54  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.7  2005/08/31 13:13:06  james
 * Working on example 4 now - base style and js xml
 *
 * Revision 1.6  2005/08/31 12:52:57  james
 * Tidiied up some of the code
 *
 * Revision 1.5  2005/08/31 12:41:53  james
 * Testcase 3 now processes style and js xml
 * on browsers that have XSLT support.
 *
 * Revision 1.4  2005/08/31 10:23:19  james
 * Adding xsd directort for schema definitions
 *
 * Revision 1.3  2005/08/30 02:03:01  james
 * Generating style
 *
 * Revision 1.2  2005/08/29 08:04:10  james
 * Latest wirewrap test
 *
 * Revision 1.1  2005/08/29 07:51:41  james
 * Latest wirewrap test
 *
 */


/*! \page mw_javascript_lib_presentation MetaWrap - JavaScript - Presentation
 *
 */

//alert("$Id: mw_lib_presentation.js,v 1.10 2007/10/24 09:44:12 james Exp $");

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Pipeline","mw_lib_pipeline.js");
MwUse("MetaWrap.Network","mw_lib_network.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.XSLT","mw_lib_xml_xslt.js");
MwUse("MetaWrap.Wirewrap","mw_lib_wirewrap.js");

/*! \defgroup mw_javascript_lib_presentation  MetaWrap - JavaScript - Presentation
 *@{
 */

/*! @name  MetaWrap.Presentation  */
//@{

/*!
    @namespace  MetaWrap.WireWrap.Page
    @brief      The Page Class
*/
MetaWrap.Presentation = {};

/*!
    @brief      The name of the file being processed
*/
MetaWrap.Presentation.m_file_name = "unknown";

/*!
    @brief      The file extension of the file being processed
*/
MetaWrap.Presentation.m_file_extension = "unknown";

/*!
    @brief      The path used for the base CSS and JS XML
*/
MetaWrap.Presentation.m_base_xml_path = "";

/*!
    @brief      The path used for the remix CSS and JS XML
*/
MetaWrap.Presentation.m_remix_xml_path = "";

/*!
    @brief      The name of the XSLT that we use to convert the XML into css
*/
MetaWrap.Presentation.m_css_xsl_path = "xml2css.xsl";

/*!
    @brief      The name of the XSLT that we use to convert the XML into js
*/
MetaWrap.Presentation.m_js_xsl_path = "xml2js.xsl";

/*!
    @brief      The XSLT processor to convert the XML into css
*/
MetaWrap.Presentation.m_css_xslt_processor = null;

/*!
    @brief      The XSLT processor to convert the XML into javascript
*/
MetaWrap.Presentation.m_js_xslt_processor = null;

/*!
    @brief      The WireWrap rendering pipeline
*/
MetaWrap.Presentation.m_pipeline = new MetaWrap.Pipeline('wirewrap');


/*!
    @brief      If this is true then we want to bypass the cache
*/
MetaWrap.Presentation.g_bypass_cache = true;


/*
if (MetaWrap.Presentation.g_bypass_cache)
{
	+= "?v=" + (new Date()).getTime()
}
*/


/*!
    @fn         MetaWrap.Presentation.injectCSS = function(p_css)
    @brief      Inject CSS into the current page
    @author     James Mc Parlane
    @date       25 October 2005
*/
MetaWrap.Presentation.injectCSS = function(p_css)
{
    //alert("MetaWrap.Presentation.injectCSS p_css = " + p_css);

    // We write this into the document as it loads
    document.write("<style type=\"text/css\">");
    document.write(p_css);
    document.write("</style>");
}

/*!
    @fn         MetaWrap.Presentation.injectJS = function(p_js)
    @brief      Inject JavaScript into the current page
    @author     James Mc Parlane
    @date       25 October 2005
*/
MetaWrap.Presentation.injectJS = function(p_js)
{
    //alert("MetaWrap.Presentation.injectJS p_js = " + p_js);

    // We write this into the document as it loads
    document.write("<script language=\"JavaScript\" type=\"text/javascript\" >");
    document.write(p_js);
    document.write("</script>");
}

/*!
    @fn         function MwWwPageServerSide()
    @brief      Transfer into server side only mode
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MwWwPageServerSide()
{
    //alert("*** MwWwPageServerSide ****");
}

/*!
    @fn         function MwWwPageServerSideCombinedJSXSLT()
    @brief      Generate the default JS and CSS on the server
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MwWwPageServerSideBaseJSXSLT()
{
   //alert("***  MwWwPageServerSideBaseJSXSLT JS and CSS ****");
}

/*!
    @fn         function MwWwPageServerSideCombinedJSXSLT()
    @brief      Generate the default JS and CSS on the server
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MwWwPageServerSideRemixJSXSLT()
{
   //alert("***  MwWwPageServerSideRemixJSXSLT JS and CSS ****");
}


/*!
    @fn         function prepareWirewrapPage()
    @brief      Generate the default JS and CSS on the server
    @author     James Mc Parlane
    @date       25 October 2005
*/
function prepareWirewrapPage()
{
    //alert("prepareWirewrapPage");

    ////////////////////////////////////////
    //
    // Get the name of the XML document we want to process
    //

    // By some process - yet to be defined - we set the xml location
    // Can we have multiple lots of XML?
    // Can we base the XML the name of the file?

    //
    // Lets work out the name of this file and its extension
    //

    // The name of this file
    MetaWrap.Presentation.m_file_name = "unknown";

    // The name of this extension
    MetaWrap.Presentation.m_file_extension = "unknown";

    var l_path_char = '\\';

    //
    // Because of this rule - we know that we can never have / or \ in a filename or its parameters - it must be escaped or encoded
    //
    if (location.pathname.indexOf(l_path_char) == -1)
    {
        // Use the other path character
        l_path_char = '/';
    }

    // Get the filename with file extension (later on we strip out the extension)
    MetaWrap.Presentation.m_file_name = location.pathname.substring(location.pathname.lastIndexOf(l_path_char)+1);

    // Get the file extension
    MetaWrap.Presentation.m_file_extension = location.pathname.substring(location.pathname.lastIndexOf('.')+1);

    // Get the realfile name - sans extension
    MetaWrap.Presentation.m_file_name = MetaWrap.Presentation.m_file_name.substring(0,MetaWrap.Presentation.m_file_name.length - MetaWrap.Presentation.m_file_extension.length - 1);

    // If we don't know which XML we want to load
    if (MetaWrap.Presentation.m_base_xml_path == "")
    {
        // Calculate it based on the name of the document
        MetaWrap.Presentation.m_base_xml_path = MetaWrap.Presentation.m_file_name + "_base.xml";
    }

    // If we don't know which XML we want to load
    if (MetaWrap.Presentation.m_remix_xml_path == "")
    {
        // Calculate it remixd on the name of the document
        MetaWrap.Presentation.m_remix_xml_path = MetaWrap.Presentation.m_file_name + "_remix.xml";
    }

    //
    //
    ////////////////////////////////////////
}


function loadJavaScriptXSLT()
{
    //alert("loadJavaScriptXSLT");

    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();

    ////////////////////////////////////////
    //
    //  Create A Behavior Processor
    //

    // Create a new transform
    var l_js_xslt = new MetaWrap.XML.XSLT.Transform(MetaWrap.Presentation.m_js_xsl_path);

    // Create a new processor for this stylesheet
    MetaWrap.Presentation.m_js_xslt_processor = new MetaWrap.XML.XSLT.Processor(l_js_xslt);

    //
    //
    ////////////////////////////////////////

    return MetaWrap.Presentation.m_js_xslt_processor;
}

function loadCSSXSLT()
{
    //alert("loadCSSXSLT");

    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();

    ////////////////////////////////////////
    //
    //  Create A Style Processor
    //

    // Create a new transform
    var l_css_xslt = new MetaWrap.XML.XSLT.Transform(MetaWrap.Presentation.m_css_xsl_path);

    // Create a new processor for this stylesheet
    MetaWrap.Presentation.m_css_xslt_processor = new MetaWrap.XML.XSLT.Processor(l_css_xslt);

    //
    //
    ////////////////////////////////////////

    return MetaWrap.Presentation.m_css_xslt_processor;
}

// Load the baseXml
function loadBaseXml()
{
    //alert("loadBaseXml");

    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();

    // Create a XML DOM Object
    var l_base_xml = new MetaWrap.XML.Document();

    //alert("request base xml " + MetaWrap.Presentation.m_base_xml_path);

    // Request the XML
    if (MetaWrap.XML.Document.Load(l_base_xml,l_xml_request,MetaWrap.Presentation.m_base_xml_path))
    {
        //alert("request ok " + MetaWrap.Presentation.m_base_xml_path);
        //alert(l_base_xml.xml);

        return l_base_xml;
    }

    return null;
}


// Process the baseXml
function processBaseXml()
{
    //alert("processBaseXml");

    // Get the source XML
    var l_base_xml = this.get("basexml");

    // Get the XSLT that converts xml to xss
    var l_cssxslt = this.get("cssxslt");

    // Get the XSLT that converts xml to xss
    var l_jsxslt = this.get("jsxslt");

    // Process base XML using css XSLT
    MetaWrap.Presentation.m_css_xslt_processor.Process(l_base_xml);

    // Get The resultant CSS
    var l_base_result_css = MetaWrap.Presentation.m_css_xslt_processor.getText();

    // Inject the CSS into the page
    MetaWrap.Presentation.injectCSS(l_base_result_css);

    // Process base XML using js XSLT to generate the JavaScript
    MetaWrap.Presentation.m_js_xslt_processor.Process(l_base_xml);

    // Get The resultant JavaScript
    var l_base_result_js = MetaWrap.Presentation.m_js_xslt_processor.getText();

	//alert(l_base_result_js);

    // Inject the JavaScript into the page
    MetaWrap.Presentation.injectJS(l_base_result_js);


}


// Load the remixXml
function loadRemixXml()
{
    //alert("loadRemixXml");

    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();

    // Create a XML DOM Object
    var l_remix_xml = new MetaWrap.XML.Document();

    //alert("request remix xml " + MetaWrap.Presentation.m_remix_xml_path);

    // Request the XML
    if (MetaWrap.XML.Document.Load(l_remix_xml,l_xml_request,MetaWrap.Presentation.m_remix_xml_path))
    {
        //debug("request ok " + MetaWrap.Presentation.m_remix_xml_path);

        return l_remix_xml;
    }

    // if we don't get anything then return an empty document, user XML is optional
    return l_remix_xml;
    //return null;
}


// Process the remixXml
function processRemixXml()
{
    //alert("processRemixXml");

    // Get the source XML
    var l_remix_xml = this.get("remixxml");
    ASSERT(l_remix_xml != null,"l_remix_xml == null");

    //alert(l_remix_xml.xml);

    // Get the XSLT that converts xml to xss
    var l_cssxslt = this.get("cssxslt");

    // Get the XSLT that converts xml to xss
    var l_jsxslt = this.get("jsxslt");

    // Process remix XML using css XSLT
    MetaWrap.Presentation.m_css_xslt_processor.Process(l_remix_xml);

    // Get The resultant CSS
    var l_remix_result_css = MetaWrap.Presentation.m_css_xslt_processor.getText();

    // Inject the CSS into the page
    MetaWrap.Presentation.injectCSS(l_remix_result_css);

    // Process remix XML using js XSLT to generate the JavaScript
    MetaWrap.Presentation.m_js_xslt_processor.Process(l_remix_xml);

    // Get The resultant JavaScript
    var l_remix_result_js = MetaWrap.Presentation.m_js_xslt_processor.getText();

    // Inject the JavaScript into the page
    MetaWrap.Presentation.injectJS(l_remix_result_js);
}

////////////////////////////////////////
////////////////////////////////////////
////
////  Populate the pipeline
////

//
// First stage in the pipeline - Preparation
//
var l_prepare = MetaWrap.Presentation.m_pipeline.add('prepare',prepareWirewrapPage);

//
// First stage in the pipeline - Load all the XSLT
//
var l_loadxslt = MetaWrap.Presentation.m_pipeline.add('loadxslt');


// After we load the XSLT, we can load the base XML
l_prepare.next(l_loadxslt);


// Set the start point of our pipeline
MetaWrap.Presentation.m_pipeline.start(l_prepare);

//
// Set up all the XSLT inputs
//
//              [START]
//                 |
//  [LOAD JSSXSLT] + [LOAD XSS XSLT]
//                 |

// How to get the XSLT that generates the CSS
l_loadxslt.require('cssxslt',loadCSSXSLT,MwWwPageServerSide);

// How to get the XSLT that generates the JS
l_loadxslt.require('jsxslt',loadJavaScriptXSLT,MwWwPageServerSide);

//                 |
//          [LOAD BASE XML]
//                 |

// add a new pipleine node
var l_loadbasexml = MetaWrap.Presentation.m_pipeline.add('basexml',loadBaseXml,MwWwPageServerSide,null);

// After we load the XSLT, we can load the base XML
l_loadxslt.next(l_loadbasexml);

//                 |
//      [PROCESS BASE XSLT]
//                 |

// add a new pipleine node
var l_processbasexml = MetaWrap.Presentation.m_pipeline.add('processbasexml',processBaseXml,MwWwPageServerSideBaseJSXSLT,null);

// After we load the base XML, we can process the base XML
l_loadbasexml.next(l_processbasexml);


//                 |
//          [LOAD REMIX XML]
//                 |

// add a new pipleine node
var l_loadremixxml = MetaWrap.Presentation.m_pipeline.add('remixxml',loadRemixXml,MwWwPageServerSide,null);

// After we load the XSLT, we can load the base XML
l_processbasexml.next(l_loadremixxml);


//                 |
//      [PROCESS REMIX XSLT]
//                 |

// add a new pipleine node
var l_processremixxml = MetaWrap.Presentation.m_pipeline.add('processremixxml',processRemixXml,MwWwPageServerSideRemixJSXSLT,null);

// After we load the base XML, we can process the base XML
l_loadremixxml.next(l_processremixxml);

////
////
////
////////////////////////////////////////
////////////////////////////////////////

// Run the pipeline
MetaWrap.Presentation.m_pipeline.run();

/*!
 *@} endgroup mw_javascript_lib_presentation MetaWrap - JavaScript - Presentation
 */

/*!
 *@} end of MetaWrap.Presentation
 */