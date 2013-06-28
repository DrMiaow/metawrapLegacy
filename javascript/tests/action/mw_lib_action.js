/*!

    @file mw_lib_action.js

    $Id: mw_lib_action.js,v 1.10 2007/07/25 10:24:14 james Exp $

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
 * $Log: mw_lib_action.js,v $
 * Revision 1.10  2007/07/25 10:24:14  james
 * Added XML fragments to views
 *
 * Revision 1.9  2006/11/08 03:05:42  james
 * Tidy up of action XML code
 * Added ability for 'structure' to take in static xml
 *
 * Revision 1.8  2006/07/04 11:48:12  james
 * Getting Flash integrated into XML.Action
 *
 * Revision 1.7  2006/07/01 08:06:56  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.6  2006/05/06 09:33:01  james
 * More refactoring
 *
 * Revision 1.5  2006/02/23 13:00:39  james
 * Fixed bug in function call - after all my research I forgot to apply it properly :)
 *
 * Revision 1.4  2006/02/22 11:20:08  james
 * Added experimental code dispatch
 *
 * Revision 1.3  2006/02/20 12:16:04  james
 * Adding dispatch code
 *
 * Revision 1.2  2006/02/14 21:43:21  james
 * Trying to move namespace issues out of xslt
 *
 * Revision 1.1  2006/02/13 11:09:01  james
 * Getting stup project for actions - first task is to see if I can share code with state via the 'mc' code namespace
 *
 */


/*! \page mw_javascript_action MetaWrap - JavaScript - Action
 *
 * \subsection mw_javascript_action Overview
 *
 */

//debug("$Id: mw_lib_action.js,v 1.10 2007/07/25 10:24:14 james Exp $");

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Pipeline","mw_lib_pipeline.js");
MwUse("MetaWrap.Network","mw_lib_network.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.XSLT","mw_lib_xml_xslt.js");
MwUse("MetaWrap.Code","mw_lib_code.js");

/*! \defgroup mw_javascript_lib_action  MetaWrap - JavaScript - Action
 *@{
 */

/*! @name       MetaWrap.Action */
//@{

/*!
    @namespace  MetaWrap.Action
    @brief      Declare the MetaWrap.Action namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action = {};

/*! @brief  The current action */


MetaWrap.Action.m_file_name = "unknown";
MetaWrap.Action.m_file_extension = "unknown";
MetaWrap.Action.m_xml_location = "";
MetaWrap.Action.m_xsl_location = "action.xsl";

MetaWrap.Action.m_xml_document = null;
MetaWrap.Action.m_xslt = null;
MetaWrap.Action.m_xslt_processor = null;
MetaWrap.Action.m_result = "";


/*!
    @func       MetaWrap.Action.Action = function(p_name,p_parent)
    @param      p_name
    @param      p_parent
    @brief      Constructor for MetaWrap.Action.Action
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action.Action = function(p_name,p_parent)
{
    this.m_name = p_name;
    this.m_parent = p_parent;
    this.m_actions = new Array();
    this.m_pre = new Array();
    this.m_post = new Array();
    this.m_inv = new Array();

    this.m_code = null;
    this.m_params = new Array();
}

/*!
    @func       MetaWrap.Action.Action.prototype.call = function(p_handle,p_env)
    @param      p_handle
    @param      p_env
    @brief
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action.Action.prototype.call = function(p_handle)
{
    alert("MetaWrap.Action.Action.prototype.call " + p_handle);


    var l_action = MetaWrap.Action.m_action.m_actions[p_handle];

    var l_params = new Array();

    var l_env = "environment";

    l_params[0] = l_env;


    if (l_action != null)
    {
	    for(var i = 0;i<l_action.m_params.length;i++)
	    {
	        l_params[i+1] = arguments[i+1];
	    }

        alert("call action '" + p_handle + "' (" + l_params.length + " params)");

        // run the preconditions

        // run the invariants

        // run the code
        l_action.m_code.apply(this,l_params);

        // run the invariants

        // run the postconditions
    }
    else
    {
        alert("no such action '" + p_handle + "'");
    }
}

// The Null action
MetaWrap.Action.m_action = new MetaWrap.Action.Action("");

/*!
    @brief      The rendering pipeline for the action engine
*/
MetaWrap.Action.m_pipeline = new MetaWrap.Pipeline('action')

/*! @name Action MetaWrap.Action Namespace */
//@{

/*!
    @func       MetaWrap.Action.prepare = function()
    @brief      Prepare the pipeline
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action.prepare = function()
{
    trace("MetaWrap.Action.prepare");

    var l_p = MetaWrap.Action;

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
    l_p.m_file_name = location.pathname.substring(location.pathname.lastIndexOf(l_path_char)+1);

    // Get the file extension
    l_p.m_file_extension = location.pathname.substring(location.pathname.lastIndexOf('.')+1);

    // Get the realfile name - sans extension
    l_p.m_file_name = l_p.m_file_name.substring(0,l_p.m_file_name.length - l_p.m_file_extension.length - 1);

    // Calculate it based on the name of the document
    l_p.m_xml_location = l_p.m_file_name + ".xml";


    trace(l_p.m_xml_location);
    trace(l_p.m_xsl_location);

    //
    //
    ////////////////////////////////////////
}


/*!
    @func       MetaWrap.Action.xml = function()
    @brief      xml loader
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action.xml = function()
{
    trace("MetaWrap.Action.xml");

    ////////////////////////////////////////
    //
    //  Load XML, Load XSLT - combine it and write it out into the browser..
    //

    var l_p = MetaWrap.Action;

    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();

    // Create a XML DOM Object
    l_p.m_xml_document = new MetaWrap.XML.Document();

    // Request the XML
    if (!MetaWrap.XML.Document.Load(l_p.m_xml_document,l_xml_request,l_p.m_xml_location))
    {
        error("request bad '" + l_p.m_xml_location + "'" );
    }

    //
    //
    ////////////////////////////////////////
}

/*!
    @func       MetaWrap.Action.xslt = function()
    @brief      xslt loader
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action.xslt = function()
{

    trace("MetaWrap.Action.xslt");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.Action;

    trace("load " + l_p.m_xsl_location);

    // Create a new transform
    l_p.m_xslt = new MetaWrap.XML.XSLT.Transform(l_p.m_xsl_location);


    // Create a new processor for this stylesheet
    l_p.m_xslt_processor = new MetaWrap.XML.XSLT.Processor(l_p.m_xslt);


    //
    //
    ////////////////////////////////////////

}

/*!
    @func       MetaWrap.Action.transform = function()
    @brief      Xslt transform stage
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action.transform = function()
{

    trace("MetaWrap.Action.transform");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.Action;

    // Process this xml using this processor
    l_p.m_xslt_processor.Process(l_p.m_xml_document);

    // Get the text result of the transform
    l_p.m_result = l_p.m_xslt_processor.getText();

    //
    //
    ////////////////////////////////////////



}

/*!
    @func       MetaWrap.Action.write = function()
    @brief      Write the output from the transformation
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.Action.write = function()
{
    trace("MetaWrap.Action.write");

    alert(MetaWrap.Action.m_result);

    // Evaluate the resulting JavaScript Code
    eval(MetaWrap.Action.m_result);
}

// Create the pipeline nodes
var l_p = MetaWrap.Action.m_pipeline;
l_p.add('prepare',MetaWrap.Action.prepare);
l_p.add('xml',MetaWrap.Action.xml);
l_p.add('xslt',MetaWrap.Action.xslt);
l_p.add('transform',MetaWrap.Action.transform);
l_p.add('write',MetaWrap.Action.write);

// Run the pipeline
MetaWrap.Action.m_pipeline.run();

MetaWrap.Action.m_action.call("signup","james@ebom.org");

/*!
 *@} endgroup mw_javascript_lib_action MetaWrap - JavaScript - Action
 */

/*!
 *@} end of MetaWrap.Action
 */

